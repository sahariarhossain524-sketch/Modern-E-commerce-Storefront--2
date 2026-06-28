import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      redis: 'unknown',
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'up';
  } catch (error) {
    health.services.database = 'down';
    health.status = 'error';
  }

  try {
    await redis.ping();
    health.services.redis = 'up';
  } catch (error) {
    health.services.redis = 'down';
    health.status = 'error';
  }

  return NextResponse.json(health, { status: health.status === 'ok' ? 200 : 503 });
}
