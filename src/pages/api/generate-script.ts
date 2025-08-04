import { NextApiRequest, NextApiResponse } from 'next';
import { getGPTScript } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, price, location } = req.body;
  const script = await getGPTScript({ title, description, price, location });
  res.status(200).json({ script });
}