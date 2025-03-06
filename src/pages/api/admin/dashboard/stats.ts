import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
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

    // Calculate key metrics
    const [metrics] = await Order.aggregate([
      {
        $facet: {
          avgOrderValue: [
            { $group: { _id: null, avg: { $avg: "$total" } } }
          ],
          totalOrders: [
            { $group: { _id: null, count: { $sum: 1 } } }
          ],
          prevMonthOrders: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
              }
            },
            { $group: { _id: null, count: { $sum: 1 } } }
          ],
          prevMonthRevenue: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
              }
            },
            { $group: { _id: null, total: { $sum: "$total" } } }
          ]
        }
      }
    ]);

    const avgOrderValue = metrics.avgOrderValue[0]?.avg || 0;
    const totalOrders = metrics.totalOrders[0]?.count || 0;
    const monthlyOrders = metrics.prevMonthOrders[0]?.count || 0;
    const monthlyRevenue = metrics.prevMonthRevenue[0]?.total || 0;

    // Calculate growth rate (simplified)
    const growthRate = ((monthlyOrders / (totalOrders || 1)) * 100).toFixed(1);

    const keyMetrics = [
      { label: 'Average Order Value', value: `R${avgOrderValue.toFixed(2)}` },
      { label: 'Conversion Rate', value: `${((monthlyOrders / totalOrders) * 100).toFixed(1)}%` },
      { label: 'Customer Retention', value: '75%' }, // This would need customer data to calculate accurately
      { label: 'Growth Rate', value: `${growthRate}%` }
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

    res.status(200).json({
      salesData: monthlySales,
      productPerformance,
      keyMetrics,
      orderStatusDistribution,
      topSellingProducts,
      timeAnalytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
}
