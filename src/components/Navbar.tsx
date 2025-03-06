import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Leaf, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import CartPopover from './CartPopover';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { state: cart } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      
      // Don't close if clicking inside cart popup or on cart button
      if (cartRef.current?.contains(target)) {
        return;
      }

      // Don't close if clicking on a link or button inside the cart popup
      if (target.closest('.cart-popup')) {
        return;
      }

      setIsCartOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-primary-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-earth" />
            <div className="font-display">
              <span className="text-2xl font-bold text-earth">Eco</span>
              <span className="text-2xl font-bold text-sage">Store</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link 
                href="/products" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4 border-l border-primary-200 pl-8">
              <div 
                ref={cartRef}
                className="relative"
              >
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative hover:text-earth transition-colors duration-200"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-sage text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.itemCount}
                    </span>
                  )}
                </button>
                {isCartOpen && <CartPopover onClose={() => setIsCartOpen(false)} />}
              </div>
              
              {session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile" className="hover:text-earth transition-colors duration-200">
                    <User className="w-6 h-6" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-earth-dark text-white px-4 py-2 rounded-lg hover:bg-earth transition-colors duration-200 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-earth-dark text-white px-6 py-2 rounded-lg hover:bg-earth transition-colors duration-200 text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <div 
              ref={cartRef}
              className="relative"
            >
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative hover:text-earth transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sage text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </button>
              {isCartOpen && <CartPopover onClose={() => setIsCartOpen(false)} />}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-earth-dark hover:text-earth transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-earth-dark hover:text-earth transition-colors duration-200 font-medium"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-primary-200">
                {session ? (
                  <div className="flex flex-col space-y-4">
                    <Link 
                      href="/profile" 
                      className="flex items-center space-x-2 text-earth-dark hover:text-earth transition-colors duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="bg-earth-dark text-white px-4 py-2 rounded-lg hover:bg-earth transition-colors duration-200 text-sm font-medium w-full"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="bg-earth-dark text-white px-4 py-2 rounded-lg hover:bg-earth transition-colors duration-200 text-sm font-medium block text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
