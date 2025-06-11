"use client";
import { motion } from "framer-motion";

export default function GreenieIntroSection() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mb-8 flex size-28 items-center justify-center rounded-full bg-green-500 text-4xl text-white shadow-lg"
      >
        🌱
      </motion.div>
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
        나는 연애코치 <span className="text-green-600">그린이</span>예요!
      </h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        카카오톡 대화에 숨어 있는 뉘앙스와 감정 신호를 분석해요.
        <br />
        단어뿐 아니라 문맥과 말투까지 고려해 세밀하게 평가합니다.
      </p>
    </section>
  );
}
