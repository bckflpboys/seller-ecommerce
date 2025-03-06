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

    // Find user and ensure favorites is initialized
    let user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $setOnInsert: { favorites: [] } },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure favorites is an array
    user.favorites = user.favorites || [];
    
    const productObjectId = new Types.ObjectId(productId);
    console.log('Existing user:', { 
      found: true,
      email: session.user.email,
      currentFavorites: (user.favorites || []).map((favId: Types.ObjectId) => favId.toString())
    });

    if (req.method === 'POST') {
      // Add to favorites if not already present
      const isAlreadyFavorite = user.favorites.some(
        (favId: Types.ObjectId) => favId.toString() === productObjectId.toString()
      );

      if (!isAlreadyFavorite) {
        user.favorites.push(productObjectId);
        await user.save();
        
        // Fetch updated user to confirm changes
        const updatedUser = await User.findById(user._id)
          .select('favorites')
          .lean<Pick<IUser, 'favorites'>>();

        const favorites = updatedUser?.favorites || [];
        
        return res.status(200).json({ 
          message: 'Added to favorites',
          favorites: favorites.map((favId: Types.ObjectId) => favId.toString())
        });
      }

      return res.status(200).json({ 
        message: 'Already in favorites',
        favorites: user.favorites.map((favId: Types.ObjectId) => favId.toString())
      });
    } else {
      // Remove from favorites
      user.favorites = (user.favorites || []).filter(
        (favId: Types.ObjectId) => favId.toString() !== productId
      );
      await user.save();

      // Fetch updated user to confirm changes
      const updatedUser = await User.findById(user._id)
        .select('favorites')
        .lean<Pick<IUser, 'favorites'>>();

      const favorites = updatedUser?.favorites || [];

      return res.status(200).json({ 
        message: 'Removed from favorites',
        favorites: favorites.map((favId: Types.ObjectId) => favId.toString())
      });
    }
  } catch (error) {
    console.error('Error managing favorites:', error);
    return res.status(500).json({ 
      message: 'Error managing favorites',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
