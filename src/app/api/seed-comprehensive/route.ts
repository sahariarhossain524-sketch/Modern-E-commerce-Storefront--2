import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/bcrypt';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: Request) {
  // Protect this route with a simple query param secret in production, or disable it
  if (process.env.NODE_ENV === 'production') {
    return errorResponse('Seeding not allowed in production', 403);
  }

  try {
    // 1. Roles & Permissions
    const adminRole = await prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin', description: 'System Administrator' },
    });
    
    const managerRole = await prisma.role.upsert({
      where: { name: 'Manager' },
      update: {},
      create: { name: 'Manager', description: 'System Manager' },
    });

    const userRole = await prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: { name: 'User', description: 'Standard User' },
    });

    // 2. Admin User
    const hashedPassword = await hashPassword('NexaAdminPass123!');
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@novaflow.com' },
      update: {},
      create: {
        email: 'admin@novaflow.com',
        name: 'Admin User',
        passwordHash: hashedPassword,
        roleId: adminRole.id,
        isVerified: true,
        isActive: true,
      },
    });

    // 3. Demo Categories
    const categories = ['Electronics', 'Software', 'Services', 'Hardware'];
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { name: cat },
        update: {},
        create: {
          name: cat,
          slug: cat.toLowerCase(),
          description: `Category for ${cat}`,
        },
      });
    }

    const electronicsCat = await prisma.category.findUnique({ where: { name: 'Electronics' }});
    
    // 4. Demo Products
    if (electronicsCat) {
      await prisma.product.upsert({
        where: { slug: 'enterprise-laptop' },
        update: {},
        create: {
          name: 'Enterprise Laptop',
          slug: 'enterprise-laptop',
          description: 'High-performance laptop for developers.',
          price: 1999.99,
          inventory: 50,
          categoryId: electronicsCat.id,
          status: 'ACTIVE',
          tags: ['laptop', 'hardware', 'enterprise'],
        }
      });
    }

    return successResponse({ message: 'Comprehensive seed complete.' });
  } catch (error: any) {
    return errorResponse(error.message, 500, error);
  }
}
