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

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string;
        const category = req.query.category as string;
        const sort = req.query.sort as string || '-createdAt';

        // Build query
        const query: any = {};
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        if (category) {
          query.category = category;
        }

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await Product.countDocuments(query);

        // Fetch products
        const products = await Product.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit);

        // Calculate total pages
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
          products,
          pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
          },
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
