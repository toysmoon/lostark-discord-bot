import type { NextApiRequest, NextApiResponse } from 'next';
import verifyKeyMiddleware from 'utils/verifyKeyMiddleware';

const PUBLIC_KEY =
  '829340a3245eeca9e59fb128e0756870df4c527c3662984da90b2e5e20ce9f45';

const verify = verifyKeyMiddleware(PUBLIC_KEY);

export default async function authorization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return verify(req, res);
}
