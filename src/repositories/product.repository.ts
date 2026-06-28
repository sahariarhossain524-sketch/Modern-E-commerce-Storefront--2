import { prisma } from '@/lib/prisma';
import { Product, Prisma } from '@prisma/client';

export class ProductRepository {
  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<[Product[], number]> {
    const { skip, take, where, orderBy } = params;
    
    return Promise.all([
      prisma.product.findMany({ skip, take, where, orderBy, include: { category: true } }),
      prisma.product.count({ where }),
    ]);
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    // Soft delete
    return prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
