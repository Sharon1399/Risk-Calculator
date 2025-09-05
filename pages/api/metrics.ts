import { NextResponse } from "next/server";
import register from  "../../lib/metrics";

export default async function GET() {
  return new NextResponse(await register.metrics(), {
    status: 200,
    headers: { "Content-Type": register.contentType },
  });
}
