import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
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

  console.log('=== Starting Order Creation API ===');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  try {
    console.log('1. Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connection state:', mongoose.connection.readyState);

    console.log('2. Parsing request body...');
    const { items, total, paymentReference, email, shippingAddress } = req.body as OrderRequest;
    console.log('Received data:', { items, total, paymentReference, email, shippingAddress });

    console.log('3. Validating request data...');
    if (!items?.length) {
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!items.every(item => item.productId)) {
      return res.status(400).json({ message: 'All items must have a productId' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    if (!paymentReference) {
      return res.status(400).json({ message: 'Payment reference is required' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.province || !shippingAddress?.postalCode) {
      return res.status(400).json({ message: 'Complete shipping address is required' });
    }

    console.log('4. Creating order...');
    const order = new Order({
      items,
      total,
      paymentReference,
      email,
      shippingAddress,
      status: 'paid'
    });

    console.log('5. Saving order to database...');
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder);

    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });

  } catch (error) {
    console.error('Error in order creation:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
