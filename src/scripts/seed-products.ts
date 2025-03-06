import mongoose from 'mongoose';
import Product from '../models/Product';

interface ProductDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  subcategory: string;
  brand: string;
  stock: number;
  isInStock: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  features: string[];
  slug: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

const sampleProducts = [
  {
    name: 'Organic Fertilizer',
    slug: 'organic-fertilizer',
    description: 'Premium organic fertilizer for all types of plants',
    longDescription: `Our premium organic fertilizer is perfect for all your gardening needs. Made from 100% natural ingredients, it provides essential nutrients for healthy plant growth.

    Benefits:
    • Improves soil structure
    • Promotes root development
    • Enhances nutrient uptake
    • Safe for all plants
    • Environment-friendly

    Usage Instructions:
    Apply 2-3 times per growing season. Mix with soil before planting or spread around existing plants.`,
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    gallery: [
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    ],
    category: 'Fertilizers',
    subcategory: 'Organic',
    brand: 'EcoGrow',
    stock: 100,
    isInStock: true,
    isPublished: true,
    isFeatured: true,
    features: [
      '100% Organic',
      'Rich in nutrients',
      'Improves soil health',
      'Long-lasting effect',
      'Easy to apply',
    ],
  },
  {
    name: 'Soil pH Tester',
    slug: 'soil-ph-tester',
    description: 'Professional digital soil pH and moisture meter',
    longDescription: `Get accurate soil readings with our professional digital pH and moisture meter. Perfect for both home gardeners and agriculture professionals.

    Features:
    • Digital LCD display
    • Dual pH and moisture readings
    • Auto-calibration
    • Long battery life
    • Waterproof design

    Package Includes:
    - Digital pH meter
    - 2 AAA batteries
    - Carrying case
    - User manual`,
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    gallery: [
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    ],
    category: 'Tools',
    subcategory: 'Testing Equipment',
    brand: 'SoilTech',
    stock: 50,
    isInStock: true,
    isPublished: true,
    isFeatured: true,
    features: [
      'Digital display',
      'Dual measurements',
      'Auto-calibration',
      'Professional grade',
      'Easy to use',
    ],
  },
  {
    name: 'Premium Potting Mix',
    slug: 'premium-potting-mix',
    description: 'Professional grade potting soil for indoor and outdoor plants',
    longDescription: `Our premium potting mix is specially formulated for optimal plant growth. Perfect for both indoor and outdoor containers.

    Composition:
    • Premium peat moss
    • Perlite for aeration
    • Vermiculite for water retention
    • Organic compost
    • Essential nutrients

    Ideal for:
    - Indoor plants
    - Container gardens
    - Seedling starts
    - Transplanting`,
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    gallery: [
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    ],
    category: 'Soil',
    subcategory: 'Potting Mix',
    brand: 'GardenPro',
    stock: 200,
    isInStock: true,
    isPublished: true,
    isFeatured: true,
    features: [
      'Professional grade',
      'Balanced nutrition',
      'Excellent drainage',
      'pH balanced',
      'Ready to use',
    ],
  },
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/soil-solution');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log('Added sample products:', products.map((p: ProductDocument) => ({ id: p._id.toString(), name: p.name })));

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProducts();
