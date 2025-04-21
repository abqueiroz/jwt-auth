import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/login", "/register"];
  console.log('THE AUTHTOJKEN IS:',authToken)

  if (publicRoutes.includes(pathname)) {
    if (authToken) {   
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next()
  }

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next()

}
export const config = {
  matcher: [
    // Inclui todas as rotas...
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}