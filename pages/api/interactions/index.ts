import authorization from '@/bot/authorization';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handleInteraction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isValid = await authorization(req, res);
  if (!isValid) {
    return;
  }

  const type = req.body.type as number;
  if (type === 1) {
    res.status(200).json({ type: 2 });
  } else {
    res.status(200).json({
      type: 4,
      data: {
        tts: false,
        content: 'Congrats on sending your command!',
        embeds: [],
        allowed_mentions: { parse: [] },
      },
    });
  }
}
