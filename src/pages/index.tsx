import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: ''
  });
  const [script, setScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setScript(data.script);

    const voiceRes = await fetch('/api/generate-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: data.script })
    });
    const blob = await voiceRes.blob();
    setAudioUrl(URL.createObjectURL(blob));
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Real Estate Video Generator</h1>
      <input className="border p-2 m-1" name="title" placeholder="Title" onChange={handleChange} />
      <input className="border p-2 m-1" name="location" placeholder="Location" onChange={handleChange} />
      <input className="border p-2 m-1" name="price" placeholder="Price" onChange={handleChange} />
      <textarea className="border p-2 m-1" name="description" placeholder="Description" onChange={handleChange} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 m-1">Generate</button>
      {script && <p className="mt-4"><strong>Script:</strong> {script}</p>}
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </main>
  );
}