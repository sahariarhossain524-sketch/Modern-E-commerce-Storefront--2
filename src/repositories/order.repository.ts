import { prisma } from '@/lib/prisma';
import { Order, Prisma } from '@prisma/client';

export class OrderRepository {
  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<[Order[], number]> {
    const { skip, take, where, orderBy } = params;
    
    return Promise.all([
      prisma.order.findMany({ skip, take, where, orderBy, include: { user: true, items: true, payment: true } }),
      prisma.order.count({ where }),
    ]);
  }

  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } }, payment: true },
    });
  }

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({ data });
  }

  async updateStatus(id: string, status: any): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
