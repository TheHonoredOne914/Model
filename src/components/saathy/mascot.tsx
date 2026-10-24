'use client';

// Saathy's cloud mascot — the same Sarthi character everywhere (consistency rule).
// Poses come from the official mascot asset set. Motion is restrained per the
// mascot behaviour rules: idle float, thinking pulse, entrance pop — and fully
// static when the student prefers reduced motion or disables animations.

export type MascotPose =
  | 'idle'
  | 'thinking'
  | 'happy'
  | 'excited'
  | 'cheering'
  | 'reading'
  | 'sleeping'
  | 'wink'
  | 'explaining';

const SRC: Record<MascotPose, string> = {
  idle: '/saathy/pose_idle.png',
  thinking: '/saathy/pose_thinking.png',
  happy: '/saathy/pose_happy.png',
  excited: '/saathy/pose_excited.png',
  cheering: '/saathy/pose_cheering.png',
  reading: '/saathy/pose_reading.png',
  sleeping: '/saathy/pose_sleeping.png',
  wink: '/saathy/pose_wink.png',
  explaining: '/saathy/pose_explaining.png',
};

export interface MascotProps {
  pose?: MascotPose;
  size?: number;
  alt?: string;
  float?: boolean;
  thinking?: boolean;
  pop?: boolean;
  animationsEnabled?: boolean;
  className?: string;
}

export function Mascot({
  pose = 'idle',
  size = 64,
  alt,
  float = false,
  thinking = false,
  pop = false,
  animationsEnabled = true,
  className = '',
}: MascotProps) {
  const motion = !animationsEnabled
    ? ''
    : thinking
      ? 'mascot-thinking'
      : pop
        ? 'mascot-pop'
        : float
          ? 'mascot-float'
          : '';

  return (
    <span
      className={`relative inline-block shrink-0 select-none ${motion} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={alt ? undefined : true}
      role={alt ? 'img' : undefined}
      aria-label={alt}
    >
      {/* Tiny pre-optimised local PNGs — plain img avoids next/image aspect-ratio warnings. */}
      <img
        src={SRC[pose]}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(30,58,138,0.14)]"
        draggable={false}
      />
    </span>
  );
}
