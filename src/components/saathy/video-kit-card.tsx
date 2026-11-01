'use client';

// Curated video kit card — DIRECT, verified video links (server-verified via
// YouTube oEmbed before shipping). Primary teacher + alternates, same warm
// design language as the YouTube plan card.
import { useState } from 'react';
import { MonitorPlay, Play } from 'lucide-react';
import type { VideoKitMeta } from '@/lib/saathy-types';

export function VideoKitCard({ kit }: { kit: VideoKitMeta }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-2.5 overflow-hidden rounded-xl border border-[#d7e9f5] bg-gradient-to-b from-[#f4faff] to-white">
      <p className="flex items-center gap-1.5 px-3.5 pt-3 text-[11.5px] font-extrabold uppercase tracking-wider text-[#214f78]">
        <MonitorPlay className="h-3.5 w-3.5" />
        Watch this — {kit.concept} (Class {kit.cls} {kit.subjectName})
      </p>

      {/* Primary teacher — inline player on tap */}
      <div className="px-3.5 pt-2.5">
        {playing ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#e2e8f0] bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${kit.primary.vid}?autoplay=1&rel=0`}
              title={kit.primary.title || 'Saathy curated video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#102b4c]"
          >
            <img
              src={`https://i.ytimg.com/vi/${kit.primary.vid}/hqdefault.jpg`}
              alt={kit.primary.title || 'Video thumbnail'}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
              loading="lazy"
            />
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#d7e9f5]/95 shadow-lg transition group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-[#102b4c] text-[#102b4c]" />
            </span>
          </button>
        )}
        <p className="mt-1.5 truncate text-[12px] font-bold text-[#16305b]">{kit.primary.title}</p>
        <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#214f78]">{kit.primary.author} · plays right here</p>
      </div>

      {/* Different teachers explain differently — direct verified links */}
      {kit.alternates.length > 0 ? (
        <div className="px-3.5 pt-2.5">
          <p className="text-[11px] font-bold text-[#8a94a8]">Different teachers, different styles — sab verified direct links:</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {kit.alternates.map((a) => (
              <a
                key={a.vid}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#c9dff0] bg-white px-3 py-1.5 text-[11.5px] font-extrabold text-[#214f78] transition hover:-translate-y-px hover:bg-[#eef6fd] hover:shadow-sm"
                title={a.title}
              >
                ▶ {a.author}
              </a>
            ))}
          </div>
        </div>
      ) : null}
      <div className="h-3.5" />
    </div>
  );
}
