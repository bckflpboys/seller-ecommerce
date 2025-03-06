import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbConnect();

    // Get total counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Calculate total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

    // Calculate monthly changes
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    // Products change
    const currentMonthProducts = await Product.countDocuments({
      createdAt: { $gte: lastMonth, $lt: now }
    });
    const prevMonthProducts = await Product.countDocuments({
      createdAt: { $gte: twoMonthsAgo, $lt: lastMonth }
    });
    const productsChange = prevMonthProducts ? 
      ((currentMonthProducts - prevMonthProducts) / prevMonthProducts) * 100 : 0;

    // Orders change
    const currentMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonth, $lt: now }
    });
    const prevMonthOrders = await Order.countDocuments({
      createdAt: { $gte: twoMonthsAgo, $lt: lastMonth }
    });
    const ordersChange = prevMonthOrders ? 
      ((currentMonthOrders - prevMonthOrders) / prevMonthOrders) * 100 : 0;

    // Customers change
    const currentMonthCustomers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: lastMonth, $lt: now }
    });
    const prevMonthCustomers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: twoMonthsAgo, $lt: lastMonth }
    });
    const customersChange = prevMonthCustomers ? 
      ((currentMonthCustomers - prevMonthCustomers) / prevMonthCustomers) * 100 : 0;

    // Revenue change
    const currentMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lt: now }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const prevMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twoMonthsAgo, $lt: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const currentMonthTotal = currentMonthRevenue[0]?.total || 0;
    const prevMonthTotal = prevMonthRevenue[0]?.total || 0;
    const revenueChange = prevMonthTotal ? 
      ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100 : 0;

    const stats = {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      changes: {
        products: productsChange,
        orders: ordersChange,
        customers: customersChange,
        revenue: revenueChange
      }
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
}
