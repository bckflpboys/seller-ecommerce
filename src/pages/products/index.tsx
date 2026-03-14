import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Get actual categories from database
const CATEGORIES = [
  'toilet-paper',
  '1-ply-toilet-paper',
  '2-ply-toilet-paper'
];

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isInStock: boolean;
}

interface ProductsPageProps {
  initialProducts: Product[];
}

export default function ProductsPage({ initialProducts }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = initialProducts
    .filter((product) => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <>
      <Head>
        <title>Products - MoonSoft</title>
        <meta name="description" content="Browse our collection of premium toilet paper products" />
      </Head>

      <div className="min-h-screen relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/light-bg.jpeg"
            alt="Background"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
              <ProductFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            </aside>

            <main className="w-full md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectDB();
    
    // Fetch products from database
    const products = await Product.find({})
      .select('_id name description price category image stock isInStock')
      .lean();

    // Convert _id to string and ensure all data is serializable
    const serializedProducts = products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      price: Number(product.price),
      stock: Number(product.stock),
      isInStock: Boolean(product.isInStock)
    }));

    return {
      props: {
        initialProducts: serializedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        initialProducts: []
      }
    };
  }
};
