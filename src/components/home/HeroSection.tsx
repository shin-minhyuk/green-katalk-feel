"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bot,
  MessageCircle,
  Heart,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

const SEQUENCES = [
  "그래ㅎㅎ",
  1300,
  "진짜 웃는 걸까, 비꼬는 걸까? 🤔",
  2000,
  "그린이가 분석해드립니다! ✨",
  1800,
  "ㅇㅇ 나중에 얘기하자",
  1400,
  "이건 진짜 나중에일까, 그냥 끝일까? 😰",
  2000,
  "그린이가 읽어드릴게요! 💚",
  1800,
  "응. 알겠어.",
  1300,
  "진짜 알겠다는 뜻일까? 🤨",
  2000,
  "쎄~한 말투, 분석해드려요! 🔍",
  1800,
  "웅웅~^^",
  1200,
  "귀여운 척? 비꼬는 척? 😅",
  2000,
  "AI가 감정의 온도를 측정합니다! 🌡️",
  1800,
];

const FLOATING_MESSAGES = [
  { text: "ㅇㅋ", color: "text-red-500", delay: 0 },
  { text: "그래^^", color: "text-yellow-500", delay: 0.5 },
  { text: "좋아!ㅎㅎ", color: "text-green-500", delay: 1 },
  { text: "뭐해?", color: "text-blue-500", delay: 1.5 },
  { text: "응응~", color: "text-purple-500", delay: 2 },
];

const STATS = [
  { icon: Users, value: "10,000+", label: "분석 완료" },
  { icon: Heart, value: "98%", label: "만족도" },
  { icon: TrendingUp, value: "24/7", label: "실시간 분석" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative top-[70px] flex min-h-[calc(100vh-70px)] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-100/30 to-transparent"></div>

      {/* 애니메이션 배경 요소들 */}
      <div>
        {/* 큰 원형 그라데이션들 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200 to-emerald-300 opacity-30 blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 to-purple-300 opacity-20 blur-3xl"
        ></motion.div>

        {/* 떠다니는 메시지들 */}
        {FLOATING_MESSAGES.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [100, -100],
              x: [0, Math.sin(idx) * 50],
            }}
            transition={{
              duration: 8,
              delay: msg.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute text-sm font-medium ${msg.color} pointer-events-none`}
            style={{
              left: `${20 + idx * 15}%`,
              top: "50%",
            }}
          >
            <div className="rounded-full border border-white/50 bg-white/80 px-3 py-1 shadow-lg backdrop-blur-sm">
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 마우스 따라다니는 효과 */}
      <motion.div
        className="pointer-events-none absolute"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="h-32 w-32 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-10 blur-2xl"></div>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* 상단 배지 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 shadow-lg backdrop-blur-sm">
            <div className="relative">
              <Bot className="h-5 w-5 text-green-600" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500"
              ></motion.div>
            </div>
            <span className="text-sm font-semibold text-green-700">
              🌱 연애코치 그린이와 함께하는 감정 분석
            </span>
          </div>
        </motion.div>

        {/* 메인 헤드라인 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
            <span className="mb-2 block">
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                그린이
              </span>
              <span className="text-gray-800">와 함께</span>
            </span>
            <div className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                <TypeAnimation
                  sequence={SEQUENCES}
                  wrapper="span"
                  speed={40}
                  repeat={Number.POSITIVE_INFINITY}
                  deletionSpeed={70}
                />
              </span>
              {/* 커서 효과 */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1 inline-block h-16 w-1 bg-blue-600"
              ></motion.span>
            </div>
          </h1>
        </motion.div>

        {/* 서브 헤드라인 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
        >
          <span className="font-semibold text-gray-800">
            카카오톡 속 말투, 감정, 뉘앙스까지!
          </span>
          <br />
          그린이가 대화의 진짜 의미를 읽어드립니다. 🔍✨
          <br />
          <span className="font-medium text-green-600">
            더 이상 오해하지 마세요!
          </span>
        </motion.p>

        {/* CTA 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-2xl"
          >
            <Link href="/analyzer" className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              감정 분석하러 가기
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-green-200 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:border-green-300 hover:bg-green-50"
          >
            <Link href="/guide" className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              그린이의 눈치코치
            </Link>
          </Button>
        </motion.div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-lg backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-center">
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mb-1 text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 사용자 후기 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-600"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-green-400 to-blue-400 text-xs font-bold text-white"
              >
                {String.fromCharCode(65 + i - 1)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="font-medium">1만+ 사용자가 만족하는 감정 분석</span>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex h-10 w-6 justify-center rounded-full border-2 border-green-400"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="mt-2 h-3 w-1 rounded-full bg-green-400"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
