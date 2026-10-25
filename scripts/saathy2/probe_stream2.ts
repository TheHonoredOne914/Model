// Probe 2: parse the raw SSE string chunks from z-ai SDK stream mode
import ZAI from 'z-ai-web-dev-sdk';

async function main() {
  const zai = await ZAI.create();
  const started = Date.now();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: 'You are a helpful tutor. Reply with exactly two short sentences.' },
      { role: 'user', content: 'Explain what acceleration is.' },
    ],
    stream: true,
    thinking: { type: 'disabled' },
  } as never);

  let raw = '';
  for await (const part of completion as unknown as AsyncIterable<string>) {
    raw += typeof part === 'string' ? part : JSON.stringify(part);
  }
  console.log('RAW_LEN=', raw.length, 'ms=', Date.now() - started);
  console.log('FIRST_400=', raw.slice(0, 400));
  console.log('LAST_300=', raw.slice(-300));

  // Parse SSE lines
  let text = '';
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t.startsWith('data:')) continue;
    const payload = t.slice(5).trim();
    if (payload === '[DONE]') continue;
    try {
      const j = JSON.parse(payload);
      const d = j?.choices?.[0]?.delta?.content;
      if (typeof d === 'string') text += d;
    } catch {
      /* partial json across chunk boundary handled since we join raw first */
    }
  }
  console.log('PARSED_TEXT=', JSON.stringify(text));
  console.log('TOTAL_MS=', Date.now() - started);
}
main();
