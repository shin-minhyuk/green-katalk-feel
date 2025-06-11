"use client";
import { motion } from "framer-motion";

const EXAMPLES = ["ㅇㅋ", "그래^^", "아~ 그렇구나", "ㅇㅇ", "웅 알았어"];

export default function ExamplesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="examples">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
        이런 말, 쎄~하지 않나요?
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {EXAMPLES.map((text) => (
          <motion.div
            key={text}
            whileHover={{ scale: 1.05 }}
            className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-colors hover:border-primary"
          >
            <p className="text-lg font-semibold">{text}</p>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-secondary/95 px-4 text-sm font-medium opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              그린이: 이건 노란불이에요!
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
