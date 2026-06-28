import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Inject request ID for observability
    const requestId = crypto.randomUUID();
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-request-id', requestId);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set('x-request-id', requestId);
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth endpoints)
     * - api/seed (Seed endpoints)
     * - login (auth pages)
     * - register (auth pages)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|api/seed|login|register|_next/static|_next/image|favicon.ico).*)',
  ],
};
