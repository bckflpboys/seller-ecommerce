import { useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { Types } from 'mongoose';
import { SAMPLE_PRODUCTS } from '@/pages/index';

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
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

interface ProductsPageProps {
  products: ProductData[];
}

const CATEGORIES = ['Fertilizers', 'Tools', 'Soil'];

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
        default:
          return 0;
      }
    });

  return (
    <>
      <Head>
        <title>Products | Soil Solution</title>
        <meta name="description" content="Browse our collection of eco-friendly products" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <ProductFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setPriceRange}
              onSortChange={setSortBy}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-display text-3xl font-bold text-earth-dark">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await connectDB();
    const dbProducts = await Product.find({ isPublished: true }).lean();
    
    // Map database products to ensure all required fields exist
    const mappedDbProducts = dbProducts.map(product => ({
      _id: (product._id as Types.ObjectId).toString(),
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      image: product.image || '',
      category: product.category || 'Uncategorized',
      subcategory: product.subcategory || '',
      brand: product.brand || '',
      stock: product.stock || 0,
      isInStock: product.isInStock || false,
      isPublished: product.isPublished || false,
      isFeatured: product.isFeatured || false,
      features: product.features || [],
      slug: product.slug || ''
    }));

    const allProducts = [...mappedDbProducts, ...SAMPLE_PRODUCTS];

    return {
      props: {
        products: allProducts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: SAMPLE_PRODUCTS,
      },
      revalidate: 60,
    };
  }
};
