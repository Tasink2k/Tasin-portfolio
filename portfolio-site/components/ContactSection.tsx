const CONTACT_EMAIL = "tasink898@gmail.com";
const GITHUB_URL = "https://github.com/Tasink2k";
const LINKEDIN_URL = "https://www.linkedin.com/in/tasin-khan-3288a21ab/";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-xl border border-border bg-surface p-10 text-center sm:p-14">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Have a project, a role, or a question?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          The fastest way to reach me is email — I read and reply to everything.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block rounded-md bg-amber px-6 py-3 text-sm font-medium text-base hover:bg-amber-soft"
          >
            Email {CONTACT_EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block rounded-md border border-border px-6 py-3 text-sm font-medium text-ink hover:border-teal"
          >
            View GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block rounded-md border border-border px-6 py-3 text-sm font-medium text-ink hover:border-teal"
          >
            View LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
