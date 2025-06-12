"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";

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

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export function FaqAccordion() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <motion.section
      className="mx-auto max-w-4xl px-6 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* 헤더 섹션 */}
      <motion.div className="mb-12 text-center" variants={itemVariants}>
        <motion.div
          className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 p-2"
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
            <HelpCircle className="h-6 w-6 text-violet-600" />
          </motion.div>
        </motion.div>
        <motion.h2
          className="mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
          variants={itemVariants}
        >
          자주 묻는 질문
        </motion.h2>
        <motion.p
          className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg"
          variants={itemVariants}
        >
          서비스 이용 중 궁금한 점에 대한 답변을 찾아보세요
        </motion.p>
      </motion.div>

      {/* 아코디언 섹션 */}
      <motion.div
        className="rounded-3xl border border-gray-100 bg-white/50 p-1 shadow-xl backdrop-blur-sm"
        variants={itemVariants}
      >
        <Accordion type="multiple" value={openItems} className="w-full">
          {FAQS.map((item, i) => {
            const Icon = item.icon;
            const isOpen = openItems.includes(`faq-${i}`);

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className={`mb-4 overflow-hidden rounded-2xl border-0 bg-gradient-to-r last:mb-0 ${item.gradient} shadow-sm transition-all duration-300 hover:shadow-md`}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <AccordionTrigger
                      onClick={() => handleToggle(`faq-${i}`)}
                      className="group px-6 py-5 hover:no-underline"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <motion.div
                          className={`rounded-full bg-white/80 p-3 shadow-md ${item.color}`}
                          variants={iconVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                        >
                          <Icon className={`h-5 w-5 ${item.color}`} />
                        </motion.div>
                        <motion.h3
                          className="text-lg font-semibold text-gray-800 group-hover:text-gray-900"
                          layout
                        >
                          {item.q}
                        </motion.h3>
                      </div>
                    </AccordionTrigger>
                  </motion.div>
                  <AnimatePresence>
                    {isOpen && (
                      <AccordionContent forceMount>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-6 pb-6"
                        >
                          <div className="pl-16">
                            <motion.div
                              className="rounded-xl border border-gray-100 bg-white/80 p-5 shadow-inner backdrop-blur-sm"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.4 }}
                            >
                              <motion.p
                                className="leading-relaxed text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                              >
                                {item.a}
                              </motion.p>
                            </motion.div>

                            {/* 추가 액션 버튼 */}
                            <motion.div
                              className="mt-4 flex justify-end"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                            >
                              <motion.button
                                className={`inline-flex items-center gap-1 text-sm font-medium ${item.color} hover:${item.color.replace("-600", "-800")} transition-colors`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.div
                                  variants={pulseVariants}
                                  animate="pulse"
                                >
                                  <Shield className="h-4 w-4" />
                                </motion.div>
                                <span>더 알아보기</span>
                              </motion.button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </AccordionContent>
                    )}
                  </AnimatePresence>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </motion.div>

      {/* 추가 도움말 섹션 */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.p className="text-muted-foreground" variants={itemVariants}>
          더 궁금한 점이 있으신가요?
        </motion.p>
        <motion.button
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-white shadow-lg"
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
            <MessageCircle className="h-4 w-4" />
          </motion.div>
          <span className="font-medium">문의하기</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
