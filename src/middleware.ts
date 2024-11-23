import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer")
  const host = request.headers.get("host")

  if (referer && host) {
    const refererHost = new URL(referer).host
    if (refererHost === host) {
      return NextResponse.next()
    }
  }

  // Se o referer não corresponder ao host, bloqueia a requisição
  return new NextResponse(JSON.stringify({ success: false, message: "Origin not allowed" }), {
    status: 403,
    headers: { "content-type": "application/json" },
  })
}

export const config = {
  matcher: "/api/:path*",
}
