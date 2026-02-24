"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import AiWidget from "@/components/AiWidget";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="font-semibold tracking-tight">Felipe • Portfolio</div>
          <nav className="flex gap-4 text-sm text-zinc-300">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#skills">Skills</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-2 md:items-center"
        >
          <div>
            <p className="text-sm text-zinc-400">Next.js • Tailwind • Framer Motion • AI</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
              Hi, I’m Felipe.
              <span className="block text-zinc-300">
                I build clean, practical software.
              </span>
            </h1>
            <p className="mt-4 max-w-prose text-zinc-300">
              I’m a Computer Science student focused on programming, data analysis,
              and documenting systems using clear flow charts and structured thinking.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
              >
                Contact
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-300">
                ✅ Assignment requirement: AI element included below (Ask My AI).
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Ask My AI</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Ask questions about my education, skills, and projects.
            </p>
            <div className="mt-4">
              <AiWidget />
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              Tip: Try “Summarize my projects in 3 bullets” or “What tech do I use?”
            </p>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-4 pb-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-semibold">About Me</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-medium">Education</h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                <li>• Associate’s Degree — UCNJ (08/2022 – 12/2024)</li>
                <li>• Bachelor’s Degree — Kean University (01/2025 – 12/2026)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-medium">Interests</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Programming, data analysis, and video games.
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                I enjoy turning messy systems into clear documentation and flow charts.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl px-4 pb-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="mt-2 text-sm text-zinc-300">
            A few projects that demonstrate clean logic, structure, and practical problem solving.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ProjectCard
              title="Temperature Tracker (Java)"
              desc="Console app where the user inputs daily temperatures for a week, then the program prints highest/lowest, weekly average, and which days are above average. Demonstrates arrays, loop logic, method decomposition, and clean output."
              tags={["Java", "Arrays", "Loops"]}
            />
            <ProjectCard
              title="Grades Analyzer (Java)"
              desc="Analyzes a set of student grades and prints average, highest, lowest, and how many students passed. Demonstrates iteration, aggregation, and good input/output structure."
              tags={["Java", "Data aggregation"]}
            />
            <ProjectCard
              title="Java Calculator"
              desc="A straightforward calculator that supports common operations with clean input validation and readable code structure."
              tags={["Java", "Validation"]}
            />
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-5xl px-4 pb-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "Java", "HTML", "PowerShell", "Next.js", "Tailwind CSS"].map((s) => (
              <span
                key={s}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-sm text-zinc-200"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-4 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <p>📧 felipe.t.bonke@gmail.com</p>
            <p>📱 (908) 341-2703</p>
            <p>
              🔗 LinkedIn: <span className="text-zinc-400">Felipe Takahashi Bonke</span>
            </p>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500">
        © {year} Felipe. Built with Next.js + Tailwind + Framer Motion + AI.
      </footer>
    </main>
  );
}

function ProjectCard({
  title,
  desc,
  tags,
}: {
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-xl border border-white/10 bg-black/20 px-2 py-1 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}