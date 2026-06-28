import { NextResponse } from 'next/server';
import { OrderRepository } from '@/repositories/order.repository';
import { Prisma } from '@prisma/client';

const orderRepository = new OrderRepository();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      OR: search ? [
        { id: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ] : undefined
    };

    const [orders, total] = await orderRepository.findAll({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      data: (orders as any[]).map(order => ({
        id: order.id,
        userEmail: order.user?.email,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.payment?.status,
        createdAt: order.createdAt,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
