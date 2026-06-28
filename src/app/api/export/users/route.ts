import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        email: true,
        name: true,
        role: { select: { name: true } },
        isActive: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Generate CSV
    const header = ['ID', 'Email', 'Name', 'Role', 'Active', 'Verified', 'Created At'];
    const rows = users.map(u => [
      u.id,
      u.email,
      `"${u.name || ''}"`,
      u.role.name,
      u.isActive,
      u.isVerified,
      u.createdAt.toISOString()
    ]);

    const csvContent = [header.join(','), ...rows.map(r => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users_export.csv"',
      },
    });
  } catch (error: any) {
    logger.error('Failed to export users CSV', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
