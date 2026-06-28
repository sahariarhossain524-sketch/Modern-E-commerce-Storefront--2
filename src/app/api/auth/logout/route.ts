import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { cookies } from 'next/headers';

const authService = new AuthService();

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    cookieStore.delete('refresh_token');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
