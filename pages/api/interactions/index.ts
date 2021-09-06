import authorization from '@/bot/authorization';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handleInteraction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isValid = authorization(req, res);
  if (!isValid) {
    return;
  }

  res.status(200).json({ type: 1 });
}
