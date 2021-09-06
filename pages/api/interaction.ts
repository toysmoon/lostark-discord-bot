import type { NextApiRequest, NextApiResponse } from 'next';

export default function handleInteraction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  res.status(200).json({ name: 'John Doe' });
}
