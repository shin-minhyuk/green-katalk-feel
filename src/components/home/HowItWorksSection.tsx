"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  BrainCircuit,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "카카오톡 대화",
    desc: "친구와의 대화 내용을 입력하면",
    longDesc:
      "실제 카카오톡 대화를 복사하여 붙여넣거나 직접 입력하세요. 문맥과 말투가 모두 분석 대상이 됩니다.",
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    iconBg: "from-yellow-400 to-amber-400",
    highlight: "대화 맥락 파악",
    example: "오늘 뭐해? → ㅇㅇ 집이야",
  },
  {
    icon: BrainCircuit,
    title: "AI 감정 분석",
    desc: "GPT 기반 알고리즘이 말투와 맥락을 분석하여",
    longDesc:
      "최신 자연어 처리 기술로 문장의 어조, 단어 선택, 이모티콘 사용 등을 종합적으로 분석합니다.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    iconBg: "from-blue-400 to-indigo-400",
    highlight: "감정 온도 측정",
    example: "감정 강도, 친밀도, 관심도 분석",
  },
  {
    icon: ShieldCheck,
    title: "신호등 판단",
    desc: "빨간불, 노란불, 초록불 중 하나로 감정 온도를 표시",
    longDesc:
      "분석 결과를 바탕으로 대화의 위험도를 직관적인 신호등 색상으로 표시하고 맞춤형 조언을 제공합니다.",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    iconBg: "from-green-400 to-emerald-400",
    highlight: "맞춤형 개선 제안",
    example: "🔴 위험 / 🟡 주의 / 🟢 안전",
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 py-24"
      id="how-it-works"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200 to-green-300 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            어떻게 작동하나요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            그린이 감정분석기는 AI 기술을 활용해 대화의 감정 온도를 분석하고 더
            나은 소통을 돕습니다
          </p>
        </motion.div>

        {/* 프로세스 단계 */}
        <div className="relative">
          {/* 연결선 (데스크탑) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-blue-300 to-green-300 transform -translate-y-1/2 rounded-full"></div>

          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === STEPS.length - 1;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="flex w-full flex-col relative"
                >
                  {/* 단계 번호 */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold z-10">
                    {idx + 1}
                  </div>

                  {/* 카드 */}
                  <div
                    className={`flex h-full flex-col rounded-3xl bg-gradient-to-br ${step.bgColor} border border-white/50 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
                  >
                    {/* 아이콘 */}
                    <div className="mb-6 flex justify-center">
                      <div
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.iconBg} shadow-lg`}
                      >
                        <Icon className="h-10 w-10 text-white" />
                        {/* 빛나는 효과 */}
                        <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-sm"></div>
                      </div>
                    </div>

                    {/* 제목 */}
                    <h3
                      className={`mb-3 text-center text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                    >
                      {step.title}
                    </h3>

                    {/* 짧은 설명 */}
                    <p className="text-center text-gray-700 mb-6">
                      {step.desc}
                    </p>

                    {/* 구분선 */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

                    {/* 긴 설명 */}
                    <p className="text-sm text-gray-600 mb-6 flex-grow">
                      {step.longDesc}
                    </p>

                    {/* 하이라이트 */}
                    <div
                      className={`rounded-xl bg-white/70 p-4 shadow-inner border border-white/80 mb-4`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          핵심 포인트
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        {step.highlight}
                      </p>
                    </div>

                    {/* 예시 */}
                    <div className="bg-white/50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">예시</p>
                      <p className="text-sm text-gray-800">{step.example}</p>
                    </div>

                    {/* 화살표 (모바일) */}
                    {!isLast && (
                      <div className="flex justify-center mt-6 md:hidden">
                        <div className="p-2 bg-white rounded-full shadow-md">
                          <ArrowRight className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 화살표 (데스크탑) */}
                  {!isLast && (
                    <div className="hidden md:flex absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 justify-center items-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.2 + 0.4, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="p-3 bg-white rounded-full shadow-lg"
                      >
                        <ArrowRight className="h-5 w-5 text-blue-500" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <BrainCircuit className="w-5 h-5" />
            <span className="font-semibold">지금 바로 분석해보기</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
