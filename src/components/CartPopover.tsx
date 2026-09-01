import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';

interface CartPopoverProps {
  onClose: () => void;
}

export default function CartPopover({ onClose }: CartPopoverProps) {
  const { state: cart, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-white rounded-xl shadow-xl p-4 cart-popup border border-slate-200 z-50">
        <p className="text-center text-gray-500 text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-white rounded-xl shadow-xl p-4 z-50 border border-slate-200 cart-popup">
      <div className="max-h-96 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 py-2 border-b border-blue-100 last:border-0">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-blue-900 truncate">{item.name}</h4>
              <p className="text-xs text-blue-400">Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-blue-500">{formatCurrency(item.price * item.quantity)}</p>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="p-1 hover:bg-blue-50 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-blue-900">Total</span>
          <span className="text-lg font-bold text-blue-500">{formatCurrency(cart.total)}</span>
        </div>
        <Link
          href="/cart"
          onClick={() => onClose()}
          className="block w-full bg-blue-400 text-white text-center py-2 rounded-md hover:bg-blue-500 transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
