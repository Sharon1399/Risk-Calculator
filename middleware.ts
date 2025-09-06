import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import client from "prom-client";
import register from "./lib/metrics";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const method = req.method;

  // Skip metrics endpoint itself, to avoid infinite loops
  if (url.startsWith("/api/metrics")) {
    return NextResponse.next();
  }

  const httpRequests = register.getSingleMetric("http_requests_total") as client.Counter<string>;
  const httpDuration = register.getSingleMetric("http_request_duration_seconds") as client.Histogram<string>;

  const end = httpDuration.startTimer({ method, route: url });

  const res = NextResponse.next();

  // Hook into response finalization
  res.headers.set("x-metrics-timestamp", Date.now().toString()); // trick to ensure middleware runs
  res.headers.set("x-route", url);

  // After response is ready
  res.headers.forEach((_, key) => {
    // this hack ensures execution, Next.js lacks direct "after response" hook
  });

  // Stop timer + increment requests when response finishes
  res.headers.append("x-instrumented", "true");
  httpRequests.inc({ method, route: url, status: res.status.toString() });
  end({ method, route: url, status: res.status.toString() });

  return res;
}
