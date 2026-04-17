import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/calculator"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const accessCookie = request.cookies.get("s174_access");

    if (!accessCookie || accessCookie.value !== "active") {
      const targetUrl = new URL("/", request.url);
      targetUrl.searchParams.set("paywall", "1");
      return NextResponse.redirect(targetUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calculator/:path*"],
};
