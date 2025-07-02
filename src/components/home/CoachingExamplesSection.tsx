"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react";

const EXAMPLES = [
  {
    original: "ㅇㅋ 알겠어",
    suggestion: "오케이! 나중에 얘기해보자 :)",
    comment: "이건 살짝 무심하게 들릴 수 있어요!",
    severity: "medium" as const,
    category: "단답형",
  },
  {
    original: "그래^^",
    suggestion: "고마워~ 진짜 도움 됐어!",
    comment: "이모티콘 조합이 삐딱하게 보일 수 있어요!",
    severity: "high" as const,
    category: "이모티콘",
  },
  {
    original: "ㅇㅇ",
    suggestion: "응응! 알았어~ 나중에 또 얘기하자",
    comment: "단답은 오해를 불러일으킬 수 있어요!",
    severity: "high" as const,
    category: "단답형",
  },
];

const getSeverityColor = (severity: "high" | "medium" | "low") => {
  switch (severity) {
    case "high":
      return "text-red-600 bg-red-50";
    case "medium":
      return "text-orange-600 bg-orange-50";
    case "low":
      return "text-yellow-600 bg-yellow-50";
  }
};

const getSeverityIcon = (severity: "high" | "medium" | "low") => {
  switch (severity) {
    case "high":
      return AlertTriangle;
    case "medium":
      return MessageCircle;
    case "low":
      return ThumbsUp;
  }
};

export function CoachingExamplesSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20" id="coaching-examples">
      {/* 헤더 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-2">
          <Sparkles className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          이렇게 말해보는 건 어때요?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          그린이가 분석한 감정 온도를 바탕으로 더 따뜻한 소통 방법을
          제안해드려요
        </p>
      </motion.div>

      {/* 예시들 */}
      <div className="space-y-12">
        {EXAMPLES.map(
          ({ original, suggestion, comment, severity, category }, idx) => {
            const SeverityIcon = getSeverityIcon(severity);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
              >
                {/* 카테고리 태그 */}
                <div className="mb-6 flex justify-center">
                  <span className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-medium text-white">
                    {category} 개선 사례
                  </span>
                </div>

                {/* 대화 영역 */}
                <div className="space-y-6">
                  {/* 원본 메시지 (왼쪽) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 + 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-start"
                  >
                    <div className="relative max-w-xs">
                      <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 text-gray-800 shadow-sm">
                        <p className="font-medium">{original}</p>
                      </div>
                      <div className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-r border-b border-gray-200 bg-gray-100"></div>
                    </div>
                  </motion.div>

                  {/* AI 코멘트 (가운데) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`flex items-center gap-3 rounded-full px-4 py-3 ${getSeverityColor(severity)} border border-current/20`}
                    >
                      <div className="rounded-full bg-white/80 p-1.5">
                        <Bot
                          className={`h-4 w-4 ${getSeverityColor(severity)}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{comment}</span>
                      <SeverityIcon className="h-4 w-4" />
                    </div>
                  </motion.div>

                  {/* 화살표 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3 shadow-lg">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </motion.div>

                  {/* 개선된 메시지 (오른쪽) */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    className="flex justify-end"
                  >
                    <div className="relative max-w-xs">
                      <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-100 to-emerald-50 px-6 py-4 text-green-900 shadow-sm">
                        <p className="font-medium">{suggestion}</p>
                      </div>
                      <div className="absolute right-4 -bottom-2 h-4 w-4 rotate-45 border-r border-b border-green-200 bg-green-100"></div>
                    </div>
                  </motion.div>
                </div>

                {/* 개선 포인트 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">
                      개선 포인트
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-blue-700">
                    {idx === 0 &&
                      "감정을 더 구체적으로 표현하고 이모지를 활용해 친근함을 더했어요."}
                    {idx === 1 &&
                      "진심이 담긴 감사 표현으로 바꿔 오해의 소지를 줄였어요."}
                    {idx === 2 &&
                      "단답 대신 대화를 이어갈 수 있는 표현을 추가했어요."}
                  </p>
                </motion.div>
              </motion.div>
            );
          },
        )}
      </div>

      {/* 하단 CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">내 메시지도 분석해보기</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  );
}
