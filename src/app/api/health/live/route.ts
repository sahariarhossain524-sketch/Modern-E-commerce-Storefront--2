import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ status: 'live', timestamp: new Date().toISOString() }, { status: 200 });
}
