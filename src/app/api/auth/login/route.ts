import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const authService = new AuthService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);

    const userAgent = req.headers.get('user-agent') || 'unknown';
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';

    const result = await authService.login(parsed, userAgent, ipAddress);

    // Set HTTP-only cookie for refresh token
    const cookieStore = await cookies();
    cookieStore.set('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({ 
      message: 'Login successful', 
      accessToken: result.accessToken,
      user: result.user 
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
