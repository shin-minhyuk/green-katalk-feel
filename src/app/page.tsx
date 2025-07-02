import { Header, Footer } from "@/components/common";
import {
  HeroSection,
  CoachingExamplesSection,
  PreviewSection,
  GreenieIntroSection,
  HowItWorksSection,
  ShareSection,
} from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "그리니 - 카톡 대화 감정 분석 AI",
  description:
    "카카오톡, 인스타 DM 대화를 분석하여 상대방의 속마음과 감정을 알아보세요. 연애, 썸, 친구, 동료와의 관계 개선을 위한 AI 감정 분석 솔루션입니다.",
  openGraph: {
    title: "그리니 - 카톡 대화 감정 분석 AI",
    description: "AI로 카톡 대화 속 숨은 감정을 파악하고 관계를 개선하세요.",
    images: [
      {
        url: "/og-image.png", // OG 이미지는 public 폴더에 위치해야 합니다.
        width: 1200,
        height: 630,
        alt: "그리니 AI 서비스 소개",
      },
    ],
    siteName: "그리니",
    locale: "ko_KR",
    type: "website",
  },
};

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
