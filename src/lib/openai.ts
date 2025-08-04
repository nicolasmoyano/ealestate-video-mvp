import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getGPTScript({ title, description, price, location }: any) {
  const prompt = `Write a friendly 30-second real estate voiceover script.\n
  Title: ${title}\nLocation: ${location}\nPrice: ${price}\nDetails: ${description}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  return completion.choices[0].message.content;
}