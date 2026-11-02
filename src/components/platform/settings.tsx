"use client";

// Settings — profile, notebook sound toggle, data controls. Everything works:
// name changes reflect on the dashboard, sound toggle drives the flip audio.
import { useEffect, useState } from "react";
import { Eraser, Save, Volume2, VolumeX } from "lucide-react";
import { getProfile, saveProfile } from "@/lib/platform/store";
import { setSoundEnabled, soundEnabled, playFlick } from "@/lib/platform/sound";
import { getStreak, getXp } from "@/lib/saathy-progress";
import { useToast } from "@/hooks/use-toast";

export function SettingsScreen() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [klass, setKlass] = useState("");
  const [sound, setSound] = useState(true);
  // data summary reads localStorage → resolve after mount (hydration-safe)
  const [stats, setStats] = useState({ xp: 0, streak: 0 });

  useEffect(() => {
    const id = window.setTimeout(() => {
      const p = getProfile();
      setName(p.name); setKlass(p.klass);
      setSound(soundEnabled());
      setStats({ xp: getXp(), streak: getStreak() });
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">Settings</h1>
        <p className="text-sm text-[#637C96]">Tumhari notebook, tumhare rules.</p>
      </div>

      {/* profile */}
      <section className="rounded-2xl border border-[#D8DDE7] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
        <h3 className="text-sm font-extrabold text-[#102B4C]">Profile</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-[#637C96]">Name</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#D8DDE7] bg-[#FFFDF6] px-3.5 py-2.5 text-sm font-semibold text-[#17324F] outline-none transition focus:border-[#214F78] focus:shadow-[0_0_0_3px_rgba(215,233,245,.8)]"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-[#637C96]">Class</span>
            <input
              value={klass}
              onChange={e => setKlass(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#D8DDE7] bg-[#FFFDF6] px-3.5 py-2.5 text-sm font-semibold text-[#17324F] outline-none transition focus:border-[#214F78] focus:shadow-[0_0_0_3px_rgba(215,233,245,.8)]"
              placeholder="Class 9 · A"
            />
          </label>
        </div>
        <button
          onClick={() => { saveProfile({ name: name.trim() || "Aarav", klass: klass.trim() || "Class 9 · A", roll: getProfile().roll }); playFlick(); toast({ title: "Saved", description: "Dashboard ab naye naam se welcome karega." }); }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#102B4C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#214F78] active:scale-[.98]"
        >
          <Save className="h-4 w-4" /> Save profile
        </button>
      </section>

      {/* sound */}
      <section className="rounded-2xl border border-[#D8DDE7] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
        <h3 className="text-sm font-extrabold text-[#102B4C]">Notebook sounds</h3>
        <p className="mt-1 text-[13px] text-[#637C96]">Tab badalne pe page-flip ki awaaz — ekdum asli copy wali feel.</p>
        <button
          onClick={() => { const v = !sound; setSound(v); setSoundEnabled(v); if (v) playFlick(); }}
          className={`mt-4 inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
            sound ? "border-[#214F78] bg-[#EFF6FC] text-[#214F78]" : "border-[#D8DDE7] text-[#637C96]"
          }`}
          aria-pressed={sound}
        >
          {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {sound ? "Sounds ON" : "Sounds OFF"}
        </button>
      </section>

      {/* data */}
      <section className="rounded-2xl border border-[#D8DDE7] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
        <h3 className="text-sm font-extrabold text-[#102B4C]">Your data</h3>
        <p className="mt-1 text-[13px] text-[#637C96]">
          Sab kuch isi browser mein save hai — {stats.xp} XP, {stats.streak}-day streak, homework, game scores.
        </p>
        <button
          onClick={() => {
            if (!confirm("Reset ALL local progress? XP, streak, homework, game scores — sab chala jayega.")) return;
            try {
              const keep: [string, string | null][] = [];
              for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && (k.startsWith("saathy.") || k.startsWith("vs."))) keep.push([k, null]);
              }
              keep.forEach(([k]) => localStorage.removeItem(k));
            } catch { /* ignore */ }
            location.reload();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#e8b09a] bg-[#FBE9DF] px-4 py-2.5 text-sm font-bold text-[#a0522d] transition hover:bg-[#F6D5C6]"
        >
          <Eraser className="h-4 w-4" /> Reset all progress
        </button>
      </section>
    </div>
  );
}
