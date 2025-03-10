import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Share2, FileText, ListChecks, Box } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { Document, Model, Types } from 'mongoose';
import LikeButton from '@/components/LikeButton';

interface MongoProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  gallery?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  isInStock: boolean;
  lowStockThreshold: number;
  isFeatured: boolean;
  isBanner: boolean;
  isPublished: boolean;
  sku?: string;
  keyFeatures: string[];
  weight?: {
    value: number;
    unit: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductModel = Model<MongoProduct>;

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  gallery?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  isInStock: boolean;
  lowStockThreshold: number;
  isFeatured: boolean;
  isBanner: boolean;
  isPublished: boolean;
  sku?: string;
  keyFeatures: string[];
  weight?: {
    value: number;
    unit: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ProductPageProps {
  product: ProductData;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addItem } = useCart();

  // Ensure arrays have default values
  const images = product.images || [];
  const gallery = product.gallery || images;
  const keyFeatures = product.keyFeatures || [];

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error('Not enough stock available');
      return;
    }

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100">
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
              <LikeButton productId={product._id} />
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
                  <div className="relative w-full pb-[100%]">
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {gallery.length > 0 && (
                  <div className="p-6 border-t border-gray-100">
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className={`group relative aspect-square rounded-xl overflow-hidden bg-gray-50 ${
                            selectedImage === image ? 'ring-2 ring-sage ring-offset-2' : ''
                          }`}
                        >
                          <div className="relative w-full pb-[100%]">
                            <Image
                              src={image}
                              alt={`${product.name} - Image ${index + 1}`}
                              width={200}
                              height={200}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12">
                <div className="pb-6">
                  {/* Stock Status */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${product.isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-sm ${product.isInStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.isInStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {product.isInStock && product.stock <= product.lowStockThreshold && (
                      <p className="text-sm text-amber-600 mt-1">
                        Only {product.stock} left in stock - order soon
                      </p>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-xl font-semibold text-sage">{formatCurrency(product.price)}</p>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <p className="text-sm text-gray-500 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  {product.description && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-sage" />
                        <h2 className="text-lg font-semibold text-earth-dark">Description</h2>
                      </div>
                      <div 
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ 
                          __html: product.description.replace(/\n/g, '<br />') 
                        }}
                      />
                    </div>
                  )}

                  {/* Key Features */}
                  {keyFeatures?.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <ListChecks className="w-5 h-5 text-sage" />
                        <h2 className="text-lg font-semibold text-earth-dark">Key Features</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {keyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sage">◆</span>
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weight and Dimensions */}
                  {((product.weight?.value && product.weight?.unit) || 
                    (product.dimensions?.length && product.dimensions?.width && 
                     product.dimensions?.height && product.dimensions?.unit)) && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Box className="w-5 h-5 text-sage" />
                        <h2 className="text-lg font-semibold text-earth-dark">Specifications</h2>
                      </div>
                      <div className="space-y-1 text-gray-600">
                        {product.weight?.value && product.weight?.unit && (
                          <p>Weight: {product.weight.value} {product.weight.unit}</p>
                        )}
                        {product.dimensions?.length && product.dimensions?.width && 
                         product.dimensions?.height && product.dimensions?.unit && (
                          <p>
                            Dimensions: {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  {product.isInStock && (
                    <div>
                      <h2 className="text-sm font-medium text-gray-900 mb-2">Quantity</h2>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg">
                          <button
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                            className="p-2 hover:text-sage disabled:opacity-50 disabled:hover:text-current"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center">{quantity}</span>
                          <button
                            onClick={increaseQuantity}
                            disabled={quantity >= product.stock}
                            className="p-2 hover:text-sage disabled:opacity-50 disabled:hover:text-current"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        {product.stock <= product.lowStockThreshold && (
                          <span className="text-sm text-amber-600">
                            {product.stock} available
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.isInStock || quantity > product.stock}
                    className="w-full bg-sage text-white py-3 px-6 rounded-xl hover:bg-sage-dark transition-colors disabled:opacity-50 disabled:hover:bg-sage"
                  >
                    Add to Cart
                  </button>
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
  try {
    await connectDB();
    const products = await (Product as ProductModel).find({}, '_id').lean();
    
    const paths = products.map((product: { _id: Types.ObjectId }) => ({
      params: { id: product._id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    await connectDB();
    const product = await (Product as ProductModel).findById(params?.id).lean();

    if (!product) {
      return {
        notFound: true,
      };
    }

    // Convert MongoDB document to plain object and handle _id
    const serializedProduct = {
      ...product,
      _id: product._id.toString(),
      images: product.images || [],
      gallery: product.gallery || product.images || [],
      keyFeatures: product.keyFeatures || [],
      isInStock: typeof product.isInStock === 'boolean' ? product.isInStock : product.stock > 0,
      stock: product.stock || 0,
      lowStockThreshold: product.lowStockThreshold || 5,
      createdAt: product.createdAt?.toISOString() || null,
      updatedAt: product.updatedAt?.toISOString() || null,
    };

    return {
      props: {
        product: serializedProduct,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};
