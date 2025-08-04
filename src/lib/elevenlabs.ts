import axios from 'axios';

export async function getVoiceMp3Buffer(script: string) {
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  const res = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text: script },
    {
      headers: {
        'xi-api-key': apiKey!,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    }
  );

  return res.data;
}