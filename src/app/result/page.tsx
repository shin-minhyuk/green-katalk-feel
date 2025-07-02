import { Footer, Header } from "@/components/common";
import { ResultClient } from "@/components/result/ResultClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AI 대화 분석 결과 - 그리니",
  description:
    "AI가 분석한 대화의 감정 신호, 상세 분석, 추천 답장을 확인해보세요.",
  openGraph: {
    title: "AI 대화 분석 결과 - 그리니",
    description: "AI가 분석한 당신의 대화, 지금 바로 확인해보세요!",
  },
  // 검색 결과에 노출되지 않도록 설정 (개인 결과 페이지이므로)
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<ResultLoading />}>
          <ResultClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function ResultLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
        <div className="flex animate-pulse flex-col space-y-8 rounded-2xl border-0 bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-xl bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-1/3 rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-1/3 rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-4/6 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-1/4 rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
