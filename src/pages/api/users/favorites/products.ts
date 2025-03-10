import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import connectDB from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import Product from '@/models/Product';

interface LeanUser {
  favorites?: string[];
}

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

    // Find user and their favorite product IDs
    const user = await User.findOne({ email: session.user.email })
      .select('favorites')
      .lean() as LeanUser;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has no favorites, return empty array
    if (!user.favorites || user.favorites.length === 0) {
      return res.status(200).json({ products: [] });
    }

    // Fetch the actual product details for each favorite
    const favoriteProducts = await Product.find({
      _id: { $in: user.favorites }
    })
    .select('_id name price description category image')
    .lean();

    // Map the products to ensure proper serialization of ObjectIds
    const serializedProducts = favoriteProducts.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      price: Number(product.price)
    }));

    return res.status(200).json({
      products: serializedProducts
    });
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    return res.status(500).json({ 
      message: 'Error fetching favorite products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
