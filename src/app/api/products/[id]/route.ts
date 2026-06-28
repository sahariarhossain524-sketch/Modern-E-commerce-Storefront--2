import { NextResponse } from 'next/server';
import { ProductRepository } from '@/repositories/product.repository';
import { z } from 'zod';

const productRepository = new ProductRepository();

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  inventory: z.number().min(0).optional(),
  categoryId: z.string().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']).optional(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await productRepository.findById(id);
    if (!product || product.isDeleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateProductSchema.parse(body);

    const updateData: any = { ...parsed };
    if (parsed.categoryId) {
      updateData.category = { connect: { id: parsed.categoryId } };
      delete updateData.categoryId;
    }

    const product = await productRepository.update(id, updateData);
    return NextResponse.json(product);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productRepository.update(id, { isDeleted: true });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
