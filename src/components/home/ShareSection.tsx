"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Link, Download } from "lucide-react";

export function ShareSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center" id="share">
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">
        친구도 감정 분석 해보게 알려주세요!
      </h2>
      <p className="text-muted-foreground mb-10">
        재미있는 결과가 나왔다면 공유 버튼으로 바로 퍼가세요 🚀
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Button variant="secondary">
          <Send className="mr-2 size-4" />
          카카오로 공유
        </Button>
        <Button variant="outline">
          <Link className="mr-2 size-4" />
          링크 복사
        </Button>
        <Button variant="ghost">
          <Download className="mr-2 size-4" />
          이미지 다운로드
        </Button>
      </motion.div>
    </section>
  );
}
