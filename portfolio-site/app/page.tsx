import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { ToolkitSection } from "@/components/ToolkitSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <WorkSection />
      <ToolkitSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
