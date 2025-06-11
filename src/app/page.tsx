import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ExamplesSection from "@/components/ExamplesSection";
import PreviewSection from "@/components/PreviewSection";
import GreenieIntroSection from "@/components/GreenieIntroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ShareSection from "@/components/ShareSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExamplesSection />
        <PreviewSection />
        <GreenieIntroSection />
        <HowItWorksSection />
        <ShareSection />
      </main>
      <Footer />
    </>
  );
}
