import { NextRequest, NextResponse } from 'next/server';
import { redis } from './redis';
import { errorResponse } from './api-response';

const RATE_LIMIT_WINDOW = 60; // seconds
const MAX_REQUESTS = 100; // max requests per window

export async function withRateLimit(
  req: NextRequest,
  handler: () => Promise<NextResponse>
) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const key = `rate-limit:${ip}`;

  try {
    const currentRequests = await redis.incr(key);

    if (currentRequests === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    if (currentRequests > MAX_REQUESTS) {
      return errorResponse('Too Many Requests', 429);
    }

    return handler();
  } catch (error) {
    // If Redis fails, we should probably allow the request to prevent total outage,
    // but log the error heavily.
    console.error('Rate Limiter Redis Error:', error);
    return handler();
  }
}
