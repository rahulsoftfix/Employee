import { NextResponse } from "next/server";

export async function middleware(request) {
  // CHECKING AUTH TOKEN FROM COOKIES
  const token = request.cookies.get("qbc-auth-empolye")?.value;

  // CONDITIONAL REDIRECTION
  if (token) {
  } else if (request.nextUrl.pathname != "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

async function getData(url = "", token = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}
