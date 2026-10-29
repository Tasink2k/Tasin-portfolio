import type { Metadata } from "next";
import React, { type ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasin — Software Engineering & Cybersecurity",
  description:
    "Personal portfolio and workbench: systems programming, competitive C++, cybersecurity/DFIR, and a live interactive toolkit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-base font-body text-ink antialiased">{children}</body>
    </html>
  );
}
