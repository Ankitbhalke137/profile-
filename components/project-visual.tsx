import {
  ChartBar,
  BookOpen,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Mic,
  Phone,
  PhoneOff,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Volume2,
} from "lucide-react";
import type { ProjectVisual as VisualKind } from "@/lib/data";

const urls: Record<VisualKind, string> = {
  classforge: "classforge.app/greenwood/dashboard",
  voicecall: "voicecall.app/call/ankit",
  eduspear: "eduspear.app/study-hub",
  news: "chronicle.news/technology",
  finance: "capitalcontrol.app/dashboard",
  dbms: "social-graph/schema.sql",
};

function Chrome({ kind, children }: { kind: VisualKind; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0d]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="size-1.5 rounded-full bg-[#ff5f57]/70" />
        <span className="size-1.5 rounded-full bg-[#febc2e]/70" />
        <span className="size-1.5 rounded-full bg-[#28c840]/70" />
        <span className="mx-auto max-w-[58%] truncate rounded border border-white/10 bg-black/20 px-2.5 py-0.5 font-mono text-[8px] text-white/35">
          {urls[kind]}
        </span>
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      <div className="h-[236px] p-2.5 sm:h-[274px] sm:p-3">{children}</div>
    </div>
  );
}

function ClassForgeVisual() {
  const nav = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: GraduationCap, label: "Students" },
    { icon: Users, label: "Teachers" },
    { icon: CalendarDays, label: "Classes" },
    { icon: CircleDollarSign, label: "Fees" },
    { icon: Settings, label: "Settings" },
  ];
  const rows = [
    { name: "Aarav Sharma", grade: "Grade 9 · A", fee: "Paid" },
    { name: "Maya Patel", grade: "Grade 8 · B", fee: "Paid" },
    { name: "Rohan Verma", grade: "Grade 10 · A", fee: "Due" },
    { name: "Isha Nair", grade: "Grade 9 · B", fee: "Paid" },
  ];

  return (
    <div className="flex h-full gap-2 text-[8px] text-white/60">
      <aside className="hidden w-[23%] flex-col rounded-lg border border-white/10 bg-white/[0.025] p-2 sm:flex">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="grid size-5 place-items-center rounded bg-[#f5c56b] font-mono text-[8px] font-bold text-black">
            CF
          </span>
          <span className="text-[9px] font-medium text-white/80">ClassForge</span>
        </div>
        <div className="space-y-1">
          {nav.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 rounded px-1.5 py-1 ${
                active ? "bg-[#f5c56b]/10 text-[#f5c56b]" : "text-white/35"
              }`}
            >
              <Icon className="size-2.5" />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded border border-white/10 bg-black/20 p-1.5">
          <p className="text-[7px] text-white/30">Storage</p>
          <div className="mt-1 h-1 rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-[#f5c56b]" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#f5c56b]">
              School Admin
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-white/85">
              Greenwood High
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[7px] text-white/35">
              2025–26
            </span>
            <span className="grid size-5 place-items-center rounded-full bg-[#1c2a22] text-[7px] text-[#6ee7a8]">
              AB
            </span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { label: "Students", value: "1,284", delta: "+4.2%" },
            { label: "Attendance", value: "94.6%", delta: "+1.8%" },
            { label: "Fees due", value: "₹2.4L", delta: "−12%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/[0.025] p-1.5"
            >
              <p className="text-[7px] text-white/35">{stat.label}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-white/85">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[6px] text-[#6ee7a8]">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 flex-1 rounded-lg border border-white/10 bg-white/[0.02] p-2">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-medium text-white/70">Students</p>
            <span className="flex items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[6px] text-white/35">
              <Search className="size-2" /> Search
            </span>
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="grid grid-cols-[1.4fr_1fr_0.6fr] border-b border-white/10 pb-1 text-[6px] uppercase tracking-wider text-white/25">
              <span>Name</span>
              <span>Class</span>
              <span>Fee</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1.4fr_1fr_0.6fr] items-center border-b border-white/5 py-1 text-[7px] last:border-none"
              >
                <span className="truncate text-white/65">{row.name}</span>
                <span className="truncate text-white/35">{row.grade}</span>
                <span
                  className={
                    row.fee === "Paid" ? "text-[#6ee7a8]" : "text-[#f5c56b]"
                  }
                >
                  {row.fee}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceCallVisual() {
  const contacts = [
    { name: "Maya Patel", status: "online", active: true },
    { name: "Rohan Verma", status: "online" },
    { name: "Isha Nair", status: "away" },
    { name: "Arjun Rao", status: "offline" },
  ];

  return (
    <div className="flex h-full gap-2 text-[8px] text-white/60">
      <div className="hidden w-[33%] flex-col rounded-lg border border-white/10 bg-white/[0.025] p-2 sm:flex">
        <div className="flex items-center gap-1.5">
          <span className="grid size-5 place-items-center rounded-md bg-[#6ee7a8]/15">
            <Phone className="size-2.5 text-[#6ee7a8]" />
          </span>
          <span className="text-[9px] font-medium text-white/80">VoiceCall</span>
        </div>
        <p className="mt-3 text-[6px] uppercase tracking-[0.16em] text-white/25">
          Contacts
        </p>
        <div className="mt-1 space-y-1">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className={`flex items-center gap-1.5 rounded px-1 py-1 ${
                contact.active ? "bg-white/[0.05]" : ""
              }`}
            >
              <span className="relative grid size-4 place-items-center rounded-full bg-white/10 text-[6px] text-white/60">
                {contact.name.charAt(0)}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full border border-[#0a0a0d] ${
                    contact.status === "online"
                      ? "bg-[#6ee7a8]"
                      : contact.status === "away"
                        ? "bg-[#f5c56b]"
                        : "bg-white/25"
                  }`}
                />
              </span>
              <span className="truncate text-[7px] text-white/55">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded border border-white/10 bg-black/20 px-1.5 py-1 font-mono text-[6px] text-white/30">
          ● 3 online
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-[#12251f] via-[#0d1714] to-[#0a0a0d] p-3">
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-1.5 py-0.5 font-mono text-[6px] text-[#6ee7a8]">
          <span className="size-1 rounded-full bg-[#6ee7a8]" /> P2P connected
        </span>
        <span className="absolute right-2 top-2 rounded border border-white/10 bg-black/20 px-1.5 py-0.5 font-mono text-[6px] text-white/35">
          WebRTC
        </span>

        <div className="relative grid size-12 place-items-center rounded-full border border-[#6ee7a8]/20 bg-[#6ee7a8]/10 text-sm font-semibold text-[#b9f5d6]">
          MP
          <span className="absolute inset-0 animate-ping rounded-full border border-[#6ee7a8]/20" />
        </div>
        <p className="mt-2 text-[10px] font-medium text-white/85">Maya Patel</p>
        <p className="mt-0.5 font-mono text-[7px] text-[#6ee7a8]">00:42</p>

        <div className="mt-3 flex h-6 items-center gap-0.5">
          {[0.2, 0.5, 0.9, 0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4].map(
            (height, index) => (
              <span
                key={index}
                className="w-1 animate-wave rounded-full bg-[#6ee7a8]/60"
                style={{
                  height: `${Math.max(height * 22, 4)}px`,
                  animationDelay: `${index * 0.08}s`,
                }}
              />
            ),
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full border border-white/10 bg-white/5">
            <Mic className="size-2.5 text-white/60" />
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-[#ff5f57]">
            <PhoneOff className="size-3 text-white" />
          </span>
          <span className="grid size-6 place-items-center rounded-full border border-white/10 bg-white/5">
            <Volume2 className="size-2.5 text-white/60" />
          </span>
        </div>
      </div>
    </div>
  );
}

function EduspearVisual() {
  return (
    <div className="flex h-full gap-2 text-[8px] text-white/60">
      <div className="hidden w-[22%] flex-col rounded-lg border border-white/10 bg-white/[0.025] p-2 sm:flex">
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3 text-[#f5c56b]" />
          <span className="text-[8px] font-medium text-white/80">Eduspear</span>
        </div>
        <p className="mt-2 text-[6px] uppercase tracking-[0.14em] text-white/25">
          Lobby
        </p>
        {["# general", "# study-hub", "# games"].map((channel, index) => (
          <div
            key={channel}
            className={`mt-0.5 flex items-center gap-1 rounded px-1 py-0.5 ${
              index === 1 ? "bg-[#f5c56b]/10 text-[#f5c56b]" : "text-white/35"
            }`}
          >
            <MessageSquare className="size-2" />
            {channel}
          </div>
        ))}
        <p className="mt-2 text-[6px] uppercase tracking-[0.14em] text-white/25">
          Direct
        </p>
        {["Maya Patel", "Rohan Verma"].map((name) => (
          <div key={name} className="mt-0.5 flex items-center gap-1 px-1 py-0.5 text-white/35">
            <span className="size-1.5 rounded-full bg-[#6ee7a8]" />
            {name}
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/10 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-medium text-white/75"># study-hub</span>
            <span className="flex items-center gap-0.5 rounded border border-[#6ee7a8]/20 bg-[#6ee7a8]/5 px-1 py-0.5 text-[6px] text-[#6ee7a8]">
              <Lock className="size-1.5" /> E2EE
            </span>
          </div>
          <span className="flex -space-x-1">
            {["M", "R", "I"].map((initial) => (
              <span
                key={initial}
                className="grid size-3.5 place-items-center rounded-full border border-[#0a0a0d] bg-white/10 text-[5px] text-white/60"
              >
                {initial}
              </span>
            ))}
          </span>
        </div>

        <div className="flex-1 space-y-1.5 p-2">
          <div className="flex items-end gap-1">
            <span className="grid size-4 place-items-center rounded-full bg-white/10 text-[6px]">
              M
            </span>
            <div className="max-w-[75%] rounded-lg rounded-bl-none border border-white/10 bg-white/[0.04] px-2 py-1 text-[7px] text-white/60">
              Anyone up for the DBMS trivia round?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg rounded-br-none bg-[#f5c56b]/15 px-2 py-1 text-[7px] text-[#f5c56b]">
              In. I&apos;ll share my normalized schema notes.
            </div>
          </div>
          <div className="flex items-end gap-1">
            <span className="grid size-4 place-items-center rounded-full bg-white/10 text-[6px]">
              R
            </span>
            <div className="max-w-[75%] rounded-lg rounded-bl-none border border-white/10 bg-white/[0.04] px-2 py-1">
              <div className="rounded border border-white/10 bg-black/30 px-1.5 py-1 font-mono text-[6px] text-[#6ee7a8]">
                SELECT * FROM follows;
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 border-t border-white/10 px-2 py-1.5">
          <span className="flex-1 rounded border border-white/10 bg-black/20 px-2 py-1 text-[6px] text-white/25">
            Encrypted message…
          </span>
          <span className="grid size-5 place-items-center rounded bg-[#f5c56b] text-black">
            <Lock className="size-2" />
          </span>
        </div>
      </div>

      <div className="hidden w-[24%] flex-col gap-1.5 sm:flex">
        <div className="rounded-lg border border-white/10 bg-white/[0.025] p-1.5">
          <p className="text-[6px] uppercase tracking-[0.14em] text-white/25">
            Study hub
          </p>
          <div className="mt-1 space-y-1">
            {[
              { icon: BookOpen, label: "Flashcards" },
              { icon: ChartBar, label: "Trivia" },
              { icon: Users, label: "Connect 4" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1 rounded border border-white/5 bg-white/[0.02] px-1 py-1 text-[6px] text-white/45"
              >
                <Icon className="size-2 text-[#f5c56b]" />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[#6ee7a8]/15 bg-[#6ee7a8]/5 p-1.5">
          <p className="font-mono text-[6px] text-[#6ee7a8]">AES-GCM 256</p>
          <p className="mt-0.5 text-[6px] leading-3 text-white/35">
            Keys never reach the server.
          </p>
        </div>
      </div>
    </div>
  );
}

function NewsVisual() {
  return (
    <div className="flex h-full flex-col gap-2 text-[8px] text-white/60">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-[9px] font-medium text-white/80">
          <span className="size-1.5 rounded-full bg-[#f5c56b]" />
          Chronicle
        </span>
        <span className="flex flex-1 items-center gap-1 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[6px] text-white/25">
          <Search className="size-2" /> Search headlines…
        </span>
        <span className="flex items-center gap-1 rounded border border-[#6ee7a8]/20 bg-[#6ee7a8]/5 px-1.5 py-0.5 font-mono text-[6px] text-[#6ee7a8]">
          <span className="size-1 rounded-full bg-[#6ee7a8]" /> LIVE
        </span>
      </div>

      <div className="flex gap-1">
        {["All", "Tech", "Business", "Science", "Sports"].map((category, index) => (
          <span
            key={category}
            className={`rounded px-1.5 py-0.5 text-[6px] ${
              index === 1
                ? "bg-[#f5c56b] text-black"
                : "border border-white/10 text-white/35"
            }`}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
        <div className="col-span-2 row-span-2 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
          <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#1d2a24] via-[#141a17] to-[#0d0d10] p-2">
            <div className="absolute inset-0 bg-dots opacity-30" />
            <span className="relative rounded bg-[#6ee7a8]/10 px-1.5 py-0.5 text-[6px] text-[#6ee7a8]">
              Technology
            </span>
            <p className="relative mt-6 max-w-[85%] text-[10px] font-medium leading-4 text-white/80">
              The quiet architecture decisions that make realtime apps feel
              instant
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-2 py-1.5 text-[6px] text-white/30">
            <span>6 min read</span>
            <span>2h ago</span>
          </div>
        </div>

        {[
          "PostgreSQL row-level security, explained",
          "Why WebRTC still wins for voice",
          "A 3NF schema for social graphs",
        ].map((headline, index) => (
          <div
            key={headline}
            className={`flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.025] p-1.5 ${
              index === 2 ? "col-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-[#f5c56b]" />
              <span className="text-[6px] uppercase tracking-wider text-white/25">
                {["Backend", "Realtime", "Database"][index]}
              </span>
            </div>
            <p className="text-[7px] leading-3 text-white/65">{headline}</p>
            <span className="text-[6px] text-white/25">4 min read</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceVisual() {
  const bars = [38, 52, 44, 68, 58, 76, 64];
  return (
    <div className="flex h-full gap-2 text-[8px] text-white/60">
      <div className="flex w-[38%] flex-col gap-1.5">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
          <p className="text-[6px] uppercase tracking-[0.14em] text-white/25">
            Total balance
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-white/85">₹1,84,250</p>
          <p className="mt-0.5 text-[6px] text-[#6ee7a8]">+12.4% vs last month</p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-1.5">
          <div className="rounded-lg border border-white/10 bg-white/[0.025] p-1.5">
            <p className="text-[6px] text-white/25">Income</p>
            <p className="text-[9px] font-medium text-[#6ee7a8]">₹2,40,000</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.025] p-1.5">
            <p className="text-[6px] text-white/25">Expenses</p>
            <p className="text-[9px] font-medium text-[#f28b82]">₹55,750</p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex gap-1.5">
          <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.025] p-2">
            <p className="text-[6px] text-white/25">Cash flow · 6 months</p>
            <div className="mt-2 flex h-12 items-end gap-1">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#f5c56b]/30 to-[#f5c56b]/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="grid w-[38%] place-items-center rounded-lg border border-white/10 bg-white/[0.025] p-1.5">
            <div
              className="grid size-12 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(#f5c56b 0 46%, #6ee7a8 46% 72%, rgba(255,255,255,0.08) 72% 100%)",
              }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-[#0a0a0d] text-[6px] text-white/45">
                72%
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] p-2">
          <div className="flex items-center justify-between">
            <p className="text-[7px] font-medium text-white/70">Transactions</p>
            <span className="rounded border border-white/10 px-1 py-0.5 text-[5px] text-white/30">
              Export CSV
            </span>
          </div>
          <div className="mt-1 space-y-1">
            {[
              { label: "Hosting · Vercel", value: "−₹1,800", tone: "text-[#f28b82]" },
              { label: "Freelance project", value: "+₹18,000", tone: "text-[#6ee7a8]" },
              { label: "Coffee · Third Wave", value: "−₹420", tone: "text-[#f28b82]" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-white/5 py-0.5 text-[6px] last:border-none"
              >
                <span className="text-white/45">{row.label}</span>
                <span className={row.tone}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DbmsVisual() {
  const tables = [
    {
      name: "users",
      columns: [
        { name: "id", type: "uuid", key: "PK" },
        { name: "handle", type: "text" },
        { name: "email", type: "text" },
      ],
    },
    {
      name: "posts",
      columns: [
        { name: "id", type: "uuid", key: "PK" },
        { name: "user_id", type: "uuid", key: "FK" },
        { name: "body", type: "text" },
      ],
    },
    {
      name: "follows",
      columns: [
        { name: "follower_id", type: "uuid", key: "FK" },
        { name: "followee_id", type: "uuid", key: "FK" },
        { name: "created_at", type: "timestamp" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col gap-2 text-[8px] text-white/60">
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {tables.map((table) => (
          <div
            key={table.name}
            className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-1.5 py-1">
              <span className="font-mono text-[7px] text-[#f5c56b]">
                {table.name}
              </span>
              <span className="rounded bg-white/5 px-1 text-[5px] text-white/25">
                TABLE
              </span>
            </div>
            <div className="flex-1 p-1">
              {table.columns.map((column) => (
                <div
                  key={column.name}
                  className="flex items-center justify-between border-b border-white/5 py-1 last:border-none"
                >
                  <span className="truncate font-mono text-[6px] text-white/55">
                    {column.name}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <span className="text-[5px] text-white/20">{column.type}</span>
                    {column.key ? (
                      <span className="rounded bg-[#f5c56b]/15 px-0.5 text-[5px] text-[#f5c56b]">
                        {column.key}
                      </span>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-black/30 p-2 font-mono text-[6px] leading-3">
        <div className="flex items-center gap-1 text-white/25">
          <span className="size-1 rounded-full bg-[#6ee7a8]" />
          schema.sql
        </div>
        <p className="mt-1 text-white/45">
          <span className="text-[#f5c56b]">CREATE TABLE</span> follows (
        </p>
        <p className="pl-2 text-white/35">
          follower_id UUID <span className="text-[#6ee7a8]">REFERENCES</span>{" "}
          users(id),
        </p>
        <p className="pl-2 text-white/35">
          followee_id UUID <span className="text-[#6ee7a8]">REFERENCES</span>{" "}
          users(id),
        </p>
        <p className="pl-2 text-white/35">
          <span className="text-[#f5c56b]">PRIMARY KEY</span> (follower_id,
          followee_id)
        </p>
        <p className="text-white/45">);</p>
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  return (
    <Chrome kind={kind}>
      {kind === "classforge" ? <ClassForgeVisual /> : null}
      {kind === "voicecall" ? <VoiceCallVisual /> : null}
      {kind === "eduspear" ? <EduspearVisual /> : null}
      {kind === "news" ? <NewsVisual /> : null}
      {kind === "finance" ? <FinanceVisual /> : null}
      {kind === "dbms" ? <DbmsVisual /> : null}
    </Chrome>
  );
}
