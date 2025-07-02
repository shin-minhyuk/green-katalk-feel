import { AnalyzerQuestionnaire } from "@/components/analyzer/AnalyzerQuestionnaire";
import { Footer, Header } from "@/components/common";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대화 분석하기 - 그리니",
  description:
    "분석하고 싶은 카카오톡, 인스타 DM 대화를 붙여넣고 AI 분석을 시작하세요. 관계, 목적, 상황을 설정하여 더 정확한 분석 결과를 받아볼 수 있습니다.",
  openGraph: {
    title: "대화 분석하기 - 그리니",
    description: "카톡 대화를 붙여넣고 AI로 상대방의 감정을 분석해보세요.",
  },
};

export default function AnalyzerPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <AnalyzerQuestionnaire />
      </main>
      <Footer />
    </>
  );
}
