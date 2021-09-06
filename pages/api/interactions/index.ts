import authorization from '@/bot/authorization';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handleInteraction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = req.body.type as number;
  if (type === 1) {
    return res.status(200).json({ type: 1 });
  }

  const isValid = authorization(req, res);
  if (!isValid) {
    return;
  }

  res.status(200).json({ name: 'test' });
}
