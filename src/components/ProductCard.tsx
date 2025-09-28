import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import LikeButton from './LikeButton';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-blue-400 shadow-warm group hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <div className="relative w-full pb-[100%]">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <LikeButton productId={product._id} />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow border-t-2 border-blue-300">
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-display text-lg font-bold text-blue-900 mb-1 hover:text-blue-500 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 pb-2 border-t-2 border-blue-300 bg-blue-50">
          <span className="text-base sm:text-lg font-bold text-blue-900">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1 text-xs font-medium text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-200 px-2 py-1 rounded-full whitespace-nowrap ml-2"
          >
            <ShoppingCart className="w-3 h-3" />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
