import client from "prom-client";

const register = new client.Registry();

// Ensure we only register metrics once (important for Next.js dev mode)
if (!(global as any).prometheusInitialized) {
  (global as any).prometheusInitialized = true;

  // Default system metrics
  client.collectDefaultMetrics({ register });

  // Request counter
  new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"],
    registers: [register], // <-- important: attach to your Registry
  });

  // Request duration histogram
  new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.5, 1, 2, 5],
    registers: [register],
  });
}

// Export a single registry
export default register;
