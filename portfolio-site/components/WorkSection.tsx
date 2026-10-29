import { Card } from "@/components/ui/Card";

const AREAS = [
  {
    title: "Systems & competitive programming",
    detail:
      "Algorithm-heavy C++ work — data structures, complexity analysis, and contest-style problem solving.",
  },
  {
    title: "Cybersecurity & DFIR",
    detail:
      "Digital forensics and incident response fundamentals: artifact analysis, log review, and CTF-style challenges.",
  },
  {
    title: "Networking",
    detail:
      "Protocol-level understanding of how systems talk to each other, and where that communication breaks or gets attacked.",
  },
  {
    title: "Full-stack build work",
    detail:
      "This site itself: a typed Next.js app, a custom Three.js scene, and small interactive tools — no template, built component by component.",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-2xl text-ink">What I work on</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Four areas I keep coming back to, from coursework to independent projects.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {AREAS.map((area) => (
          <Card key={area.title}>
            <h3 className="font-display text-base text-ink">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{area.detail}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
