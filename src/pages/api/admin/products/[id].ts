import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
