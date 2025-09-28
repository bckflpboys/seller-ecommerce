import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Import PaystackButton dynamically with no SSR
const PaystackButton = dynamic(
  () => import('@/components/PaystackButton'),
  { ssr: false }
);

interface CartItem {
  _id: string;
  id?: string;  // Optional id field
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {} // Will be passed to the page component as props
  };
};

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { state: cart, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
    if (session?.user?.email) {
      setEmail(session.user.email);
      fetchUserAddress();
    }
  }, [cart.items.length, router, session]);

  const fetchUserAddress = async () => {
    try {
      const response = await fetch('/api/user/address');
      if (response.ok) {
        const data = await response.json();
        if (data.address) {
          setAddress(data.address);
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handlePaymentSuccess = async (reference: string) => {
    try {
      console.log('Payment successful, creating order with reference:', reference);
      
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items.map((item: CartItem) => ({
            productId: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
            image: item.image
          })),
          total: cart.total,
          paymentReference: reference,
          email,
          shippingAddress: {
            street: address.street,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      // Clear the cart after successful order
      clearCart();
      
      // Show success message
      toast.success('Order placed successfully!');

      // Redirect to order tracking page with a slight delay to ensure toast is shown
      setTimeout(() => {
        window.location.href = `/orders/${reference}`;
      }, 1000);
      
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please contact support.');
    }
  };

  const handlePaymentClose = () => {
    console.log('Payment cancelled by user');
    toast.error('Payment cancelled');
  };

  const handleAddressChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const validateFields = () => {
    const errors: Record<string, boolean> = {};
    
    // Check email
    if (!email.trim()) {
      errors.email = true;
    }
    
    // Check address fields
    if (!address.street.trim()) {
      errors.street = true;
    }
    if (!address.city.trim()) {
      errors.city = true;
    }
    if (!address.province.trim()) {
      errors.province = true;
    }
    if (!address.postalCode.trim()) {
      errors.postalCode = true;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAndPay = () => {
    const isValid = validateFields();
    if (!isValid) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Checkout</h1>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">{item.name}</p>
                    <p className="text-sm text-blue-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-blue-500">R{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-900">Total</span>
                  <span className="text-xl font-bold text-blue-500">R{cart.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.email ? 'border-red-500' : 'border-blue-200'}`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.email ? 'border-red-500' : 'border-blue-200'}`}
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-blue-900 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  value={address.street}
                  onChange={handleAddressChange('street')}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.street ? 'border-red-500' : 'border-blue-200'}`}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-blue-900 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={address.city}
                  onChange={handleAddressChange('city')}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.city ? 'border-red-500' : 'border-blue-200'}`}
                />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-blue-900 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  value={address.province}
                  onChange={handleAddressChange('province')}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.province ? 'border-red-500' : 'border-blue-200'}`}
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-blue-900 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange('postalCode')}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fieldErrors.postalCode ? 'border-red-500' : 'border-blue-200'}`}
                />
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6">
            <PaystackButton
              amount={cart.total}
              email={email}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
              validateBeforePay={validateAndPay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
