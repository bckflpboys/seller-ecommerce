import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const {
          category,
          subcategory,
          featured,
          inStock,
          minPrice,
          maxPrice,
          sort = 'createdAt',
          order = 'desc',
          limit = '12',
          page = '1',
          search,
        } = req.query;

        // Build query
        const query: any = {};

        // Filter by category
        if (category) {
          query.category = category;
        }

        // Filter by subcategory
        if (subcategory) {
          query.subcategory = subcategory;
        }

        // Filter by featured status
        if (featured === 'true') {
          query.isFeatured = true;
        }

        // Filter by stock status
        if (inStock === 'true') {
          query.isInStock = true;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Filter by search term
        if (search) {
          query.$text = { $search: search };
        }

        // Only show published products for non-admin users
        const session = await getServerSession(req, res, authOptions);
        if (!session || (session.user as any).role !== 'admin') {
          query.isPublished = true;
        }

        // Calculate pagination
        const pageSize = parseInt(limit as string);
        const currentPage = parseInt(page as string);
        const skip = (currentPage - 1) * pageSize;

        // Build sort object
        const sortObj: any = {};
        switch (sort) {
          case 'price':
            sortObj.price = order === 'desc' ? -1 : 1;
            break;
          case 'name':
            sortObj.name = order === 'desc' ? -1 : 1;
            break;
          case 'stock':
            sortObj.stock = order === 'desc' ? -1 : 1;
            break;
          case 'rating':
            sortObj['ratings.average'] = order === 'desc' ? -1 : 1;
            sortObj['ratings.count'] = -1; // Secondary sort by number of ratings
            break;
          case 'popularity':
            sortObj['ratings.count'] = order === 'desc' ? -1 : 1;
            break;
          case 'newest':
            sortObj.createdAt = -1;
            break;
          case 'updated':
            sortObj.updatedAt = -1;
            break;
          default:
            sortObj.createdAt = order === 'desc' ? -1 : 1;
        }

        // Execute query with pagination
        const products = await Product.find(query)
          .sort(sortObj)
          .skip(skip)
          .limit(pageSize)
          .select('-reviews'); // Exclude reviews for performance

        // Get total count for pagination
        const total = await Product.countDocuments(query);

        res.status(200).json({
          products,
          pagination: {
            total,
            pageSize,
            currentPage,
            totalPages: Math.ceil(total / pageSize),
          },
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || (session.user as any).role !== 'admin') {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Validate required fields
        const { name, description, price, category, image, keyFeatures } = req.body;
        if (!name || !description || !price || !category || !image || !keyFeatures || !keyFeatures.length) {
          return res.status(400).json({
            error: 'Missing required fields',
            required: ['name', 'description', 'price', 'category', 'image', 'keyFeatures'],
            received: { name, description, price, category, image, keyFeatures }
          });
        }

        // Validate key features
        if (keyFeatures.length > 4) {
          return res.status(400).json({
            error: 'Validation error',
            details: ['Maximum 4 key features allowed'],
          });
        }

        // Create product with default values
        const productData = {
          ...req.body,
          isInStock: req.body.stockQuantity > 0,
          stock: req.body.stockQuantity,
          slug: req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        };

        const product = await Product.create(productData);
        res.status(201).json(product);
      } catch (error: any) {
        console.error('Error creating product:', error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
          return res.status(400).json({
            error: 'Duplicate value',
            field: Object.keys(error.keyPattern)[0],
          });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            error: 'Validation error',
            details: Object.values(error.errors).map((err: any) => err.message),
          });
        }

        res.status(500).json({ error: 'Failed to create product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
