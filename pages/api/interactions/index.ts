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

  const type = req.body.type as number;
  if (type === 1) {
    res.status(200).json({ type: 2 });
  } else {
    res.status(200).json({ name: 'test' });
  }
}
