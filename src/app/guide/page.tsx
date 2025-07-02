import { Footer, Header } from "@/components/common";
import {
  ContextualTipTabs,
  FaqAccordion,
  ToneMisunderstanding,
} from "@/components/guide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "그리니 이용안내",
  description:
    "그리니 AI 감정 분석 서비스의 사용 방법, 개인정보 처리 방침, 자주 묻는 질문(FAQ)을 안내합니다.",
  openGraph: {
    title: "그리니 이용안내",
    description: "그리니 서비스 사용에 대한 모든 것을 알아보세요.",
  },
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className="mt-[70px] min-h-[calc(100vh-70px)] bg-gray-50">
        <ToneMisunderstanding />
        <ContextualTipTabs />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
