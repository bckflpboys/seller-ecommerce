import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface OrderRequest {
  items: OrderItem[];
  total: number;
  paymentReference: string;
  email: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const orderData: OrderRequest = req.body;

    // Create new order
    const order = new Order({
      items: orderData.items,
      total: orderData.total,
      paymentReference: orderData.paymentReference,
      email: orderData.email,
      shippingAddress: orderData.shippingAddress,
      status: 'paid' // Set initial status to paid since payment is confirmed
    });

    // Save the order
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
}
