"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: "💬",
    title: "카카오톡 대화",
    desc: "친구와의 대화 내용을 입력하면",
  },
  {
    icon: "🧠",
    title: "AI 감정 분석",
    desc: "GPT 기반 알고리즘이 말투와 맥락을 분석하여",
  },
  {
    icon: "🚦",
    title: "신호등 판단",
    desc: "빨간불, 노란불, 초록불 중 하나로 감정 온도를 표시",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="how-it-works">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        어떻게 작동하나요?
      </h2>
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        {STEPS.map((s, idx) => {
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex w-full max-w-sm flex-col items-center gap-4 text-center"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-3xl">
                {s.icon}
              </span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
