"use client";

/* Renders trusted self-authored mini-HTML (sup/sub/strong/br only). */
export function Html({ html, className }: { html: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ProgressBar({
  value,
  className = "",
  barClass = "bg-amber-400",
}: {
  value: number;
  className?: string;
  barClass?: string;
}) {
  return (
    <div className={`h-1.5 w-full rounded-full bg-zinc-800 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
