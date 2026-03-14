import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const userRole = req.nextauth.token?.role;

    // Additional check for admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
    "/api/admin/:path*",
    "/api/orders/:path*",
    "/api/upload",
    "/api/user/:path*",
    "/api/users/:path*"
  ]
};
