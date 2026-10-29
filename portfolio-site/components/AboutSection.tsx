export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl text-ink">About</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          I&apos;m a software engineering student, currently splitting my time between coursework,
          competitive programming, and a growing interest in digital forensics and incident
          response. I like understanding systems from both sides — how they&apos;re built, and how
          they fail or get broken into.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This site is where that shows up directly: the 3D scene above is hand-built with Three.js
          primitives rather than an imported model, and the toolkit further down is real, working
          software, not a mockup.
        </p>
      </div>
    </section>
  );
}
