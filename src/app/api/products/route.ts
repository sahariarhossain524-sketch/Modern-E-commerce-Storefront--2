import { NextResponse } from 'next/server';
import { ProductRepository } from '@/repositories/product.repository';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

const productRepository = new ProductRepository();

const createProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string(),
  description: z.string(),
  price: z.number().min(0),
  inventory: z.number().min(0),
  categoryId: z.string(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']).optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isDeleted: false,
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ] : undefined
    };

    const [products, total] = await productRepository.findAll({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      data: products,
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createProductSchema.parse(body);

    const product = await productRepository.create({
      ...parsed,
      category: { connect: { id: parsed.categoryId } }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
