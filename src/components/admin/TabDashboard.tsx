import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import TabOrders from './TabOrders';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  changes: {
    products: number;
    orders: number;
    customers: number;
    revenue: number;
  };
}

export default function TabDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    {
      title: 'Total Products',
      value: stats?.totalProducts ?? 0,
      change: `${stats?.changes?.products?.toFixed(1) ?? 0}%`,
      icon: Package,
      trend: (stats?.changes?.products ?? 0) >= 0 ? 'up' : 'down'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders ?? 0,
      change: `${stats?.changes?.orders?.toFixed(1) ?? 0}%`,
      icon: ShoppingBag,
      trend: (stats?.changes?.orders ?? 0) >= 0 ? 'up' : 'down'
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers ?? 0,
      change: `${stats?.changes?.customers?.toFixed(1) ?? 0}%`,
      icon: Users,
      trend: (stats?.changes?.customers ?? 0) >= 0 ? 'up' : 'down'
    },
    {
      title: 'Revenue',
      value: `R${(stats?.totalRevenue ?? 0).toFixed(2)}`,
      change: `${stats?.changes?.revenue?.toFixed(1) ?? 0}%`,
      icon: TrendingUp,
      trend: (stats?.changes?.revenue ?? 0) >= 0 ? 'up' : 'down'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Loading skeleton for stats
          Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="mt-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          statsData.map((stat) => {
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
          })
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <TabOrders limit={5} />
      </div>
    </div>
  );
}
