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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
