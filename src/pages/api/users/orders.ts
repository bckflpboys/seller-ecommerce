import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const orders = await Order.find({ email: session.user.email })
      .sort({ createdAt: -1 })
      .lean();

    const serializedOrders = orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      items: order.items.map(item => ({
        ...item,
        _id: item._id?.toString()
      }))
    }));

    return res.status(200).json(serializedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders' });
  }
}
