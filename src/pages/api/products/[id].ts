import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authOptions } from '../auth/[...nextauth]';
import { MongoError } from 'mongodb';

interface ValidationError extends Error {
  errors: { [key: string]: { message: string } };
}

interface MongoServerError extends MongoError {
  code: number;
  keyPattern?: { [key: string]: number };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  // Verify product exists and is published (for non-admin users)
  const getProduct = async (requirePublished = true) => {
    const query: any = { _id: id };
    if (requirePublished) {
      const session = await getServerSession(req, res, authOptions);
      if (!session || (session.user as any).role !== 'admin') {
        query.isPublished = true;
      }
    }
    const product = await Product.findOne(query);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };

  switch (req.method) {
    case 'GET':
      try {
        const product = await getProduct();
        return res.status(200).json(product);
      } catch (err) {
        const error = err as Error;
        if (error.message === 'Product not found') {
          return res.status(404).json({ error: 'Product not found' });
        }
        console.error('Error fetching product:', error);
        return res.status(500).json({ 
          error: 'Failed to fetch product',
          message: error.message 
        });
      }

    case 'PUT':
    case 'PATCH':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || (session.user as any).role !== 'admin') {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Get current product
        const currentProduct = await getProduct(false);

        // Update data
        const updateData = {
          ...req.body,
          updatedAt: new Date(),
        };

        // For PUT requests or when stock is provided
        if (req.method === 'PUT' || req.body.stock !== undefined) {
          updateData.isInStock = req.body.stock > 0;
        }

        // If name is changed, update slug (unless slug is manually provided)
        if (req.body.name && req.body.name !== currentProduct.name && !req.body.slug) {
          updateData.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        const product = await Product.findByIdAndUpdate(
          id,
          { $set: updateData },
          {
            new: true,
            runValidators: true,
          }
        );

        return res.status(200).json(product);
      } catch (err) {
        console.error('Error updating product:', err);

        const error = err as Error | MongoServerError | ValidationError;

        if (error.message === 'Product not found') {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Handle duplicate key errors
        if ('code' in error && error.code === 11000) {
          return res.status(400).json({
            error: 'Duplicate value',
            field: Object.keys((error as MongoServerError).keyPattern || {}).join(', '),
          });
        }

        // Handle validation errors
        if ('errors' in error) {
          return res.status(400).json({
            error: 'Validation error',
            details: Object.values(error.errors).map(err => err.message),
          });
        }

        return res.status(500).json({ error: 'Failed to update product' });
      }

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || (session.user as any).role !== 'admin') {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Failed to delete product' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
