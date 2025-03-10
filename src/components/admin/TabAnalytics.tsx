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
  mostFavoritedProducts: Array<{
    name: string;
    favoriteCount: number;
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
  stockAnalytics: {
    productStock: Array<{
      name: string;
      stock: number;
      price: number;
      expectedRevenue: number;
    }>;
    totalExpectedRevenue: number;
    lowStockProducts: Array<{
      name: string;
      stock: number;
      price: number;
    }>;
    averagePrice: number;
    totalProducts: number;
    totalStockItems: number;
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
    <div className="space-y-4 sm:space-y-6 md:space-y-8 p-2 sm:p-4 md:p-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Monthly Sales Chart */}
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Monthly Sales</h3>
          <div className="h-48 sm:h-64 md:h-80">
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
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Product Performance</h3>
          <div className="h-48 sm:h-64 md:h-80">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
            <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Order Status Distribution */}
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Order Status Distribution</h3>
          <div className="h-48 sm:h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.orderStatusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {data.orderStatusDistribution.map((entry) => (
                    <Cell 
                      key={entry.status} 
                      fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || '#cbd5e1'}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} Orders`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {value.toLowerCase()}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
            {data.orderStatusDistribution.map((status) => (
              <div 
                key={status.status}
                className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col min-w-0"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                    <div 
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: STATUS_COLORS[status.status as keyof typeof STATUS_COLORS] || '#cbd5e1'
                      }}
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-600 capitalize truncate">
                      {status.status.toLowerCase()}
                    </span>
                  </div>
                  <span 
                    className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ml-1 sm:ml-2 ${
                      status.status === 'delivered' 
                        ? 'bg-green-100 text-green-800'
                        : status.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {((status.count / data.orderStatusDistribution.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-1 sm:mt-2 truncate">
                  {status.count}
                </p>
                <div className="mt-auto pt-2 sm:pt-3 w-full bg-gray-100 rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${(status.count / data.orderStatusDistribution.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`,
                      backgroundColor: STATUS_COLORS[status.status as keyof typeof STATUS_COLORS] || '#cbd5e1'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time-based Analytics */}
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Time-based Analytics</h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Peak Order Day</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {data.timeAnalytics?.peakDay?.name || 'No data'}
                  {data.timeAnalytics?.peakDay?.orders && (
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">
                      ({data.timeAnalytics.peakDay.orders} orders)
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Peak Order Time</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {data.timeAnalytics?.peakHour?.name || 'No data'}
                  {data.timeAnalytics?.peakHour?.orders && (
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">
                      ({data.timeAnalytics.peakHour.orders} orders)
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="h-32 sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.timeAnalytics?.hourlyOrders || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    interval={2}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar 
                    dataKey="orders" 
                    fill="#4F772D" 
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs sm:text-sm text-center text-gray-600 mt-2">Orders by Hour of Day</p>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Average Processing Time</h4>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {data.timeAnalytics?.avgProcessingTime || 0} hours
              </p>
            </div>
          </div>
        </div>

        {/* Stock Analytics */}
        <div className="col-span-1 lg:col-span-2 bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Stock Analytics</h3>
          <div className="space-y-4 sm:space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-300 shadow-sm">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600">Total Products</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-4">
                  {data.stockAnalytics?.totalProducts || 0}
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-300 shadow-sm">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600">Total Stock Items</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-4">
                  {data.stockAnalytics?.totalStockItems || 0}
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-300 shadow-sm">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600">Average Price</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-4">
                  R{data.stockAnalytics?.averagePrice.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-300 shadow-sm">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600">Expected Revenue</h4>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-4">
                  R{data.stockAnalytics?.totalExpectedRevenue.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>

            {/* Stock Table */}
            <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Product</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Stock Level</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Price</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Expected Revenue</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.stockAnalytics?.productStock.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.name}</td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">{product.stock}</td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">R{product.price.toFixed(2)}</td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">R{product.expectedRevenue.toFixed(2)}</td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                              product.stock < 10 
                                ? 'bg-red-100 text-red-800' 
                                : product.stock < 20 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.stock < 10 
                                ? 'Low Stock' 
                                : product.stock < 20 
                                ? 'Medium Stock' 
                                : 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Low Stock Warning */}
            {data.stockAnalytics?.lowStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-xs sm:text-sm font-medium text-red-800 mb-1 sm:mb-2">Low Stock Alert</h4>
                <ul className="list-disc list-inside space-y-0.5 sm:space-y-1">
                  {data.stockAnalytics.lowStockProducts.map((product, index) => (
                    <li key={index} className="text-xs sm:text-sm text-red-600">
                      {product.name} - Only {product.stock} items remaining
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="col-span-1 lg:col-span-2 bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Top Selling Products</h3>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Product</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Quantity</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.topSellingProducts.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.name}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">{product.quantity}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">R{product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Most Favorited Products */}
        <div className="col-span-1 lg:col-span-2 bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Most Favorited Products</h3>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                {data.mostFavoritedProducts && data.mostFavoritedProducts.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Product</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Favorites</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.mostFavoritedProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.name}</td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">{product.favoriteCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No favorited products yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
