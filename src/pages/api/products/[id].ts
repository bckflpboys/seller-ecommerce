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
          isInStock: req.body.stock > 0,
          updatedAt: new Date(),
        };

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

        return res.status(500).json({ 
          error: 'Failed to update product',
          message: error.message
        });
      }

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || (session.user as any).role !== 'admin') {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        await getProduct(false); // Verify product exists
        await Product.findByIdAndDelete(id);
        
        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (err) {
        const error = err as Error;
        if (error.message === 'Product not found') {
          return res.status(404).json({ error: 'Product not found' });
        }
        console.error('Error deleting product:', error);
        return res.status(500).json({ 
          error: 'Failed to delete product',
          message: error.message
        });
      }

    case 'PATCH':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const { action } = req.body;
        const product = await getProduct();

        switch (action) {
          case 'review':
            // Add a review
            const { rating, comment } = req.body;
            if (!rating) {
              return res.status(400).json({ error: 'Rating is required' });
            }

            // Check if user has already reviewed
            const existingReviewIndex = product.reviews.findIndex(
              (review: any) => review.user.toString() === session.user.id
            );

            if (existingReviewIndex >= 0) {
              // Update existing review
              product.reviews[existingReviewIndex] = {
                user: session.user.id,
                rating,
                comment,
                createdAt: new Date(),
              };
            } else {
              // Add new review
              product.reviews.push({
                user: session.user.id,
                rating,
                comment,
                createdAt: new Date(),
              });
            }

            // Update average rating
            const totalRating = product.reviews.reduce(
              (sum: number, review: any) => sum + review.rating,
              0
            );
            product.ratings = {
              average: totalRating / product.reviews.length,
              count: product.reviews.length,
            };

            await product.save();
            break;

          default:
            return res.status(400).json({ error: 'Invalid action' });
        }

        return res.status(200).json(product);
      } catch (err) {
        const error = err as Error;
        console.error('Error updating product:', error);
        return res.status(500).json({ 
          error: 'Failed to update product',
          message: error.message
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
