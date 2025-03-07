import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get user role from token
    const userRole = req.nextauth.token?.role;

    // Check if route starts with /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        // If not admin, redirect to home page
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token // Require authentication for all routes
    }
  }
);

// Protect all routes that require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /auth (auth pages)
     * - / (home page)
     * - /about
     * - /products (public product listing)
     * - /contact
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth|about|products|contact|$).*)"
  ]
};
