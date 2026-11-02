"use client";

// AppShell — the VidhyaSaathy platform: notebook sidebar (index tabs), topbar
// (search, streak, XP, bell) and the main sheet that FLIPS like a real page
// (CSS 3D + synthesized paper sound) whenever you switch tabs.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell, BookOpen, CircleUser, Gamepad2, GraduationCap, Home, ListTodo,
  Search, Settings as SettingsIcon, Sparkles, Trophy, Flame,
} from "lucide-react";
import { Dashboard } from "./dashboard";
import { Subjects } from "./subjects";
import { Sessions } from "./sessions";
import { Homework } from "./homework";
import { GamesScreen } from "./games-hub";
import { ProgressScreen } from "./progress";
import { NotificationsScreen } from "./notifications";
import { SettingsScreen } from "./settings";
import { ChatApp } from "@/components/saathy/chat-app";
import { getProfile } from "@/lib/platform/store";
import { getStreak, getXp, XP_EVENT } from "@/lib/saathy-progress";
import { playPageFlip, playFlick } from "@/lib/platform/sound";

export type Screen =
  | "home" | "subjects" | "learn" | "homework" | "games"
  | "saathy" | "progress" | "notifications" | "settings" | "module";

const TABS: { key: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "subjects", label: "My subjects", icon: BookOpen },
  { key: "learn", label: "Learn sessions", icon: GraduationCap },
  { key: "homework", label: "Homework", icon: ListTodo },
  { key: "games", label: "Games", icon: Gamepad2 },
  { key: "saathy", label: "Ask Saathy", icon: Sparkles },
  { key: "progress", label: "My progress", icon: Trophy },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

interface ChapterRef { book: "gm" | "sc" | "us"; chapter: number }

export function AppShell() {
  const [screen, setScreen] = useState<Screen>("home");
  const [flip, setFlip] = useState(false);
  const [chapterRef, setChapterRef] = useState<ChapterRef | null>(null);
  const [profile, setProfile] = useState({ name: "Aarav", klass: "Class 9 · A", roll: "Roll no. 1" });
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [unread, setUnread] = useState(0);
  const [hwCount, setHwCount] = useState(0);
  const [q, setQ] = useState("");
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = useRef(true);

  const refreshChrome = useCallback(() => {
    setXp(getXp()); setStreak(getStreak()); setProfile(getProfile());
    try {
      const hw = JSON.parse(localStorage.getItem("vs.homework.v1") ?? "[]") as { status: string }[];
      setHwCount(hw.filter(h => h.status === "todo").length);
      const notes = JSON.parse(localStorage.getItem("vs.notifications.v1") ?? "[]") as { read: boolean }[];
      setUnread(notes.filter(n => !n.read).length);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(refreshChrome, 0);
    window.addEventListener(XP_EVENT, refreshChrome);
    window.addEventListener("vs.platform", refreshChrome);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener(XP_EVENT, refreshChrome);
      window.removeEventListener("vs.platform", refreshChrome);
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, [refreshChrome]);

  /** Tab switch = a real page turn: flip animation + paper sound. */
  const go = useCallback((s: Screen) => {
    setScreen(cur => {
      if (cur === s) return cur;
      setFlip(true);
      playPageFlip();
      if (flipTimer.current) clearTimeout(flipTimer.current);
      flipTimer.current = setTimeout(() => setFlip(false), 430);
      return s;
    });
  }, []);

  const openChapter = useCallback((book: ChapterRef["book"], chapter: number) => {
    setChapterRef({ book, chapter });
    setScreen(cur => {
      if (cur !== "module") {
        setFlip(true);
        playPageFlip();
        if (flipTimer.current) clearTimeout(flipTimer.current);
        flipTimer.current = setTimeout(() => setFlip(false), 430);
      }
      return "module";
    });
  }, []);

  const searchHit = useMemo(() => {
    if (!q.trim()) return null;
    return TABS.filter(t => t.label.toLowerCase().includes(q.trim().toLowerCase()));
  }, [q]);

  // deep link: /?screen=games etc. (keeps refreshes on the same tab)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const sp = new URLSearchParams(window.location.search);
      const s = sp.get("screen") as Screen | null;
      if (s && TABS.some(t => t.key === s)) setScreen(s);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // in-app navigation events fired by embedded screens (chapter module links)
  useEffect(() => {
    const goto = (e: Event) => { const s = (e as CustomEvent).detail as Screen; go(s); };
    const gotoChapter = (e: Event) => { const d = (e as CustomEvent).detail as ChapterRef; openChapter(d.book, d.chapter); };
    window.addEventListener("vs.goto", goto);
    window.addEventListener("vs.goto.chapter", gotoChapter);
    return () => { window.removeEventListener("vs.goto", goto); window.removeEventListener("vs.goto.chapter", gotoChapter); };
  }, [go, openChapter]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const url = new URL(window.location.href);
    url.searchParams.set("screen", screen);
    window.history.replaceState(null, "", url.toString());
  }, [screen]);

  const showChapterModule = screen === "module" && chapterRef;

  return (
    <div className="min-h-dvh bg-[#FFF9F5] text-[#17324F]">
      {/* paper grain over the whole desk */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(16,43,76,0.045) 1px, transparent 1px), radial-gradient(rgba(16,43,76,0.03) 1px, transparent 1px)",
          backgroundSize: "26px 26px, 34px 34px",
          backgroundPosition: "0 0, 13px 17px",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-dvh">
        {/* ================= sidebar: notebook index tabs ================= */}
        <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col border-r border-[#D8DDE7] bg-white/80 backdrop-blur lg:flex">
          <Link href="/" className="flex items-center gap-3 px-5 pb-4 pt-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#102B4C] shadow-[0_8px_20px_-8px_rgba(16,43,76,.6)]">
              <GraduationCap className="h-6 w-6 text-[#F6D5C6]" />
            </span>
            <span>
              <span className="block text-[15px] font-extrabold leading-tight text-[#102B4C]">VidhyaSaathy</span>
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#637C96]">Learning, with you</span>
            </span>
          </Link>

          <nav className="mt-1 flex-1 space-y-1 overflow-y-auto px-3 pb-4 [scrollbar-width:thin]">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = screen === t.key || (t.key === "learn" && showChapterModule);
              const badge = t.key === "homework" ? hwCount : t.key === "notifications" ? unread : 0;
              return (
                <button
                  key={t.key}
                  onClick={() => go(t.key)}
                  onMouseEnter={() => playFlick()}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13.5px] font-bold transition ${
                    active
                      ? "bg-[#102B4C] text-white shadow-[0_8px_20px_-10px_rgba(16,43,76,.7)]"
                      : "text-[#3d5872] hover:bg-[#FBE9DF]/70 hover:text-[#102B4C]"
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[#F6D5C6]" : "text-[#637C96] group-hover:text-[#214F78]"}`} />
                  <span className="flex-1">{t.label}</span>
                  {badge > 0 && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                      t.key === "notifications" ? "bg-[#e8825a] text-white" : "bg-[#F6D5C6] text-[#a0522d]"
                    }`}>{badge}</span>
                  )}
                  {/* notebook index-tab edge */}
                  <span
                    className={`absolute -right-[1px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full transition ${active ? "bg-[#F6D5C6]" : "bg-transparent group-hover:bg-[#D7E9F5]"}`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </nav>

          {/* student card */}
          <div className="mx-3 mb-4 flex items-center gap-3 rounded-2xl border border-[#D8DDE7] bg-[#FFFDF6] p-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FC]">
              <CircleUser className="h-5 w-5 text-[#214F78]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-extrabold text-[#102B4C]">{profile.name}</span>
              <span className="block truncate text-[11px] font-semibold text-[#637C96]">{profile.klass} · {profile.roll}</span>
            </span>
          </div>
        </aside>

        {/* ================= main ================= */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* topbar */}
          <header className="sticky top-0 z-30 border-b border-[#D8DDE7] bg-white/85 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              {/* mobile tabs */}
              <div className="flex gap-1 overflow-x-auto lg:hidden [scrollbar-width:none]">
                {TABS.slice(0, 6).map(t => {
                  const Icon = t.icon;
                  const active = screen === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => go(t.key)}
                      aria-label={t.label}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                        active ? "bg-[#102B4C] text-white" : "bg-white text-[#637C96] border border-[#D8DDE7]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>

              <div className="relative ml-auto w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ba3ba]" />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search Kuch bhi…"
                  className="w-full rounded-full border border-[#D8DDE7] bg-[#FFFDF6] py-2 pl-9 pr-3 text-[13px] font-semibold text-[#17324F] outline-none transition placeholder:text-[#8ba3ba] focus:border-[#214F78] focus:shadow-[0_0_0_3px_rgba(215,233,245,.8)]"
                  aria-label="Search"
                />
                {searchHit && (
                  <div className="absolute left-0 right-0 top-11 z-40 overflow-hidden rounded-xl border border-[#D8DDE7] bg-white shadow-[0_18px_40px_-20px_rgba(16,43,76,.5)]">
                    {searchHit.length ? searchHit.map(t => (
                      <button
                        key={t.key}
                        onClick={() => { go(t.key); setQ(""); }}
                        className="block w-full px-4 py-2.5 text-left text-[13px] font-bold text-[#17324F] hover:bg-[#FFF9F5]"
                      >
                        {t.label}
                      </button>
                    )) : (
                      <p className="px-4 py-3 text-[13px] text-[#637C96]">Kuch nahi mila — Saathy se pucho?</p>
                    )}
                  </div>
                )}
              </div>

              <span className="hidden items-center gap-1.5 rounded-full border border-[#F0D9A8] bg-[#FFF9EC] px-3 py-1.5 text-xs font-extrabold text-[#a0761b] sm:inline-flex">
                <Flame className="h-3.5 w-3.5 text-[#e8825a]" /> {streak} day
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-[#e7d9a8] bg-[#fffbee] px-3 py-1.5 text-xs font-extrabold text-[#a0761b] sm:inline-flex">
                <Trophy className="h-3.5 w-3.5 text-[#c9a227]" /> {xp} XP
              </span>
              <button
                onClick={() => go("notifications")}
                aria-label={`Notifications (${unread} unread)`}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDE7] bg-white text-[#637C96] transition hover:text-[#214F78]"
              >
                <Bell className="h-4 w-4" />
                {unread > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e8825a] px-1 text-[9px] font-extrabold text-white">{unread}</span>}
              </button>
            </div>
          </header>

          {/* the flipping sheet */}
          <main className={`flex-1 px-4 py-6 sm:px-6 lg:px-8 ${flip ? "vs-page-flip" : ""}`}>
            {showChapterModule ? (
              <ChapterModuleHost ref_={chapterRef} onBack={() => go("learn")} />
            ) : (
              <>
                {screen === "home" && <Dashboard go={go} openChapter={openChapter} />}
                {screen === "subjects" && <Subjects openChapter={openChapter} />}
                {screen === "learn" && <Sessions />}
                {screen === "homework" && <Homework openChapter={openChapter} />}
                {screen === "games" && <GamesScreen />}
                {screen === "saathy" && (
                  <div className="fixed inset-0 z-40 bg-[#FFF9F5]">
                    <ChatApp onExit={() => go("home")} />
                  </div>
                )}
                {screen === "progress" && <ProgressScreen />}
                {screen === "notifications" && <NotificationsScreen go={go} />}
                {screen === "settings" && <SettingsScreen />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* chapter module opened from the shell — the real ChapterWorld in focus mode.
   Link clicks inside the module (← to /learn, "Saathy chat" to /, prev/next
   chapter) are re-routed into the shell so the platform never breaks flow. */
function ChapterModuleHost({ ref_, onBack }: { ref_: ChapterRef; onBack: () => void }) {
  const [Comp, setComp] = useState<null | React.ComponentType<{ chapter: import("@/lib/learn/artifacts").ChapterArtifacts }>>(null);
  const [chapter, setChapter] = useState<import("@/lib/learn/artifacts").ChapterArtifacts | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ ChapterWorld }, { getChapter }] = await Promise.all([
        import("@/components/learn/chapter-world"),
        import("@/lib/learn/artifacts"),
      ]);
      if (!alive) return;
      setComp(() => ChapterWorld);
      setChapter(getChapter(ref_.book, ref_.chapter) ?? null);
    })();
    return () => { alive = false; };
  }, [ref_.book, ref_.chapter]);

  // route the module's internal links back into the platform shell
  const intercept = useCallback((e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    const ch = href.match(/^\/learn\/(gm|sc|us)\/(\d+)$/);
    if (ch) { e.preventDefault(); window.dispatchEvent(new CustomEvent("vs.goto.chapter", { detail: { book: ch[1], chapter: Number(ch[2]) } })); }
    else if (href === "/learn") { e.preventDefault(); onBack(); }
    else if (href === "/") { e.preventDefault(); window.dispatchEvent(new CustomEvent("vs.goto", { detail: "saathy" })); }
  }, [onBack]);

  return (
    <div onClickCapture={intercept}>
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#D8DDE7] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#214F78] transition hover:border-[#A9CEE8]">
        &larr; Back to Learn sessions
      </button>
      {Comp && chapter ? <Comp chapter={chapter} /> : (
        <div className="rounded-2xl border border-[#D8DDE7] bg-white p-10 text-center text-sm font-bold text-[#637C96]">Opening the module…</div>
      )}
    </div>
  );
}
