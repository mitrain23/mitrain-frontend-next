import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  /** FIX: ini token nya di encode di BE jadi ya gw gk bisa verify 
           di middleware apakah token nya valid atau nggak
           karena jwtSecret nya ada di BE
  **/

  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const guestUrl = ["/login", "/loginMitra", "/register", "/registerMitra"];

  const authUrl = ["/chat", "/create", "/iklan", "/profile", "/update"];

  // Jika guest (belom login)
  for (const url of guestUrl) {
    if (pathname.startsWith(url)) {
      if (!token) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/results", req.url));
    }
  }

  for (const url of authUrl) {
    if (pathname.startsWith(url)) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/loginMitra",
    "/registerMitra",
    "/register",

    "/results",
    "/chat/:path*",
    "/create",
    "/iklan/:path*",
    "/profile/:path*",
    "/update/:path*",
  ],
};
