import type { NextApiRequest, NextApiResponse } from 'next';
import register from "../../lib/metrics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", register.contentType);
  res.status(200).send(await register.metrics());
}
