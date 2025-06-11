"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
      >
        그린이와 함께
        <br className="hidden md:inline" />
        <span className="text-primary">
          <TypeAnimation
            sequence={["ㅇㅋ 알겠어", 1300, "이게 진짜 알겠다는 뜻일까?", 2000]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
            deletionSpeed={70}
          />
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10 max-w-xl text-base text-muted-foreground md:text-lg"
      >
        카톡 대화 속 감정의 온도를 AI가 읽어줍니다.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button size="lg" asChild>
          <Link href="/analyzer">감정 분석하러 가기</Link>
        </Button>
      </motion.div>
    </section>
  );
}
