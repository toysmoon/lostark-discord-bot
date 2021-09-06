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

  console.log(req);
  res.status(200).json({ name: 'John Doe' });
}
