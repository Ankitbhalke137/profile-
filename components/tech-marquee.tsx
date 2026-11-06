const tech = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "WebRTC",
  "Socket.io",
  "Tailwind CSS",
  "Playwright",
];

export function TechMarquee() {
  return (
    <div className="relative border-y border-line bg-surface/40 py-4">
      <div className="marquee overflow-hidden">
        <div className="marquee-track items-center gap-8">
          {[...tech, ...tech].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="flex shrink-0 items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2"
            >
              {name}
              <span className="text-accent/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
