import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

interface HomeProps {
  featuredProducts: any[];
}

// Sample products to show when no featured products are available
const SAMPLE_PRODUCTS = [
  {
    _id: 'sample1',
    name: 'Organic Cleaning Kit',
    description: 'All-natural cleaning solutions for your home',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546552768-9e3a94b38a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Cleaning',
  },
  {
    _id: 'sample2',
    name: 'Natural Bath Set',
    description: 'Handmade soaps and bath products',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1592029780368-c1fff15bcfd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1989&q=80',
    category: 'Personal Care',
  },
  {
    _id: 'sample3',
    name: 'Eco-Friendly Kitchen Set',
    description: 'Sustainable kitchen essentials for conscious cooking',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Kitchen',
  },
  {
    _id: 'sample4',
    name: 'Organic Tea Collection',
    description: 'Premium organic teas from sustainable sources',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    category: 'Food',
  },
];

export default function Home({ featuredProducts }: HomeProps) {
  const productsToShow = featuredProducts.length > 0 ? featuredProducts : SAMPLE_PRODUCTS;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1485637701894-09ad422f6de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-earth-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-white text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to EcoStore
            </h1>
            <p className="text-xl mb-8">
              Discover our collection of natural products, eco-friendly cleaning solutions, and sustainable food items.
            </p>
            <Link
              href="/products"
              className="inline-block bg-sage hover:bg-sage-dark text-white px-8 py-3 rounded-md font-semibold transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-earth-dark text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToShow.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-sage hover:bg-sage-dark text-white px-8 py-3 rounded-md font-semibold transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4 text-earth-dark">Eco-Friendly</h3>
                <p className="text-gray-600">
                  All our products are carefully selected to minimize environmental impact
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4 text-earth-dark">Natural Ingredients</h3>
                <p className="text-gray-600">
                  Pure and natural ingredients for your health and well-being
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4 text-earth-dark">Sustainable Packaging</h3>
                <p className="text-gray-600">
                  Environmentally conscious packaging for a better planet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectDB();
    const products = await Product.find({ featured: true }).limit(4).lean();
    
    return {
      props: {
        featuredProducts: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return {
      props: {
        featuredProducts: [],
      },
    };
  }
};
