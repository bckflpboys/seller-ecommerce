import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

interface AnalyticsData {
  salesData: Array<{
    name: string;
    sales: number;
  }>;
  productPerformance: Array<{
    name: string;
    sales: number;
  }>;
  keyMetrics: Array<{
    label: string;
    value: string;
  }>;
  orderStatusDistribution: Array<{
    status: string;
    count: number;
  }>;
  topSellingProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  timeAnalytics: {
    peakDay: {
      name: string;
      orders: number;
    };
    peakHour: {
      name: string;
      orders: number;
    };
    hourlyOrders: Array<{
      name: string;
      orders: number;
    }>;
    avgProcessingTime: number;
  };
}

const COLORS = ['#4F772D', '#90A955', '#31572C', '#132A13', '#ECF39E'];
const STATUS_COLORS = {
  'processing': '#fbbf24',
  'shipped': '#60a5fa',
  'delivered': '#34d399'
};

export default function TabAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Sales Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4F772D" name="Sales (R)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#90A955" name="Sales (R)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.orderStatusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.orderStatusDistribution.map((entry) => (
                    <Cell 
                      key={entry.status} 
                      fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || '#cbd5e1'}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time-based Analytics */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time-based Analytics</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Peak Order Day</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {data.timeAnalytics?.peakDay?.name || 'No data'}
                  {data.timeAnalytics?.peakDay?.orders && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({data.timeAnalytics.peakDay.orders} orders)
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Peak Order Time</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {data.timeAnalytics?.peakHour?.name || 'No data'}
                  {data.timeAnalytics?.peakHour?.orders && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({data.timeAnalytics.peakHour.orders} orders)
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.timeAnalytics?.hourlyOrders || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    interval={2}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="orders" 
                    fill="#4F772D" 
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-center text-gray-600 mt-2">Orders by Hour of Day</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Average Processing Time</h4>
              <p className="text-lg font-semibold text-gray-900">
                {data.timeAnalytics?.avgProcessingTime || 0} hours
              </p>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="col-span-2 bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.topSellingProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">R{product.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
