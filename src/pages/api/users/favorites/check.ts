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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const { productId } = req.query;
    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const user = await User.findOne({ email: session.user.email })
      .select('favorites')
      .lean<Pick<IUser, 'favorites'>>();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorites = user.favorites || [];
    const isFavorite = favorites.some(
      id => id?.toString() === productId
    );

    // Add timestamp to force fresh response
    return res.status(200).json({
      isFavorite,
      message: isFavorite ? 'Product is in favorites' : 'Product is not in favorites',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return res.status(500).json({ 
      message: 'Error checking favorite status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
