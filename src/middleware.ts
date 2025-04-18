import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/login", "/register"];
  console.log('THE AUTHTOJKEN IS:',authToken)

  if (publicRoutes.includes(pathname)) {
    if (authToken && verifyToken(authToken)) {   
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next()
  }

  if (!authToken || !verifyToken(authToken)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}
