import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { getServerSession } from "./lib/auth-server";

export async function middleware(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    sessionCookie
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const publicRoutes = ["/", "/login", "/register"];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isPublicRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
