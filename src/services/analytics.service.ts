import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export class AnalyticsService {
  /**
   * Calculate Monthly Active Users (MAU)
   */
  static async getMAU(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsersCount = await prisma.session.groupBy({
      by: ['userId'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: true,
    });

    return activeUsersCount.length;
  }

  /**
   * Calculate Daily Active Users (DAU)
   */
  static async getDAU(): Promise<number> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const activeUsersCount = await prisma.session.groupBy({
      by: ['userId'],
      where: {
        createdAt: {
          gte: oneDayAgo,
        },
      },
      _count: true,
    });

    return activeUsersCount.length;
  }

  /**
   * Calculate Average Revenue Per User (ARPU)
   */
  static async getARPU(): Promise<number> {
    const [totalRevenueResult, totalUsers] = await Promise.all([
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: 'DELIVERED' }, // Simplified: using delivered orders as revenue
      }),
      prisma.user.count({ where: { isDeleted: false } }),
    ]);

    const totalRevenue = Number(totalRevenueResult._sum.totalAmount || 0);
    if (totalUsers === 0) return 0;

    return Number((totalRevenue / totalUsers).toFixed(2));
  }

  /**
   * Generate data for UI charts (Revenue over the last 6 months)
   */
  static async getRevenueChartData() {
    // In a real database with large volumes, this should be done via a raw SQL query with grouping.
    // For Prisma and Prisma-supported platforms without complex date-math natively, we do it in code.
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
        status: { in: ['SHIPPED', 'DELIVERED'] }
      },
      select: { createdAt: true, totalAmount: true }
    });

    // Group by month
    const grouped = orders.reduce((acc, order) => {
      const month = order.createdAt.toLocaleString('default', { month: 'short' });
      if (!acc[month]) acc[month] = 0;
      acc[month] += Number(order.totalAmount);
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(month => ({
      name: month,
      revenue: grouped[month]
    }));
  }

  /**
   * Get all analytics summary
   */
  static async getSummary() {
    try {
      const [mau, dau, arpu, chartData] = await Promise.all([
        this.getMAU(),
        this.getDAU(),
        this.getARPU(),
        this.getRevenueChartData()
      ]);

      return { mau, dau, arpu, chartData };
    } catch (error) {
      logger.error('Failed to get analytics summary', error);
      throw error;
    }
  }
}
