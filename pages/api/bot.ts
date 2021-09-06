import startBot from '@/bot/discord/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleBot(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await startBot();
  res.status(200);
}
