import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This is the core logic for Next.js 16 proxy
const handler = withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth.token?.role;

    // Admin authorization
    if (pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // List of routes that REQUIRE a login
        const protectedRoutes = [
          "/admin", 
          "/cart", 
          "/checkout", 
          "/profile",
          "/orders"
        ];
        
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
          return !!token;
        }
        
        return true; // Everything else (Home, About, Images) is PUBLIC
      }
    }
  }
);

export const proxy = handler;
export default handler;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - All common image/video extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)).*)',
  ],
};
