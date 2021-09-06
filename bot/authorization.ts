import type { NextApiRequest, NextApiResponse } from 'next';
import nacl from 'tweetnacl';

function handleAuthError(res: NextApiResponse) {
  res.status(401).end('invalid request signature');
  return false;
}

export default function authorization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PUBLIC_KEY =
    '829340a3245eeca9e59fb128e0756870df4c527c3662984da90b2e5e20ce9f45';

  console.log(req.headers);

  const signature = (req.headers['X-Signature-Ed25519'] as string) ?? '';
  const timestamp = (req.headers['X-Signature-Timestamp'] as string) ?? '';
  const body = req.body ?? '';

  try {
    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );

    if (!isVerified) {
      return handleAuthError(res);
    }
  } catch (e) {
    return handleAuthError(res);
  }

  return true;
}
