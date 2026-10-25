// Probe: does z-ai-web-dev-sdk support streaming chat completions?
import ZAI from 'z-ai-web-dev-sdk';

async function main() {
  const zai = await ZAI.create();
  const started = Date.now();
  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: 'You are a helpful math tutor. Reply in one short sentence.' },
        { role: 'user', content: 'What is 7 x 8?' },
      ],
      stream: true,
      thinking: { type: 'disabled' },
    } as never);

    let chunks = 0;
    let text = '';
    // Try async-iterator protocol
    for await (const part of completion as unknown as AsyncIterable<Record<string, unknown>>) {
      chunks++;
      const choices = (part as { choices?: Array<{ delta?: { content?: string } }> }).choices;
      const delta = choices?.[0]?.delta?.content ?? '';
      text += delta;
      if (chunks <= 3) console.log('chunk', chunks, JSON.stringify(part).slice(0, 160));
    }
    console.log('STREAM_OK chunks=', chunks, 'text=', JSON.stringify(text), 'ms=', Date.now() - started);
  } catch (err) {
    console.log('STREAM_FAIL:', (err as Error).message);
    // Fallback probe: non-stream
    try {
      const c2 = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'You are a helpful tutor.' },
          { role: 'user', content: 'Say OK.' },
        ],
        thinking: { type: 'disabled' },
      });
      console.log('NONSTREAM_OK:', JSON.stringify(c2.choices?.[0]?.message?.content));
    } catch (e2) {
      console.log('NONSTREAM_FAIL:', (e2 as Error).message);
    }
  }
}
main();
