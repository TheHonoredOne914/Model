// Probe 3: correct handling of boxed-string chunks + timing per chunk
import ZAI from 'z-ai-web-dev-sdk';

function chunkToString(part: unknown): string {
  if (typeof part === 'string') return part;
  if (part instanceof String) return part.toString();
  if (part && typeof part === 'object') {
    const anyPart = part as Record<string, unknown>;
    if (typeof anyPart.length === 'number' && typeof anyPart.toString === 'function') {
      const s = anyPart.toString();
      if (typeof s === 'string' && s.length > 0 && s !== '[object Object]') return s;
    }
    return JSON.stringify(part);
  }
  return String(part);
}

async function main() {
  const zai = await ZAI.create();
  const t0 = Date.now();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: 'You are a helpful tutor.' },
      { role: 'user', content: 'Explain acceleration in about 150 words with one example and one formula.' },
    ],
    stream: true,
    thinking: { type: 'disabled' },
  } as never);

  const dec = new TextDecoder();
  let raw = '';
  let n = 0;
  for await (const part of completion as unknown as AsyncIterable<unknown>) {
    n++;
    const s = part instanceof Uint8Array ? dec.decode(part, { stream: true }) : chunkToString(part);
    raw += s;
    if (n <= 6) console.log(`chunk#${n} t=${Date.now() - t0}ms len=${s.length} head=${JSON.stringify(s.slice(0, 80))}`);
  }
  console.log('CHUNKS=', n, 'RAW_LEN=', raw.length, 'TOTAL_MS=', Date.now() - t0);

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
    } catch { /* ignore */ }
  }
  console.log('PARSED_LEN=', text.length);
  console.log('PARSED_HEAD=', JSON.stringify(text.slice(0, 200)));
}
main();
