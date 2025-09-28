import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { format } from 'date-fns';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  paymentReference: string;
  email: string;
  shippingAddress: ShippingAddress;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

const OrderStatus = ({ status }: { status: Order['status'] }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        console.log('Fetching order with ID:', id);
        const response = await fetch(`/api/orders/${id}`);
        
        if (!response.ok) {
          throw new Error('Order not found');
        }
        
        const data = await response.json();
        console.log('Order data received:', data);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error || 'Order not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg border-2 border-blue-200 rounded-lg overflow-hidden">
          {/* Order Header */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b-2 border-blue-200 bg-white">
            <div>
              <h3 className="text-xl leading-6 font-semibold text-blue-900">
                Order Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-blue-600">
                Order Reference: {order.paymentReference}
              </p>
            </div>
            <OrderStatus status={order.status} />
          </div>

          {/* Order Info */}
          <div className="border-b-2 border-blue-200 px-4 py-5 sm:px-6 bg-blue-50">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-semibold text-blue-600">Order Date</dt>
                <dd className="mt-1 text-sm text-blue-900">
                  {format(new Date(order.createdAt), 'PPP')}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-semibold text-blue-600">Email</dt>
                <dd className="mt-1 text-sm text-blue-900">{order.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-blue-600">Shipping Address</dt>
                <dd className="mt-1 text-sm text-blue-900 p-4 bg-white rounded-md border-2 border-blue-200 shadow-sm">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}<br />
                  {order.shippingAddress.province}, {order.shippingAddress.postalCode}
                </dd>
              </div>
            </dl>
          </div>

          {/* Order Items */}
          <div className="border-b-2 border-blue-200 bg-white">
            <div className="px-4 py-5 sm:px-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 shadow-sm">
                    <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden border-2 border-blue-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-blue-900">{item.name}</p>
                      <p className="text-sm text-blue-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-blue-600">Price per item: R{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex-shrink-0 text-base font-semibold text-blue-900">
                      Total: R{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="px-6 py-6 bg-blue-50 border-t-2 border-blue-200">
            <div className="flex justify-end">
              <div className="text-xl font-semibold text-blue-900">
                Total: R{order.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
