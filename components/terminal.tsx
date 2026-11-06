"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const commands = [
  {
    command: "whoami",
    output: ["Ankit Bhalke", "software engineer · Pune, India"],
  },
  {
    command: "stack",
    output: ["TypeScript · Next.js · Node.js", "PostgreSQL · Prisma · WebRTC"],
  },
  {
    command: "status",
    output: ["● open to SDE internships", "shipping ClassForge + VoiceCall"],
  },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Terminal() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22, rotate: 1 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative overflow-hidden rounded-2xl border border-line-strong bg-[#0b0b0e] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-white/40">
          ankit@portfolio — zsh
        </span>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] text-white/35">
          100%
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.13, delayChildren: 0.55 } },
        }}
        className="space-y-4 p-5 font-mono text-[12px] leading-6 sm:p-6 sm:text-[13px]"
      >
        {commands.map((item) => (
          <motion.div key={item.command} variants={lineVariants}>
            <div className="flex items-center gap-2">
              <span className="text-[#6ee7a8]">➜</span>
              <span className="text-[#f5c56b]">~</span>
              <span className="text-white/80">{item.command}</span>
            </div>
            <div className="space-y-0.5 pl-6 pt-1">
              {item.output.map((line) => (
                <p key={line} className="text-white/45">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div variants={lineVariants} className="flex items-center gap-2">
          <span className="text-[#6ee7a8]">➜</span>
          <span className="text-[#f5c56b]">~</span>
          <span className="inline-block h-4 w-[7px] animate-blink bg-[#f5c56b]" />
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#6ee7a8]" />
          main · clean
        </span>
        <span>node 26 · ts 5 · next 16</span>
      </div>

      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#f5c56b]/10 blur-3xl" />
    </motion.div>
  );
}
