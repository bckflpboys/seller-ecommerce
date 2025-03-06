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

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      await dbConnect();

      const { status } = req.body;

      if (!['pending', 'paid', 'shipped', 'delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const order = await Order.findOneAndUpdate(
        { paymentReference: id },
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
