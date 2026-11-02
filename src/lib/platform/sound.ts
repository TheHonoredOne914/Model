// Notebook sounds — everything synthesized with the Web Audio API, zero assets.
// The flip is a paper page-turn: a short filtered noise burst + a soft paper
// slap. The tab slide is a lighter flick. Respects the settings toggle.

let ctx: AudioContext | null = null;
let enabled = true;

try {
  if (typeof window !== "undefined") {
    enabled = localStorage.getItem("vs.settings.sound") !== "off";
  }
} catch { /* private mode */ }

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try { localStorage.setItem("vs.settings.sound", on ? "on" : "off"); } catch { /* ignore */ }
}

export function soundEnabled(): boolean {
  return enabled;
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(c: AudioContext, seconds: number): AudioBuffer {
  const len = Math.max(1, Math.floor(c.sampleRate * seconds));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** A paper page-turn: filtered noise sweep + faint slap at the end. */
export function playPageFlip() {
  if (!enabled) return;
  const c = audio(); if (!c) return;
  const t = c.currentTime;

  // main paper whoosh — band-passed noise sweeping down, like a page arc
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.32);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(2600, t);
  bp.frequency.exponentialRampToValueAtTime(700, t + 0.26);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.28, t + 0.045);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  src.connect(bp); bp.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + 0.32);

  // paper slap — the page landing on the desk
  const slap = c.createBufferSource();
  slap.buffer = noiseBuffer(c, 0.06);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = 1400;
  const g2 = c.createGain();
  g2.gain.setValueAtTime(0.0001, t + 0.19);
  g2.gain.exponentialRampToValueAtTime(0.16, t + 0.21);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.27);
  slap.connect(lp); lp.connect(g2); g2.connect(c.destination);
  slap.start(t + 0.19); slap.stop(t + 0.28);
}

/** Light flick for smaller interactions (hover-weight tabs, chips). */
export function playFlick() {
  if (!enabled) return;
  const c = audio(); if (!c) return;
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.09);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass"; bp.Q.value = 1.4; bp.frequency.value = 2100;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.1, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  src.connect(bp); bp.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + 0.1);
}

/** Tiny success chime for XP / correct answers (marimba-ish, two notes). */
export function playChime() {
  if (!enabled) return;
  const c = audio(); if (!c) return;
  const t = c.currentTime;
  const notes = [880, 1318.5]; // A5 → E6
  notes.forEach((f, i) => {
    const o = c.createOscillator();
    o.type = "sine"; o.frequency.value = f;
    const g = c.createGain();
    const t0 = t + i * 0.09;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + 0.34);
  });
}
