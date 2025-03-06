import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import connectDB from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import { Types } from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!['POST', 'DELETE'].includes(req.method || '')) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
      // Validate productId is a valid ObjectId
      if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find or create user with initialized favorites
    let user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      try {
        // Create new user if not exists
        user = new User({
          email: session.user.email,
          name: session.user.name || session.user.email,
          favorites: [],
          role: session.user.role || 'user'
        });
        await user.save();
        console.log('Created new user:', user);
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user profile' });
      }
    }

    // Initialize favorites if undefined
    if (!Array.isArray(user.favorites)) {
      try {
        await User.updateOne(
          { _id: user._id },
          { $set: { favorites: [] } }
        );
        user.favorites = [];
        console.log('Initialized favorites for user:', user.email);
      } catch (error) {
        console.error('Error initializing favorites:', error);
        return res.status(500).json({ message: 'Error initializing favorites' });
      }
    }

    const productObjectId = new Types.ObjectId(productId);
    console.log('Processing request:', { 
      method: req.method,
      email: session.user.email,
      productId,
      currentFavorites: user.favorites?.map((favId: Types.ObjectId) => favId.toString()) || []
    });

    if (req.method === 'POST') {
      // Add to favorites if not already present
      const isAlreadyFavorite = user.favorites?.some(
        (favId: Types.ObjectId) => favId.toString() === productObjectId.toString()
      ) || false;

      if (!isAlreadyFavorite) {
        try {
          // Add to favorites using $addToSet to prevent duplicates
          const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $addToSet: { favorites: productObjectId } },
            { new: true, runValidators: true }
          );

          if (!updatedUser) {
            return res.status(404).json({ 
              success: false,
              message: 'Failed to update favorites' 
            });
          }

          // Ensure favorites is an array
          const favorites = updatedUser.favorites || [];

          console.log('Added to favorites:', {
            email: session.user.email,
            productId,
            newFavorites: favorites.map((favId: Types.ObjectId) => favId.toString())
          });

          return res.status(200).json({ 
            success: true,
            message: 'Added to favorites',
            favorites: favorites.map((favId: Types.ObjectId) => favId.toString())
          });
        } catch (error) {
          console.error('Error adding to favorites:', error);
          return res.status(500).json({ 
            success: false,
            message: 'Error adding to favorites' 
          });
        }
      }

      return res.status(200).json({ 
        success: true,
        message: 'Already in favorites',
        favorites: user.favorites?.map((favId: Types.ObjectId) => favId.toString()) || []
      });
    } else {
      try {
        // Remove from favorites using $pull
        const updatedUser = await User.findOneAndUpdate(
          { email: session.user.email },
          { $pull: { favorites: productObjectId } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ 
            success: false,
            message: 'Failed to update favorites' 
          });
        }

        // Ensure favorites is an array
        const favorites = updatedUser.favorites || [];

        console.log('Removed from favorites:', {
          email: session.user.email,
          productId,
          newFavorites: favorites.map((favId: Types.ObjectId) => favId.toString())
        });

        return res.status(200).json({ 
          success: true,
          message: 'Removed from favorites',
          favorites: favorites.map((favId: Types.ObjectId) => favId.toString())
        });
      } catch (error) {
        console.error('Error removing from favorites:', error);
        return res.status(500).json({ 
          success: false,
          message: 'Error removing from favorites' 
        });
      }
    }
  } catch (error) {
    console.error('Error managing favorites:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error managing favorites',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
