import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get query parameters for filtering and pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const sort = req.query.sort as string || '-createdAt'; // Default sort by newest

    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    // Fetch orders
    const orders = await Order.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      orders,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
}
