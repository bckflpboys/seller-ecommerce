import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const handler = withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth.token?.role;

    // Admin-only protection
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
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
        
        // Define routes that MUST have a session
        const protectedRoutes = [
          "/admin", 
          "/cart", 
          "/checkout", 
          "/orders", 
          "/profile", 
          "/api/admin", 
          "/api/orders", 
          "/api/upload", 
          "/api/user", 
          "/api/users"
        ];
        
        // If it's a protected route, require a token
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
          return !!token;
        }
        
        // Allow public pages (Home, About, etc.) and assets
        return true;
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
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)).*)',
  ],
};
