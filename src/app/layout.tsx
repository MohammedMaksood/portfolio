import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono, Caveat } from "next/font/google";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/* Handwriting, used only on the hero sticky notes. */
const hand = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-hand",
});

const pageTitle = `${profile.name}, ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: profile.tagline,
  keywords: [
    "AI Engineer",
    "RAG",
    "Retrieval Augmented Generation",
    "LLM Orchestration",
    "Multi-Agent Systems",
    "Machine Learning",
    "Python",
    "Django",
    "Qdrant",
    "Chennai",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: pageTitle,
    description: profile.tagline,
    siteName: pageTitle,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
  /* Declared through the Metadata API rather than as a <link> in a custom
   * <head>, so nothing this file renders lands in the head at all. */
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230d0d0c'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-size='17' fill='%23c8b99a' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
    { media: "(prefers-color-scheme: light)", color: "#f7f4ec" },
  ],
};

/**
 * Applies the stored theme before first paint so the page never flashes
 * the wrong palette. Dark is the default when nothing is stored.
 */
const noFlashTheme = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.formalName,
  alternateName: profile.name,
  jobTitle: profile.title,
  description: profile.tagline,
  url: siteUrl,
  email: `mailto:${profile.links.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressCountry: "IN",
  },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: [
    "Retrieval Augmented Generation",
    "Large Language Models",
    "Multi-Agent Systems",
    "Applied Machine Learning",
    "Natural Language Processing",
    "Vector Databases",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${display.variable} ${mono.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      {/* Nothing is rendered into <head> on purpose.
        *
        * Browser extensions commonly inject a <script> there before React
        * hydrates. Any element this file put in the head would then be
        * compared against the extension's node and report a hydration
        * mismatch. With no head children of our own, there is nothing for an
        * injected node to shift.
        *
        * The theme script still runs before any content paints, because it
        * is the first thing in the body and is synchronous. The JSON-LD is
        * equally valid in the body; search engines read it from either. */}
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
