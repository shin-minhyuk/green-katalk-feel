"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const SEQUENCES = [
  "그래ㅎㅎ",
  1300,
  "진짜 웃는 걸까, 비꼬는 걸까?",
  2000,
  "그린이가 분석해드립니다.",
  1800,
  "ㅇㅇ 나중에 얘기하자",
  1400,
  "이건 진짜 나중에일까, 그냥 끝일까?",
  2000,
  "그린이가 읽어드릴게요.",
  1800,
  "응. 알겠어.",
  1300,
  "진짜 알겠다는 뜻일까?",
  2000,
  "쎄~한 말투, 분석해드려요.",
  1800,
  "웅웅~^^",
  1200,
  "귀여운 척? 비꼬는 척?",
  2000,
  "AI가 감정의 온도를 측정합니다.",
  1800,
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-54px)] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center bg-gradient-to-b from-green-50 to-white">
      {/* 🌱 그린이 이모지 or 아이콘 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-2 text-green-600 font-semibold text-sm"
      >
        <Bot className="w-5 h-5" />
        연애코치 그린이와 함께하는 감정 분석
      </motion.div>

      {/* 헤드라인 + 애니메이션 */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
      >
        <span className="block mb-1">
          <span className="text-green-600">그린이</span>와 함께
        </span>
        <span className="text-primary">
          <TypeAnimation
            sequence={SEQUENCES}
            wrapper="span"
            speed={40}
            repeat={Infinity}
            deletionSpeed={70}
          />
        </span>
      </motion.h1>

      {/* 설명 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10 max-w-xl text-base text-muted-foreground md:text-lg"
      >
        카카오톡 속 말투, 감정, 뉘앙스까지!
        <br className="hidden md:inline" />
        그린이가 대화 분위기를 읽어드릴게요.
      </motion.p>

      {/* CTA 버튼 */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button size="lg" asChild className="px-8 py-5 text-base">
          <Link href="/analyzer">감정 분석하러 가기</Link>
        </Button>
      </motion.div>
    </section>
  );
}
