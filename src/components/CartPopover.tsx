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
      <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 cart-popup">
        <p className="text-center text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-51 border border-blue-400 cart-popup">
      <div className="max-h-96 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 py-2 border-b border-blue-100 last:border-0">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
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
