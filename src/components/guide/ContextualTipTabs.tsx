"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";

import {
  Heart,
  Briefcase,
  Users,
  MessageSquare,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

type TabKey = "연애" | "직장" | "친구";

type TabConfig = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  bgGradient: string;
  examples: Array<{
    ex: string;
    warn: string;
    severity: "high" | "medium" | "low";
  }>;
};

const TABS: Record<TabKey, TabConfig> = {
  연애: {
    icon: Heart,
    color: "text-pink-600",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    examples: [
      {
        ex: "응~",
        warn: "상대방에게 무성의하게 보일 수 있어요. 감정이 담긴 답변을 해보세요!",
        severity: "high" as const,
      },
      {
        ex: "아 몰라",
        warn: "투정처럼 보여도 진심 전달이 어려워요. 솔직한 마음을 표현해보세요.",
        severity: "medium" as const,
      },
      {
        ex: "ㅇㅋ",
        warn: "너무 간단한 답변은 관심 없어 보일 수 있어요.",
        severity: "medium" as const,
      },
    ],
  },
  직장: {
    icon: Briefcase,
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    examples: [
      {
        ex: "넵.",
        warn: "무조건적인 동의로 보이거나 냉담해 보일 수 있어요. 구체적인 답변을 추가해보세요.",
        severity: "high" as const,
      },
      {
        ex: "확인했습니다",
        warn: "감정 없는 톤으로 긴장감을 유발할 수 있어요. 좀 더 부드럽게 표현해보세요.",
        severity: "medium" as const,
      },
      {
        ex: "알겠습니다",
        warn: "너무 딱딱하게 들릴 수 있어요. 이해했다는 의미를 더 따뜻하게 전달해보세요.",
        severity: "low" as const,
      },
    ],
  },
  친구: {
    icon: Users,
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    examples: [
      {
        ex: "뭐래 ㅋㅋ",
        warn: "친하다고 해도 선을 넘는 표현이 될 수 있어요. 상대방 기분을 고려해보세요.",
        severity: "high" as const,
      },
      {
        ex: "ㄱㅇㄷ",
        warn: "상대가 못 알아들을 수도 있어요. 명확한 표현을 사용해보세요.",
        severity: "medium" as const,
      },
      {
        ex: "ㅇㅇ",
        warn: "너무 성의 없어 보일 수 있어요. 조금 더 정성스럽게 답해보세요.",
        severity: "low" as const,
      },
    ],
  },
};

const getSeverityColor = (severity: "high" | "medium" | "low") => {
  switch (severity) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200";
    case "medium":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "low":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
  }
};

const getSeverityIcon = (severity: "high" | "medium" | "low") => {
  switch (severity) {
    case "high":
      return "🚨";
    case "medium":
      return "⚠️";
    case "low":
      return "💡";
  }
};

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const tabVariants = {
  inactive: {
    scale: 1,
    opacity: 0.8,
  },
  active: {
    scale: 1.05,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const exampleCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const warningVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};

export function ContextualTipTabs() {
  const [active, setActive] = useState<TabKey>("연애");
  const activeConfig = TABS[active];

  return (
    <motion.section
      className="mx-auto max-w-5xl px-6 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* 헤더 섹션 */}
      <motion.div className="mb-12 text-center" variants={itemVariants}>
        <motion.div
          className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 p-2"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          >
            <Sparkles className="h-6 w-6 text-purple-600" />
          </motion.div>
        </motion.div>
        <motion.h2
          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
          variants={itemVariants}
        >
          상황별 감정 눈치 팁
        </motion.h2>
        <motion.p
          className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg"
          variants={itemVariants}
        >
          관계별로 다른 소통 방식, 상황에 맞는 말투를 알아보세요
        </motion.p>
      </motion.div>

      {/* 탭 버튼들 */}
      <motion.div
        className="mb-10 flex justify-center gap-2"
        variants={itemVariants}
      >
        {Object.entries(TABS).map(([tab, config]) => {
          const Icon = config.icon;
          const isActive = active === tab;

          return (
            <motion.button
              key={tab}
              onClick={() => setActive(tab as TabKey)}
              className={`relative flex min-w-[120px] items-center justify-center gap-3 rounded-2xl px-6 py-4 font-semibold transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                  : "border border-gray-200 bg-white/60 text-gray-600 backdrop-blur-sm hover:bg-white/80"
              } `}
              variants={tabVariants}
              initial="inactive"
              animate={isActive ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              layout
            >
              <motion.div
                animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-white" : config.color}`}
                />
              </motion.div>
              <span>{tab}</span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-white"
                  layoutId="activeIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* 콘텐츠 영역 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={`bg-gradient-to-br ${activeConfig.bgGradient} rounded-3xl border border-white/20 p-8 shadow-xl backdrop-blur-sm`}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          <motion.div
            className="mb-8 flex items-center gap-3"
            variants={itemVariants}
          >
            <motion.div
              className={`rounded-full bg-white/80 p-3 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <activeConfig.icon className={`h-6 w-6 ${activeConfig.color}`} />
            </motion.div>
            <div>
              <motion.h3
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {active} 상황에서
              </motion.h3>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                이런 표현들을 조심해보세요
              </motion.p>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {activeConfig.examples.map((item, idx) => (
              <motion.div
                key={`${active}-${idx}`}
                className="rounded-2xl border border-white/30 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
                variants={exampleCardVariants}
                custom={idx}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* 예시 메시지 */}
                <div className="mb-4">
                  <motion.div
                    className="mb-3 flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: idx * 0.5,
                      }}
                    >
                      <MessageSquare className="h-5 w-5 text-gray-500" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-500">
                      예시 메시지
                    </span>
                  </motion.div>
                  <div className="relative">
                    <motion.div
                      className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4"
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      <p className="text-lg font-semibold text-gray-800">
                        &quot;{item.ex}&quot;
                      </p>
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-r border-b border-gray-200 bg-gray-100"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 45 }}
                      transition={{ delay: idx * 0.1 + 0.4, duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* 경고 메시지 */}
                <motion.div
                  className={`rounded-xl border p-4 ${getSeverityColor(item.severity)}`}
                  variants={warningVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.1 + 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      className="text-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: idx * 0.3,
                      }}
                    >
                      {getSeverityIcon(item.severity)}
                    </motion.span>
                    <div className="flex-1">
                      <motion.div
                        className="mb-1 flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.6, duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: idx * 0.2,
                          }}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </motion.div>
                        <span className="text-sm font-semibold">주의사항</span>
                      </motion.div>
                      <motion.p
                        className="text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.7, duration: 0.4 }}
                      >
                        {item.warn}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* 추가 팁 섹션 */}
          <motion.div
            className="mt-8 rounded-2xl border border-white/30 bg-white/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="mb-3 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.div
                className="rounded-full bg-blue-100 p-2"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-5 w-5 text-blue-600" />
              </motion.div>
              <h4 className="font-bold text-gray-800">
                💡 {active} 관계에서의 소통 팁
              </h4>
            </motion.div>
            <motion.p
              className="leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              {active === "연애" &&
                "감정을 솔직하게 표현하되, 상대방의 기분을 배려하는 따뜻한 말투를 사용해보세요."}
              {active === "직장" &&
                "전문적이면서도 친근한 톤을 유지하고, 명확하고 정중한 표현을 사용해보세요."}
              {active === "친구" &&
                "친밀감을 표현하되 상대방이 불편하지 않을 선에서 자연스럽게 소통해보세요."}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
