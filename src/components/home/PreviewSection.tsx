"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquareQuote,
  Bot,
  Lightbulb,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react";

const PREVIEW = [
  {
    signal: "빨간불",
    level: "위험",
    reason:
      "'ㅇㅋ 알겠어'는 단답으로 감정을 차단한 인상을 줄 수 있어요. 특히 썸 상황에서는 차가워 보일 수 있습니다.",
    greenie_comment:
      "지금은 빨간불이에요. 상대방 기분이 상했을 수 있어요. 잠깐 멈추고 톤을 바꿔보는 게 좋아요.",
    suggested_reply:
      "어제 좀 무뚝뚝했지? 미안해. 기분 상했다면 진심으로 사과할게.",
    icon: XCircle,
    color: "border-red-500 text-red-700 bg-red-50",
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-50 to-pink-50",
    glowColor: "shadow-red-200",
    percentage: 85,
  },
  {
    signal: "노란불",
    level: "주의",
    reason:
      "'그래^^'는 맥락에 따라 쎄한 인상을 줄 수 있어요. 상대방이 진심인지 헷갈릴 수 있죠.",
    greenie_comment:
      "지금은 노란불이에요. 마음은 있지만 표현이 부족했을 수 있어요. 부드럽게 먼저 다가가보는 건 어때요?",
    suggested_reply:
      "아까 그래^^는 좀 쎄했지? 미안해~ 진짜 고마운 마음이었어 😅",
    icon: AlertCircle,
    color: "border-yellow-400 text-yellow-700 bg-yellow-50",
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-50 to-orange-50",
    glowColor: "shadow-yellow-200",
    percentage: 60,
  },
  {
    signal: "초록불",
    level: "안전",
    reason:
      "'너무 좋았어!ㅎㅎ'는 진심이 담긴 긍정 표현이에요. 상대방도 기분 좋게 받아들였을 가능성이 높아요.",
    greenie_comment:
      "지금은 초록불이에요! 분위기 아주 좋아요. 지금 이 흐름을 자연스럽게 이어가보세요 😄",
    suggested_reply: "나도 진짜 좋았어~ 다음엔 더 재밌게 놀자!",
    icon: CheckCircle,
    color: "border-green-500 text-green-700 bg-green-50",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    glowColor: "shadow-green-200",
    percentage: 92,
  },
];

const getSignalEmoji = (signal: string) => {
  switch (signal) {
    case "빨간불":
      return "🔴";
    case "노란불":
      return "🟡";
    case "초록불":
      return "🟢";
    default:
      return "⚪";
  }
};

export function PreviewSection() {
  return (
    <section
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
      id="preview"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            감정 결과 미리보기
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            AI가 분석한 감정 신호등으로 대화의 온도를 한눈에 확인하세요
          </p>
        </motion.div>

        {/* 신호등 표시 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <div className="rounded-full bg-gray-800 p-4 shadow-2xl">
            <div className="flex flex-col gap-3">
              {["🔴", "🟡", "🟢"].map((emoji, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: idx * 0.7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="flex h-8 w-8 items-center justify-center text-2xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 결과 카드들 */}
        <div className="grid gap-8 lg:grid-cols-3">
          {PREVIEW.map((result, i) => {
            const Icon = result.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${result.bgGradient} border border-white/20 shadow-xl ${result.glowColor} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
              >
                {/* 배경 패턴 */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                {/* 글로우 효과 */}
                <div
                  className={`absolute -top-40 -right-40 h-80 w-80 bg-gradient-to-br ${result.gradient} rounded-full opacity-10 transition-opacity duration-500 group-hover:opacity-20`}
                ></div>

                <div className="relative p-8">
                  {/* 헤더 */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full bg-gradient-to-r p-3 ${result.gradient} shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {getSignalEmoji(result.signal)}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800">
                            {result.signal}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          {result.level} 단계
                        </p>
                      </div>
                    </div>

                    {/* 퍼센티지 표시 */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">
                        {result.percentage}%
                      </div>
                      <div className="text-xs text-gray-600">신뢰도</div>
                    </div>
                  </div>

                  {/* 분석 요약 */}
                  <div className="mb-6 rounded-2xl border border-white/30 bg-white/60 p-5 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-bold text-gray-800">
                        분석 요약
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {result.reason}
                    </p>
                  </div>

                  {/* 그린이 코멘트 */}
                  <div className="mb-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-full bg-green-500 p-1.5">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-bold text-green-800">
                        🌱 그린이의 코멘트
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-green-700">
                      {result.greenie_comment}
                    </p>
                  </div>

                  {/* 추천 멘트 */}
                  <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-inner backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-full bg-purple-500 p-1.5">
                        <Lightbulb className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-bold text-purple-800">
                        💡 추천 멘트
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquareQuote className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <p className="text-sm leading-relaxed text-gray-700 italic">
                        &quot;{result.suggested_reply}&quot;
                      </p>
                    </div>
                  </div>

                  {/* 하단 액션 */}
                  <div className="mt-6 flex justify-center">
                    <button
                      className={`inline-flex items-center gap-2 bg-gradient-to-r px-4 py-2 ${result.gradient} rounded-full text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    >
                      <Heart className="h-4 w-4" />
                      <span>이 톤으로 대화하기</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">내 메시지 감정 온도 측정하기</span>
            <span className="text-xl">🌡️</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
