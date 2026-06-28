import { NextResponse } from 'next/server';
import { logger } from './logger';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, any>;
}

export function successResponse<T>(data: T, meta?: Record<string, any>, status = 200) {
  const response: ApiResponse<T> = { success: true, data, meta };
  return NextResponse.json(response, { status });
}

export function errorResponse(message: string, status = 400, errorObj?: any) {
  if (status >= 500) {
    logger.error(`API Error: ${message}`, { error: errorObj?.message || errorObj });
  } else {
    logger.warn(`API Warning: ${message}`, { error: errorObj?.message || errorObj });
  }
  
  const response: ApiResponse = { success: false, error: message };
  return NextResponse.json(response, { status });
}
