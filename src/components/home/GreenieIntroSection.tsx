"use client";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

export function GreenieIntroSection() {
  return (
    <section id="about" className="bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative flex size-48 items-center justify-center rounded-full bg-green-100 shadow-lg dark:bg-green-900/50">
              <Sprout className="size-24 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              나는 연애코치 <span className="text-green-600">그린이</span>예요!
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl md:mx-0">
              카카오톡 대화에 숨어 있는 뉘앙스와 감정 신호를 분석해요.
              <br />
              단어뿐 아니라 문맥과 말투까지 고려해 세밀하게 평가합니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
