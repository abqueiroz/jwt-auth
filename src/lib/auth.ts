import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
//import { redirect } from "next/navigation";

export const SECRET_JWT = "!((@T3sT-#)-!!";
export const MAX_COOKIES_DAYS = 3;

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export function signinToken(payload: TokenPayload, opt: jwt.SignOptions = {}) {
  return jwt.sign(payload, SECRET_JWT, opt);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_JWT) as TokenPayload;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const userCookies = await cookies();

  userCookies.set("authToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * MAX_COOKIES_DAYS,
  });
}

export async function getAuthToken() {
  return (await cookies()).get("authToken")?.value;
}

export async function destroyAuthCookie() {
  return (await cookies()).delete("authToken");
}

export async function getUserFromToken() {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }
  const decode = verifyToken(token);

  if (!decode || !decode.userId) {
    return null;
  }

  return decode;
}

// export const protectedRoute = async () => {
//   const user = await getUserFromToken();
//   if (!user) {
//     redirect("/login");
//   }
//   return user; 
// };
