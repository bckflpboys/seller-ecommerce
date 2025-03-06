import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

// Sample products from homepage
const SAMPLE_PRODUCTS = [
  {
    _id: 'sample1',
    name: 'Organic Cleaning Kit',
    description: 'All-natural cleaning solutions for your home',
    longDescription: 'Our Organic Cleaning Kit is a comprehensive set of eco-friendly cleaning solutions that are safe for your home and the environment. Made with natural ingredients, these products effectively clean while being gentle on surfaces and safe for your family.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546552768-9e3a94b38a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Cleaning',
    gallery: [
      'https://images.unsplash.com/photo-1546552768-9e3a94b38a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    ],
    features: [
      'All-natural ingredients',
      'Safe for all surfaces',
      'Biodegradable packaging',
      'Pet and child friendly'
    ],
    inStock: true
  },
  {
    _id: 'sample2',
    name: 'Natural Bath Set',
    description: 'Handmade soaps and bath products',
    longDescription: 'Experience the luxury of natural bathing with our handcrafted bath set. Each product is made with organic ingredients and essential oils, providing a spa-like experience in your own home.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1592029780368-c1fff15bcfd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1989&q=80',
    category: 'Personal Care',
    gallery: [
      'https://images.unsplash.com/photo-1592029780368-c1fff15bcfd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1989&q=80',
      'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1989&q=80',
      'https://images.unsplash.com/photo-1584305574694-52628e04c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=1989&q=80'
    ],
    features: [
      'Organic ingredients',
      'Essential oils',
      'Handmade with care',
      'No artificial fragrances'
    ],
    inStock: true
  },
  {
    _id: 'sample3',
    name: 'Eco-Friendly Kitchen Set',
    description: 'Sustainable kitchen essentials for conscious cooking',
    longDescription: 'Transform your kitchen into an eco-friendly space with our sustainable kitchen essentials. This set includes everything you need to reduce waste and cook sustainably.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Kitchen',
    gallery: [
      'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    features: [
      'Plastic-free',
      'Durable materials',
      'Reusable design',
      'Easy to clean'
    ],
    inStock: true
  },
  {
    _id: 'sample4',
    name: 'Organic Tea Collection',
    description: 'Premium organic teas from sustainable sources',
    longDescription: 'Discover our carefully curated collection of organic teas sourced from sustainable farms around the world. Each blend is crafted to provide the perfect cup of tea.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    category: 'Food',
    gallery: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
      'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80'
    ],
    features: [
      'Organic certified',
      'Fair trade',
      'Biodegradable packaging',
      'Multiple varieties'
    ],
    inStock: true
  }
];

interface ProductData {
  _id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery: string[];
  category: string;
  inStock: boolean;
  features: string[];
}

interface ProductPageProps {
  product: ProductData;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/products" 
              className="inline-flex items-center text-earth hover:text-earth-dark transition-colors text-sm font-medium group"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-sage/5 group-hover:bg-sage/10 mr-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </span>
              Back to Products
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:text-sage transition-colors" aria-label="Search">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-sage transition-colors" aria-label="Cart">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-sage-500/5 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <div className="lg:border-r border-gray-100">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-6 border-t border-gray-100">
                  <div className="grid grid-cols-4 gap-4">
                    <button
                      onClick={() => setSelectedImage(product.image)}
                      className={`group relative aspect-square rounded-xl overflow-hidden bg-gray-50 ${
                        selectedImage === product.image ? 'ring-2 ring-sage ring-offset-2' : ''
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                    </button>
                    {product.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`group relative aspect-square rounded-xl overflow-hidden bg-gray-50 ${
                          selectedImage === image ? 'ring-2 ring-sage ring-offset-2' : ''
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12 lg:max-h-[900px] overflow-y-auto scrollbar-thin scrollbar-thumb-sage/10 scrollbar-track-transparent">
                {/* Header */}
                <div className="space-y-4 pb-8 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-sm font-medium">
                      {product.category}
                    </span>
                    {product.inStock ? (
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-earth-dark">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-bold text-earth">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                {/* Description */}
                <div className="py-8 border-b border-gray-100">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="py-8 border-b border-gray-100">
                  <h3 className="font-display font-bold text-xl text-earth-dark mb-6">
                    Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 rounded-xl bg-gradient-to-br from-sage-50/50 to-transparent"
                      >
                        <span className="w-2 h-2 bg-sage rounded-full mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Options */}
                <div className="pt-8 space-y-6">
                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1">
                        <button
                          onClick={decreaseQuantity}
                          className="p-3 hover:text-sage transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                          onClick={increaseQuantity}
                          className="p-3 hover:text-sage transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        className="p-4 hover:text-sage transition-colors bg-gray-50 rounded-xl" 
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      className="w-full bg-sage text-white px-8 py-4 rounded-xl font-medium hover:bg-sage-dark transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2"
                      onClick={() => {
                        // Add to cart logic here
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full bg-earth text-white px-8 py-4 rounded-xl font-medium hover:bg-earth-dark transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-earth focus:ring-offset-2"
                      onClick={() => {
                        // Buy now logic here
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SAMPLE_PRODUCTS.map((product) => ({
      params: { id: product._id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = SAMPLE_PRODUCTS.find(p => p._id === params?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
