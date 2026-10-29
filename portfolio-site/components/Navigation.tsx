"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const GITHUB_URL = "https://github.com/Tasink2k";
const LINKEDIN_URL = "https://www.linkedin.com/in/tasin-khan-3288a21ab/";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-base/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg text-ink">
          Tasin
        </a>

        <ul className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-base transition-colors hover:bg-amber-soft"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-ink transition-transform",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span className={cn("h-0.5 w-6 bg-ink transition-opacity", open && "opacity-0")} />
          <span
            className={cn(
              "h-0.5 w-6 bg-ink transition-transform",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-4 sm:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-ink hover:bg-surface-raised"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-ink hover:bg-surface-raised"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-ink hover:bg-surface-raised"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
