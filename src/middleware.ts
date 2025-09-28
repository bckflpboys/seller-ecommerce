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
// This config specifies the routes that the middleware will run on.
export const config = {
  matcher: [
    // Page routes
    "/admin/:path*",
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
    // API routes
    "/api/admin/:path*",
    "/api/orders/:path*",
    "/api/upload",
    "/api/user/:path*",
    "/api/users/:path*"
  ]
};
