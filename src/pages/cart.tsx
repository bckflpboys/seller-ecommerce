import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, ArrowRightIcon } from 'lucide-react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {} // Will be passed to the page component as props
  };
};

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-blue-400" />
            <h2 className="mt-6 text-3xl font-display font-bold text-blue-900">
              Your cart is empty
            </h2>
            <p className="mt-4 text-blue-800">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-display font-bold text-blue-900">
            Shopping Cart ({state.itemCount} items)
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg border border-blue-200 p-4 sm:p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item._id}`}
                      className="text-lg font-medium text-blue-900 hover:text-blue-600 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-blue-500">{item.category}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center bg-blue-50 rounded-lg border border-blue-200">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, Math.max(1, item.quantity - 1))
                          }
                          className="p-2 hover:text-blue-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-blue-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-2 hover:text-blue-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-800">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-blue-600">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 sticky top-4">
              <h2 className="text-xl font-display font-bold text-blue-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-blue-800">
                  <span>Subtotal</span>
                  <span>{formatCurrency(state.total)}</span>
                </div>
                <div className="flex justify-between text-blue-800">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-blue-800">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-blue-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-blue-900">
                    <span>Total</span>
                    <span>{formatCurrency(state.total)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
