import type { NextResponse } from "next/server";
import register from "../../lib/metrics";

export default async function GET() {
  return new Response(await register.metrics(), {
    status: 200,
    headers: { "Content-Type": register.contentType },
  });
}