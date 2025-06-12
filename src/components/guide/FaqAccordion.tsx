"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  MessageCircle,
  Shield,
  Lock,
  AlertCircle,
} from "lucide-react";

type FAQ = {
  q: string;
  a: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
};

const FAQS: FAQ[] = [
  {
    q: "GPT는 어떻게 감정을 분석하나요?",
    a: "입력된 텍스트와 상황 정보를 바탕으로 맥락과 말투를 해석해 감정의 온도를 예측합니다. 자연어 처리 기술을 활용해 문장의 구조, 단어 선택, 이모지 사용 등 다양한 요소를 종합적으로 분석합니다.",
    icon: MessageCircle,
    color: "text-purple-600",
    gradient: "from-purple-50 to-indigo-50",
  },
  {
    q: "대화 내용은 저장되나요?",
    a: "비로그인 사용자는 저장되지 않으며, 로그인 사용자의 분석 결과만 DB에 저장됩니다. 모든 데이터는 암호화되어 안전하게 보관되며, 개인정보 보호를 최우선으로 합니다.",
    icon: Lock,
    color: "text-green-600",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    q: "분석이 항상 정확한가요?",
    a: "AI의 판단은 맥락 기반이며 정답은 아닙니다. 참고용으로 사용해 주세요. 문화적 배경, 개인적 관계, 이전 대화 맥락 등에 따라 실제 감정과 차이가 있을 수 있습니다.",
    icon: AlertCircle,
    color: "text-amber-600",
    gradient: "from-amber-50 to-yellow-50",
  },
];

export function FaqAccordion() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* 헤더 섹션 */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 p-2">
          <HelpCircle className="h-6 w-6 text-violet-600" />
        </div>
        <h2 className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          자주 묻는 질문
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
          서비스 이용 중 궁금한 점에 대한 답변을 찾아보세요
        </p>
      </div>

      {/* 아코디언 섹션 */}
      <div className="rounded-3xl border border-gray-100 bg-white/50 p-1 shadow-xl backdrop-blur-sm">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item, i) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={`mb-4 overflow-hidden rounded-2xl border-0 bg-gradient-to-r last:mb-0 ${item.gradient} shadow-sm transition-all duration-300 hover:shadow-md`}
              >
                <AccordionTrigger className="group px-6 py-5 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className={`rounded-full bg-white/80 p-3 shadow-md ${item.color}`}
                    >
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                      {item.q}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-0 pb-6">
                  <div className="pl-16">
                    <div className="rounded-xl border border-gray-100 bg-white/80 p-5 shadow-inner backdrop-blur-sm">
                      <p className="leading-relaxed text-gray-700">{item.a}</p>
                    </div>

                    {/* 추가 액션 버튼 */}
                    <div className="mt-4 flex justify-end">
                      <button className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition-colors hover:text-violet-800">
                        <Shield className="h-4 w-4" />
                        <span>더 알아보기</span>
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* 추가 도움말 섹션 */}
      <div className="mt-10 text-center">
        <p className="text-muted-foreground">더 궁금한 점이 있으신가요?</p>
        <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <MessageCircle className="h-4 w-4" />
          <span className="font-medium">문의하기</span>
        </button>
      </div>
    </section>
  );
}
