import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbConnect();

    // Calculate current and previous month metrics
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Get total products
    const totalProducts = await Product.countDocuments();
    const prevMonthProducts = await Product.countDocuments({
      createdAt: { $gte: firstDayOfPrevMonth, $lt: firstDayOfMonth }
    });

    // Get orders metrics
    const [orderMetrics] = await Order.aggregate([
      {
        $facet: {
          currentMonth: [
            { $match: { createdAt: { $gte: firstDayOfMonth } } },
            { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } }
          ],
          prevMonth: [
            { $match: { createdAt: { $gte: firstDayOfPrevMonth, $lt: firstDayOfMonth } } },
            { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } }
          ],
          total: [
            { $group: { _id: null, count: { $sum: 1 } } }
          ],
          avgOrderValue: [
            { $group: { _id: null, avg: { $avg: "$total" } } }
          ]
        }
      }
    ]);

    const currentMonthOrders = orderMetrics.currentMonth[0]?.count || 0;
    const prevMonthOrders = orderMetrics.prevMonth[0]?.count || 0;
    const currentMonthRevenue = orderMetrics.currentMonth[0]?.total || 0;
    const prevMonthRevenue = orderMetrics.prevMonth[0]?.total || 0;
    const totalOrders = orderMetrics.total[0]?.count || 0;
    const avgOrderValue = orderMetrics.avgOrderValue[0]?.avg || 0;

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return 0;
      return ((current - previous) / previous) * 100;
    };

    const changes = {
      products: calculateChange(totalProducts, prevMonthProducts),
      orders: calculateChange(currentMonthOrders, prevMonthOrders),
      revenue: calculateChange(currentMonthRevenue, prevMonthRevenue)
    };

    // Get total customers (users with role 'user')
    const [userMetrics] = await User.aggregate([
      {
        $match: { role: 'user' }
      },
      {
        $facet: {
          currentMonth: [
            { $match: { createdAt: { $gte: firstDayOfMonth } } },
            { $count: 'count' }
          ],
          prevMonth: [
            { $match: { createdAt: { $gte: firstDayOfPrevMonth, $lt: firstDayOfMonth } } },
            { $count: 'count' }
          ],
          total: [{ $count: 'count' }]
        }
      }
    ]);

    const totalCustomers = userMetrics.total[0]?.count || 0;
    const currentMonthCustomers = userMetrics.currentMonth[0]?.count || 0;
    const prevMonthCustomers = userMetrics.prevMonth[0]?.count || 0;

    const customerChanges = {
      customers: calculateChange(currentMonthCustomers, prevMonthCustomers)
    };

    // Get monthly sales data (last 6 months)
    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          sales: { $sum: "$total" }
        }
      },
      {
        $project: {
          _id: 0,
          name: {
            $let: {
              vars: {
                monthsInString: [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]
              },
              in: {
                $arrayElemAt: ["$$monthsInString", { $subtract: ["$_id.month", 1] }]
              }
            }
          },
          sales: 1
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Get product performance data
    const productPerformance = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          sales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          sales: 1
        }
      },
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]);

    const keyMetrics = [
      { label: 'Average Order Value', value: `R${avgOrderValue.toFixed(2)}` },
      { label: 'Conversion Rate', value: `${((currentMonthOrders / totalOrders) * 100).toFixed(1)}%` },
      { label: 'Customer Retention', value: '75%' },
      { label: 'Growth Rate', value: `${((currentMonthOrders / prevMonthOrders - 1) * 100).toFixed(1)}%` }
    ];

    // Get order status distribution
    const orderStatusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get top selling products (by quantity)
    const topSellingProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      },
      {
        $project: {
          name: "$_id",
          quantity: "$totalQuantity",
          revenue: "$totalRevenue",
          _id: 0
        }
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 }
    ]);

    // Get time-based analytics
    const timeBasedStats = await Order.aggregate([
      {
        $group: {
          _id: {
            hour: { $hour: "$createdAt" },
            dayOfWeek: { $dayOfWeek: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Process time-based data
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Initialize arrays for each type of analysis
    const ordersByDay = Array(7).fill(0);
    const ordersByHour = Array(24).fill(0);

    // Fill in the data
    timeBasedStats.forEach(stat => {
      const hour = stat._id.hour;
      const dayIndex = stat._id.dayOfWeek - 1; // MongoDB dayOfWeek is 1-7
      
      if (hour !== undefined) {
        ordersByHour[hour] += stat.count;
      }
      if (dayIndex !== undefined) {
        ordersByDay[dayIndex] += stat.count;
      }
    });

    // Format the data for charts
    const hourlyData = ordersByHour.map((count, hour) => ({
      name: `${hour}:00`,
      orders: count
    }));

    const dailyData = ordersByDay.map((count, index) => ({
      name: daysOfWeek[index],
      orders: count
    }));

    // Calculate average processing time
    const [processingTimes] = await Order.aggregate([
      {
        $match: {
          status: "delivered"
        }
      },
      {
        $group: {
          _id: null,
          avgProcessingTime: {
            $avg: {
              $divide: [
                { $subtract: ["$updatedAt", "$createdAt"] },
                1000 * 60 * 60 // Convert to hours
              ]
            }
          }
        }
      }
    ]);

    const timeAnalytics = {
      hourlyOrders: hourlyData,
      dailyOrders: dailyData,
      peakDay: dailyData.reduce((max, day) => day.orders > max.orders ? day : max, dailyData[0]),
      peakHour: hourlyData.reduce((max, hour) => hour.orders > max.orders ? hour : max, hourlyData[0]),
      avgProcessingTime: processingTimes?.avgProcessingTime?.toFixed(1) || 0
    };

    // Get product stock information
    const productStock = await Product.aggregate([
      {
        $project: {
          name: 1,
          stock: { $ifNull: ["$stock", 0] }, // Handle cases where stock might be null
          price: 1,
          expectedRevenue: { 
            $multiply: [
              { $ifNull: ["$stock", 0] }, 
              "$price"
            ] 
          }
        }
      },
      {
        $sort: { stock: 1 } // Sort by stock ascending to show low stock first
      }
    ]);

    // Calculate total expected revenue and handle potential null values
    const totalExpectedRevenue = productStock.reduce((sum, product) => 
      sum + (product.expectedRevenue || 0), 0
    );

    // Get products with low stock (less than 10 items)
    const lowStockProducts = productStock.filter(product => 
      (product.stock || 0) < 10
    );

    // Calculate average price (excluding products with 0 or null price)
    const validPrices = productStock.filter(product => product.price > 0);
    const averagePrice = validPrices.length > 0
      ? validPrices.reduce((sum, product) => sum + product.price, 0) / validPrices.length
      : 0;

    const stockAnalytics = {
      productStock: productStock.map(product => ({
        name: product.name,
        stock: product.stock || 0,
        price: product.price || 0,
        expectedRevenue: product.expectedRevenue || 0
      })),
      totalExpectedRevenue,
      lowStockProducts: lowStockProducts.map(product => ({
        name: product.name,
        stock: product.stock || 0,
        price: product.price || 0
      })),
      averagePrice,
      totalProducts: productStock.length,
      totalStockItems: productStock.reduce((sum, product) => sum + (product.stock || 0), 0)
    };

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: currentMonthRevenue,
      changes,
      customerChanges,
      salesData: monthlySales,
      productPerformance,
      keyMetrics,
      orderStatusDistribution,
      topSellingProducts,
      timeAnalytics,
      stockAnalytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
}
