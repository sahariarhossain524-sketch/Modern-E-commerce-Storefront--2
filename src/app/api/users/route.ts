import { NextResponse } from 'next/server';
import { UserRepository } from '@/repositories/user.repository';
import { z } from 'zod';

const userRepository = new UserRepository();

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  roleId: z.string(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Using prisma directly here for search/pagination ease, though ideally in repository
    const { prisma } = await import('@/lib/prisma');
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        },
        include: { role: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        },
      })
    ]);

    return NextResponse.json({
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        isActive: user.isActive,
        createdAt: user.createdAt,
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createUserSchema.parse(body);

    const { hashPassword } = await import('@/lib/bcrypt');
    const hashedPassword = await hashPassword(parsed.password);

    const user = await userRepository.create({
      name: parsed.name,
      email: parsed.email,
      passwordHash: hashedPassword,
      role: { connect: { id: parsed.roleId } }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
