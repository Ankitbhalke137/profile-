import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { GitHubStats } from "@/components/github-stats";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Ankit Bhalke — Software Engineer",
  description:
    "Software engineer building full-stack products with TypeScript, Next.js, Node.js, and PostgreSQL. CS student at PW Institute of Innovation.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GitHubStats />
      <Contact />
    </main>
  );
}
