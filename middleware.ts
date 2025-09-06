import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const method = req.method;

  // Skip metrics endpoint itself, to avoid infinite loops
  if (url.startsWith("/api/metrics")) {
    return NextResponse.next();
  }

  // Puedes agregar aquí cualquier lógica compatible con Edge Runtime,
  // pero NO puedes usar prom-client ni APIs de Node.js.

  const res = NextResponse.next();

  // Ejemplo: agregar headers personalizados
  res.headers.set("x-metrics-timestamp", Date.now().toString());
  res.headers.set("x-route", url);

  return res;
}
