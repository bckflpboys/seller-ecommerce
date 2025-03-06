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
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-51 cart-popup">
      <div className="max-h-96 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-earth-dark truncate">{item.name}</h4>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-sage">{formatCurrency(item.price * item.quantity)}</p>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-earth-dark">Total</span>
          <span className="text-lg font-bold text-sage">{formatCurrency(cart.total)}</span>
        </div>
        <Link
          href="/cart"
          onClick={() => onClose()}
          className="block w-full bg-sage text-white text-center py-2 rounded-md hover:bg-sage-dark transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
