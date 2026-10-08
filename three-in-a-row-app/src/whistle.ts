// The referee's whistle for an illegal move - synthesized with the
// WebAudio API, so no sound file is needed.

let ctx: AudioContext | null = null;

function audioCtx(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playWhistle(): void {
  try {
    const ac = audioCtx();
    const start = ac.currentTime;
    const duration = 0.55;

    const master = ac.createGain();
    master.gain.setValueAtTime(0.0001, start);
    master.gain.exponentialRampToValueAtTime(0.35, start + 0.03);
    master.gain.setValueAtTime(0.35, start + duration - 0.08);
    master.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    master.connect(ac.destination);

    // main tone with the typical warble of a referee whistle
    const osc = ac.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(2150, start);

    const lfo = ac.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(28, start);
    const lfoGain = ac.createGain();
    lfoGain.gain.setValueAtTime(160, start);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const oscGain = ac.createGain();
    oscGain.gain.setValueAtTime(0.5, start);
    osc.connect(oscGain);
    oscGain.connect(master);

    // a bit of overblow so it sounds breathy
    const harm = ac.createOscillator();
    harm.type = "sine";
    harm.frequency.setValueAtTime(3230, start);
    const harmGain = ac.createGain();
    harmGain.gain.setValueAtTime(0.25, start);
    harm.connect(harmGain);
    harmGain.connect(master);

    osc.start(start);
    lfo.start(start);
    harm.start(start);
    osc.stop(start + duration);
    lfo.stop(start + duration);
    harm.stop(start + duration);
  } catch {
    // no audio available - ignore
  }
}
