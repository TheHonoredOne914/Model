"use client";

// Notifications — teacher homework alerts, streak nudges and Saathy tips.
import { useEffect, useState } from "react";
import { Bell, CheckCheck, Gamepad2, Lightbulb, ListTodo, Flame } from "lucide-react";
import { getNotifications, markAllRead, markRead, type Notification } from "@/lib/platform/store";
import { playFlick } from "@/lib/platform/sound";
import type { Screen } from "./app-shell";

const ICON = {
  homework: ListTodo,
  streak: Flame,
  tip: Lightbulb,
  game: Gamepad2,
};

export function NotificationsScreen({ go }: { go: (s: Screen) => void }) {
  const [notes, setNotes] = useState<Notification[]>([]);

  const refreshNotes = () => setNotes(getNotifications());

  useEffect(() => {
    const id = window.setTimeout(refreshNotes, 0);
    window.addEventListener("vs.platform", refreshNotes);
    return () => { window.clearTimeout(id); window.removeEventListener("vs.platform", refreshNotes); };
  }, []);

  const unread = notes.filter(n => !n.read).length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">Notifications</h1>
          <p className="text-sm text-[#637C96]">{unread ? `${unread} unread — padh lo, kuch important hai.` : "Sab padh liya. Clean slate."}</p>
        </div>
        {unread > 0 && (
          <button
            onClick={() => { markAllRead(); playFlick(); }}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D8DDE7] bg-white px-3.5 py-2 text-xs font-extrabold text-[#214F78] transition hover:border-[#A9CEE8]"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {notes.map(n => {
          const Icon = ICON[n.kind] ?? Bell;
          return (
            <li key={n.id}>
              <button
                onClick={() => { markRead(n.id); if (n.kind === "homework") go("homework"); if (n.kind === "game") go("games"); }}
                className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition ${
                  n.read ? "border-[#D8DDE7] bg-white" : "border-[#A9CEE8] bg-[#F4FAFE] shadow-[0_10px_30px_-24px_rgba(16,43,76,.5)]"
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  n.kind === "homework" ? "bg-[#EFF6FC] text-[#214F78]" : n.kind === "streak" ? "bg-[#FBE9DF] text-[#e8825a]" : "bg-[#FFF5ED] text-[#c9a227]"
                }`}>
                  <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={`text-sm ${n.read ? "font-bold text-[#17324F]" : "font-extrabold text-[#102B4C]"}`}>{n.title}</span>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-[#e8825a]" aria-hidden />}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-[#637C96]">{n.body}</span>
                  <span className="mt-1 block text-[11px] font-semibold text-[#8ba3ba]">
                    {new Date(n.t).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
