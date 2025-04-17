import { getUserFromToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Protected data", user });
}
