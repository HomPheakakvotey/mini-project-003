import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, password } = body;

  console.log("body: ", body);
  console.log("email: ", email);

  const respone = await fetch(`${process.env.DJANGO_API_URL}/api/user/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: password }),
  });

  if (!respone.ok) {
    return NextResponse.json(
      {
        message: "faild to login",
      },
      {
        status: respone.status,
      }
    );
  }

  const data = await respone.json();
  console.log("data from login:", data);
  const refreshToken = data?.refresh_token || null;
  const accessToken = data?.access_token || null;
  const user = data?.user || null;

  const cookieName = process.env?.COOKIE_REFRESH_TOKEN_NAME || "refresh_token";
  const serialized = serialize(cookieName, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json(
    {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    {
      status: respone.status,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
