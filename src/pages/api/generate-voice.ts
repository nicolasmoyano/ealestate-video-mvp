import type { NextApiRequest, NextApiResponse } from 'next';
import { getVoiceMp3Buffer } from '@/lib/elevenlabs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { script } = req.body;
  const buffer = await getVoiceMp3Buffer(script);

  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(buffer);
}