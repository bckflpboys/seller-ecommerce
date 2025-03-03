import { useState } from 'react';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';

// This would come from your API/database
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Natural Cleaning Kit',
    description: 'Complete set of eco-friendly cleaning solutions made with natural ingredients.',
    price: 299.99,
    image: 'https://picsum.photos/seed/cleaning/800/800',
    category: 'Cleaning',
  },
  {
    _id: '2',
    name: 'Organic Soap Collection',
    description: 'Handmade soaps using organic ingredients and essential oils.',
    price: 199.99,
    image: 'https://picsum.photos/seed/soap/800/800',
    category: 'Personal Care',
  },
  {
    _id: '3',
    name: 'Herbal Tea Set',
    description: 'Premium organic herbal teas in a beautiful gift set.',
    price: 149.99,
    image: 'https://picsum.photos/seed/tea/800/800',
    category: 'Food',
  },
  {
    _id: '4',
    name: 'Glass Food Containers',
    description: 'Sustainable glass containers for food storage with bamboo lids.',
    price: 249.99,
    image: 'https://picsum.photos/seed/containers/800/800',
    category: 'Kitchen',
  },
  {
    _id: '5',
    name: 'Bamboo Kitchen Set',
    description: 'Complete kitchen utensil set made from sustainable bamboo.',
    price: 129.99,
    image: 'https://picsum.photos/seed/bamboo/800/800',
    category: 'Kitchen',
  },
  {
    _id: '6',
    name: 'Eco Laundry Bundle',
    description: 'Zero-waste laundry essentials including detergent strips and wool dryer balls.',
    price: 179.99,
    image: 'https://picsum.photos/seed/laundry/800/800',
    category: 'Cleaning',
  },
  {
    _id: '7',
    name: 'Natural Body Care Set',
    description: 'Complete body care package with lotion, scrub, and body butter.',
    price: 159.99,
    image: 'https://picsum.photos/seed/bodycare/800/800',
    category: 'Personal Care',
  },
  {
    _id: '8',
    name: 'Organic Spice Collection',
    description: 'Set of organic cooking spices in reusable glass jars.',
    price: 89.99,
    image: 'https://picsum.photos/seed/spices/800/800',
    category: 'Food',
  },
  {
    _id: '9',
    name: 'Reusable Produce Bags',
    description: 'Set of mesh produce bags for plastic-free grocery shopping.',
    price: 34.99,
    image: 'https://picsum.photos/seed/bags/800/800',
    category: 'Kitchen',
  },
];

const CATEGORIES = ['Cleaning', 'Personal Care', 'Food', 'Kitchen'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = MOCK_PRODUCTS
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
        <title>Products | EcoStore</title>
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
