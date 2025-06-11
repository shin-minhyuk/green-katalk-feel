"use client";
import { motion } from "framer-motion";

const PREVIEW = [
  {
    label: "빨간불",
    color: "bg-red-500/10 border-red-500",
    convo: "A: ㅇㅋ\nB: ...",
    comment: "이건 위험한 신호예요!",
  },
  {
    label: "노란불",
    color: "bg-yellow-400/10 border-yellow-400",
    convo: "A: 그래^^\nB: ...",
    comment: "주의가 필요해요.",
  },
  {
    label: "초록불",
    color: "bg-green-500/10 border-green-500",
    convo: "A: 좋았어!\nB: 😄",
    comment: "안심해도 좋아요.",
  },
];

export default function PreviewSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="preview">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
        감정 결과 미리보기
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {PREVIEW.map((p) => (
          <motion.div
            key={p.label}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl border p-6 shadow ${p.color}`}
          >
            <h3 className="mb-2 text-xl font-semibold">{p.label}</h3>
            <pre className="mb-4 whitespace-pre-wrap text-sm leading-relaxed">
              {p.convo}
            </pre>
            <p className="font-medium">그린이: {p.comment}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
