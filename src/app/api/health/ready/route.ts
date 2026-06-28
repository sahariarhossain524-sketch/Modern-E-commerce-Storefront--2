import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    await redis.ping();
    return NextResponse.json({ status: 'ready', timestamp: new Date().toISOString() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'not_ready', error: 'Dependencies unavailable' }, { status: 503 });
  }
}
