import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return errorResponse('Missing search query', 400);
  }

  try {
    const [users, products, categories, orders] = await Promise.all([
      // Search Users
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
          isDeleted: false,
        },
        take: 5,
        select: { id: true, name: true, email: true },
      }),
      // Search Products
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          isDeleted: false,
        },
        take: 5,
        select: { id: true, name: true, price: true },
      }),
      // Search Categories
      prisma.category.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          isDeleted: false,
        },
        take: 5,
        select: { id: true, name: true },
      }),
      // Search Orders
      prisma.order.findMany({
        where: {
          id: { equals: query }, // Simple exact ID match for orders, or could search by user email if joined
        },
        take: 5,
        select: { id: true, status: true, totalAmount: true },
      }),
    ]);

    return successResponse({
      users,
      products,
      categories,
      orders,
    });
  } catch (error: any) {
    return errorResponse(error.message, 500, error);
  }
}
