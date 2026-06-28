import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/bcrypt';

export async function GET() {
  try {
    const adminRole = await prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin', description: 'System Administrator' },
    });

    await prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: { name: 'User', description: 'Standard User' },
    });

    const hashedPassword = await hashPassword('NexaAdminPass123!');
    
    await prisma.user.upsert({
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

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
