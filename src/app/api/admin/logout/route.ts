import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/core/services/admin-auth-service";

export function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
