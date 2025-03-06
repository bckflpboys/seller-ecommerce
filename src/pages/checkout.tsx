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
      console.log('Payment success callback triggered with reference:', reference);
      console.log('Starting order creation with reference:', reference);
      
      // Prepare order items with productId
      const orderItems = cart.items.map(item => ({
        productId: item._id || item.id, // Try both _id and id
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        image: item.image
      }));

      const orderData = {
        items: orderItems,
        total: cart.total,
        paymentReference: reference,
        email,
        shippingAddress: address
      };

      console.log('Sending order data to API:', JSON.stringify(orderData, null, 2));

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('Order API response status:', response.status);
      const data = await response.json();
      console.log('Order API response data:', data);

      if (!response.ok) {
        console.error('Order API error:', data);
        toast.error(data.message || 'Failed to create order');
        return;
      }

      console.log('Order created successfully:', data);
      clearCart();
      toast.success('Order placed successfully!');
      router.push('/orders');
    } catch (error) {
      console.error('Error in handlePaymentSuccess:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-earth-dark mb-8">Checkout</h1>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-earth-dark mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-earth-dark">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-sage">R{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-earth-dark">Total</span>
                  <span className="text-xl font-bold text-sage">R{cart.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-earth-dark mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-earth-dark mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  value={address.street}
                  onChange={handleAddressChange('street')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent ${
                    fieldErrors.street ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={address.city}
                  onChange={handleAddressChange('city')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent ${
                    fieldErrors.city ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  value={address.province}
                  onChange={handleAddressChange('province')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent ${
                    fieldErrors.province ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange('postalCode')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent ${
                    fieldErrors.postalCode ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PaystackButton
              amount={cart.total}
              email={email}
              onSuccess={handlePaymentSuccess}
              handleClose={handlePaymentClose}
              validateBeforePay={validateAndPay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
