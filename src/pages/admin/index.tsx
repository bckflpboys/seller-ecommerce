import AdminLayout from '@/components/AdminLayout';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

// Sample data (replace with real data from your database)
const stats = [
  {
    title: 'Total Products',
    value: '124',
    change: '+12%',
    icon: Package,
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '456',
    change: '+23%',
    icon: ShoppingBag,
    trend: 'up'
  },
  {
    title: 'Total Customers',
    value: '2,345',
    change: '+8%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Revenue',
    value: '$12,456',
    change: '+18%',
    icon: TrendingUp,
    trend: 'up'
  }
];

// Sample recent orders
const recentOrders = [
  {
    id: '#12345',
    customer: 'John Doe',
    date: '2025-03-06',
    status: 'Delivered',
    total: '$129.99'
  },
  {
    id: '#12344',
    customer: 'Jane Smith',
    date: '2025-03-06',
    status: 'Processing',
    total: '$79.99'
  },
  {
    id: '#12343',
    customer: 'Mike Johnson',
    date: '2025-03-05',
    status: 'Shipped',
    total: '$199.99'
  }
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm hover:border-sage/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="bg-sage/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-sage" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-600"> from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:border-sage/50 transition-colors duration-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-earth">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
