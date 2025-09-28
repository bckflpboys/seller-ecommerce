import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { useState, useEffect } from 'react';

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isInStock: boolean;
}

interface HomeProps {
  products: ProductType[];
}

export default function Home({ products: initialProducts }: HomeProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
  }, [initialProducts]);

  const renderSkeletons = () => {
    return Array(4).fill(null).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/clousoft-banner-video.mp4"
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-earth-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-white text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Soil Solution
            </h1>
            <p className="text-xl mb-8">
              Discover our collection of premium fertilizers, soil supplements, and agricultural solutions.
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
          <h2 className="text-3xl font-bold mb-8 text-earth-dark text-center">
            Featured Products
          </h2>
          <div className={`grid grid-cols-1 gap-6 ${
            !isLoading && products.length === 1 
              ? 'md:grid-cols-1 md:max-w-md mx-auto' 
              : !isLoading && products.length === 2 
                ? 'md:grid-cols-2 md:max-w-3xl mx-auto'
                : !isLoading && products.length === 3 
                  ? 'md:grid-cols-3 md:max-w-5xl mx-auto'
                  : 'md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {isLoading ? (
              renderSkeletons()
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No products available at the moment.
              </div>
            )}
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
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectDB();
    
    // First try to get featured products
    let products = await Product.find({ isFeatured: true })
      .select('_id name description price category image stock isInStock')
      .limit(4)
      .lean();

    // If no featured products, get the latest 4 products
    if (products.length === 0) {
      products = await Product.find()
        .select('_id name description price category image stock isInStock')
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();
    }

    const serializedProducts = products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      price: Number(product.price),
      stock: Number(product.stock),
      isInStock: Boolean(product.isInStock)
    }));

    return {
      props: {
        products: serializedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
};
