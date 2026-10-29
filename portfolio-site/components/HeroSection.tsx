import { CarScene } from "@/components/3d/CarScene";
import { HUDPanel } from "@/components/dashboard/HUDPanel";

export function HeroSection() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            I build software and break it on purpose, so the real thing holds.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Tasin — a software engineering student working across systems programming,
            competitive C++, and digital forensics and incident response. This site is also a
            small workbench: everything you see below actually runs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-md bg-amber px-5 py-3 text-sm font-medium text-base hover:bg-amber-soft"
            >
              Work with me
            </a>
            <a
              href="#toolkit"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium text-ink hover:border-teal"
            >
              Try the toolkit
            </a>
          </div>
        </div>

        <CarScene />
      </div>

      <div className="mt-10">
        <HUDPanel
          stats={[
            { label: "Focus", value: "Cybersecurity", hint: "DFIR" },
            { label: "Language", value: "C++", hint: "competitive programming" },
            { label: "Field", value: "Networking", hint: "systems + security" },
            { label: "Status", value: "Open to work", hint: "internships & freelance" },
          ]}
        />
      </div>
    </section>
  );
}
