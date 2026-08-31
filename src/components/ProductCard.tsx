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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-blue-400 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <div className="relative w-full pb-[100%]">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-navy-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <LikeButton productId={product._id} />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-display text-base sm:text-lg font-bold text-navy-950 mb-1.5 hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow font-light">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-mono">PRICE</span>
            <span className="text-base sm:text-lg font-mono font-bold text-navy-950">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy-950 hover:bg-blue-600 transition-colors px-3.5 py-2 rounded-xl shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
