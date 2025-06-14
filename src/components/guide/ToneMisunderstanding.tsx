"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  Smile,
  Zap,
  Sparkles,
} from "lucide-react";

/** 말투 케이스 정의 */
type ToneCase = {
  id: string;
  label: string;
  message: string;
  misunderstanding: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGradient: string;
};

/** 컴포넌트 내부에서 바로 사용할 상수 */
const TONE_CASES: ToneCase[] = [
  {
    id: "short",
    label: "짧은 단답",
    message: "ㅇㅋ",
    misunderstanding: `"건성인가…?"`,
    tip: "짧은 답 뒤에 간단한 이유나 이모지 💬를 추가해 보세요.",
    icon: Zap,
    color: "text-orange-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    id: "dot",
    label: "마침표",
    message: "조심히 와.",
    misunderstanding: `"화난 걸까…?"`,
    tip: "마침표 대신 느낌표나 이모지 😊를 사용해 부드럽게 표현해 보세요.",
    icon: AlertTriangle,
    color: "text-red-600",
    bgGradient: "from-red-50 to-pink-50",
  },
  {
    id: "laugh",
    label: "ㅋㅋ/ㅎㅎ 남발",
    message: "그래ㅋㅋㅋ",
    misunderstanding: `"비꼬는 건가…?"`,
    tip: "웃음 표현은 한두 번만! 꼭 필요한 곳에만 사용하면 진심이 전달돼요.",
    icon: Smile,
    color: "text-yellow-600",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    id: "formality",
    label: "존댓↔반말 급변",
    message: "밥 먹었어요? → 뭐 먹었어?",
    misunderstanding: `"갑자기 거리 두거나 친한 척하나…?"`,
    tip: `톤을 바꿀 땐 "편하게 말해도 될까?"처럼 전환을 알리는 한마디를 넣어 주세요.`,
    icon: MessageCircle,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-blue-50",
  },
  {
    id: "delay",
    label: "답장 지연",
    message: "8시간 뒤 미안 ㅠㅠ",
    misunderstanding: `"관심 없나 보다…"`,
    tip: `늦을 것 같으면 먼저 "오늘 바쁠 것 같아, 늦어도 이해해 줘!"라고 알려 주세요.`,
    icon: Clock,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
];

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function ToneMisunderstanding() {
  return (
    <motion.div
      className="mx-auto w-full max-w-4xl p-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* 헤더 섹션 */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <motion.div
          className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 p-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            <Sparkles className="h-6 w-6 text-purple-600" />
          </motion.div>
        </motion.div>
        <motion.h1
          className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent"
          variants={itemVariants}
        >
          💬 말투 오해 방지 가이드
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          variants={itemVariants}
        >
          내가 보낸 메시지, 상대방은 어떻게 받아들일까요?
        </motion.p>
      </motion.div>

      <Tabs defaultValue={TONE_CASES[0].id} className="w-full">
        {/* 탭 트리거 - 더 세련된 디자인 */}
        <motion.div variants={itemVariants}>
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-1 lg:grid-cols-5">
            {TONE_CASES.map(({ id, label, icon: Icon, color }, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TabsTrigger
                  value={id}
                  className="data-[state=active]:border-primary data-[state=active]:bg-primary/5 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-transparent bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 data-[state=active]:shadow-lg"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                  </motion.div>
                  <span className="text-center text-sm leading-tight font-medium">
                    {label}
                  </span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        {/* 탭 콘텐츠 - 더 매력적인 카드 디자인 */}
        <AnimatePresence mode="wait">
          {TONE_CASES.map(
            ({
              id,
              message,
              misunderstanding,
              tip,
              icon: Icon,
              color,
              bgGradient,
            }) => (
              <TabsContent key={id} value={id} className="mt-8">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Card
                    className={`overflow-hidden border-0 bg-gradient-to-br shadow-2xl ${bgGradient} backdrop-blur-sm`}
                  >
                    <CardHeader className="pb-4">
                      <motion.div
                        className="flex items-center gap-3"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div
                          className={`rounded-full bg-white/80 p-3 shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <Icon className={`h-6 w-6 ${color}`} />
                        </motion.div>
                        <div>
                          <motion.h3
                            className="text-xl font-bold text-gray-800"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            실제 보낸 메시지
                          </motion.h3>
                          <motion.p
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            상대방이 받은 그대로
                          </motion.p>
                        </div>
                      </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* 메시지 박스 */}
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="rounded-2xl border border-white/20 bg-white/90 px-6 py-4 shadow-lg backdrop-blur-sm">
                          <motion.p
                            className="text-lg font-medium text-gray-800"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                          >
                            {message}
                          </motion.p>
                        </div>
                        <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-r border-b border-white/20 bg-white/90"></div>
                      </motion.div>

                      {/* 오해 섹션 */}
                      <motion.div
                        className="rounded-2xl border border-red-200/50 bg-white/60 p-6 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            className="rounded-full bg-red-100 p-2"
                            whileHover={{ scale: 1.1 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </motion.div>
                          <div className="flex-1">
                            <motion.h4
                              className="mb-2 font-bold text-red-800"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8, duration: 0.4 }}
                            >
                              상대방의 오해
                            </motion.h4>
                            <motion.p
                              className="text-lg font-medium text-red-700 italic"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9, duration: 0.4 }}
                            >
                              {misunderstanding}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>

                      {/* 팁 섹션 */}
                      <motion.div
                        className="rounded-2xl border border-green-200/50 bg-white/60 p-6 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            className="rounded-full bg-green-100 p-2"
                            whileHover={{ scale: 1.1 }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <Lightbulb className="h-5 w-5 text-green-600" />
                          </motion.div>
                          <div className="flex-1">
                            <motion.h4
                              className="mb-2 font-bold text-green-800"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1, duration: 0.4 }}
                            >
                              💡 개선 팁
                            </motion.h4>
                            <motion.p
                              className="text-base leading-relaxed text-green-700"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2, duration: 0.4 }}
                            >
                              {tip}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ),
          )}
        </AnimatePresence>
      </Tabs>

      {/* 푸터 */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <MessageCircle className="h-5 w-5" />
          </motion.div>
          <span className="font-medium">소통이 더 원활해질 거예요! ✨</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
