import { useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { SAMPLE_PRODUCTS } from '@/pages/index';

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductsPageProps {
  products: ProductData[];
}

const CATEGORIES = ['Cleaning', 'Personal Care', 'Kitchen', 'Food'];

export default function ProductsPage({ products: initialProducts }: ProductsPageProps) {
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
        <title>Products - Soil Solution</title>
        <meta name="description" content="Browse our collection of eco-friendly products" />
      </Head>

      <div className="container mx-auto px-4 py-8">
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: SAMPLE_PRODUCTS
    },
    revalidate: 60
  };
};
