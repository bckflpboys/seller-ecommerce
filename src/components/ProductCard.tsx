import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

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
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-warm group hover:shadow-xl hover:border-sage/30 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-sage hover:text-white transition-colors duration-200">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-sage hover:text-white transition-colors duration-200">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow border-t-2 border-gray-200">
        <div className="mb-2">
          <span className="text-xs font-medium text-sage-dark uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-display text-lg font-bold text-earth-dark mb-1 hover:text-earth transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-gray-200 bg-gray-100/80">
          <span className="text-lg font-bold text-earth">
            {formatCurrency(product.price)}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="inline-flex items-center text-sm font-medium text-sage hover:text-sage-dark transition-colors duration-200 px-4 py-1.5 rounded-full hover:bg-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
