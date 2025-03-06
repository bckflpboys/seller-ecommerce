import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface Order {
  _id: string;
  paymentReference: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export default function TabOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/orders?page=${currentPage}&status=${statusFilter === 'all' ? '' : statusFilter}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-earth">
                      {order.paymentReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.paymentReference, e.target.value)}
                        className={`px-2 text-sm font-semibold rounded-full border-0 ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      R{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => router.push(`/orders/${order.paymentReference}`)}
                        className="text-earth hover:text-earth-dark transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && orders.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
