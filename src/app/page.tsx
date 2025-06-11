import { Header, Footer } from "@/components/common";
import {
  HeroSection,
  CoachingExamplesSection,
  PreviewSection,
  GreenieIntroSection,
  HowItWorksSection,
  ShareSection,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CoachingExamplesSection />
        <PreviewSection />
        <GreenieIntroSection />
        <HowItWorksSection />
        <ShareSection />
      </main>
      <Footer />
    </>
  );
}
