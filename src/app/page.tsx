import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Capabilities } from "@/components/Capabilities";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { StatusCard } from "@/components/StatusCard";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  return (
    <>
      {/* Kept even without a navigation bar: it is the only way a keyboard
       * user skips the hero. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <ScrollProgress />
      {/* Sections alternate canvas and band so each boundary is visible
       * without a label announcing it. */}
      <main id="main" className="relative z-10">
        <Hero />
        <Capabilities />
        <Experience />
        <Work />
        <Education />
        <Contact />
      </main>
      <Footer className="relative z-10" />
      <StatusCard />
      <ThemeToggle />
      <Grain />
    </>
  );
}
