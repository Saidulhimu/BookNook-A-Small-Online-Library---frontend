import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

// Exchanges a valid BetterAuth session for a JWT that the Express API verifies.
// The token is only issued after the session cookie is verified server-side.
export async function POST(request: NextRequest) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, message: "Server is not configured" }, { status: 500 });
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  const { id, email, name, image } = session.user;
  const token = jwt.sign({ id, email, name: name || "" }, secret, { expiresIn: "7d" });

  return NextResponse.json({
    success: true,
    token,
    user: { id, email, name: name || "Library Member", image: image || undefined },
  });
}
