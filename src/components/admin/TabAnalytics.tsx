import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const productPerformance = [
  { name: 'Organic Fertilizer', sales: 240 },
  { name: 'Garden Soil Mix', sales: 300 },
  { name: 'Plant Growth Booster', sales: 180 },
  { name: 'Potting Mix', sales: 220 },
  { name: 'Soil Enhancer', sales: 280 },
];

export default function TabAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Sales Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4F772D" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#90A955" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Average Order Value', value: '$85.50' },
          { label: 'Conversion Rate', value: '3.2%' },
          { label: 'Customer Retention', value: '75%' },
          { label: 'Growth Rate', value: '+15%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
