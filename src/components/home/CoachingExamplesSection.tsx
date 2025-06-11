// "use client";
// import { motion } from "framer-motion";

// const EXAMPLES = ["ㅇㅋ", "그래^^", "아~ 그렇구나", "ㅇㅇ", "웅 알았어"];

// export default function ExamplesSection() {
//   return (
//     <section className="mx-auto max-w-6xl px-4 py-20" id="examples">
//       <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
//         이런 말, 쎄~하지 않나요?
//       </h2>
//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {EXAMPLES.map((text, idx) => (
//           <motion.div
//             key={text}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: idx * 0.1 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05, y: -5 }}
//             className="group relative cursor-pointer overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:border-primary hover:shadow-lg"
//           >
//             <p className="text-lg font-semibold">{text}</p>
//             <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-secondary/95 px-4 text-sm font-medium text-secondary-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
//               그린이: 이건 노란불이에요!
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";

// const EXAMPLES = [
//   { text: "ㅇㅋ", emoji: "😐" },
//   { text: "그래^^", emoji: "😅" },
//   { text: "아~ 그렇구나", emoji: "🤨" },
//   { text: "ㅇㅇ", emoji: "😶" },
//   { text: "웅 알았어", emoji: "🙂" },
// ];

// export default function ExamplesSection() {
//   return (
//     <section className="mx-auto max-w-6xl px-4 py-20" id="examples">
//       {/* 제목 */}
//       <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
//         이런 말, 쎄~하지 않나요?
//       </h2>

//       {/* 카드 리스트 */}
//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {EXAMPLES.map(({ text, emoji }, idx) => (
//           <motion.div
//             key={text}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: idx * 0.1 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05, rotate: -1 }}
//             className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-tr from-green-50 to-white p-6 text-center shadow hover:shadow-xl hover:ring-2 hover:ring-yellow-300 transition-all"
//           >
//             {/* 대화 예시 + 이모지 */}
//             <p className="text-xl font-bold">
//               {emoji} {text}
//             </p>

//             {/* 그린이 말풍선 */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium shadow-md transition-opacity opacity-0 group-hover:opacity-100">
//               그린이: 이건 노란불이에요!
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";

// const EXAMPLES = [
//   { text: "ㅇㅋ", emoji: "😐" },
//   { text: "그래^^", emoji: "😅" },
//   { text: "아~ 그렇구나", emoji: "🤨" },
//   { text: "ㅇㅇ", emoji: "😶" },
//   { text: "웅 알았어", emoji: "🙂" },
// ];

// export default function ExamplesSection() {
//   return (
//     <section className="mx-auto max-w-3xl px-4 py-20" id="examples">
//       <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
//         이런 말, 쎄~하지 않나요?
//       </h2>

//       <div className="space-y-6">
//         {EXAMPLES.map(({ text, emoji }, idx) => (
//           <motion.div
//             key={text}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: idx * 0.1 }}
//             viewport={{ once: true }}
//             className="space-y-2"
//           >
//             {/* 사용자 메시지 */}
//             <div className="flex justify-end">
//               <div className="rounded-xl bg-gray-200 px-4 py-2 text-sm max-w-[70%]">
//                 {emoji} {text}
//               </div>
//             </div>

//             {/* 그린이 답변 */}
//             <div className="flex justify-start items-center gap-2">
//               <div className="rounded-xl bg-green-100 px-4 py-2 text-sm text-green-800 max-w-[70%] shadow">
//                 그린이: 이건 노란불이에요!
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const EXAMPLES = [
  {
    original: "ㅇㅋ 알겠어",
    suggestion: "오케이! 나중에 얘기해보자 :)",
    comment: "이건 살짝 무심하게 들릴 수 있어요!",
  },
  {
    original: "그래^^",
    suggestion: "고마워~ 진짜 도움 됐어!",
    comment: "이모티콘 조합이 삐딱하게 보일 수 있어요!",
  },
  {
    original: "ㅇㅇ",
    suggestion: "응응! 알았어~ 나중에 또 얘기하자",
    comment: "단답은 오해를 불러일으킬 수 있어요!",
  },
];

export function CoachingExamplesSection() {
  return (
    <section
      className="mx-auto max-w-2xl px-4 py-20 space-y-12"
      id="coaching-examples"
    >
      <h2 className="text-center text-3xl font-bold md:text-4xl mb-6">
        이렇게 말해보는 건 어때요?
      </h2>

      {EXAMPLES.map(({ original, suggestion, comment }, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {/* 잘못된 말 (왼쪽) */}
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl max-w-xs text-sm shadow-sm">
              {original}
            </div>
          </div>

          {/* 그린이 코멘트 (가운데) */}
          <div className="flex items-center justify-center text-xs text-gray-600 gap-2">
            <Bot className="w-4 h-4 text-green-500" />
            <span>{comment}</span>
          </div>

          {/* 추천 말투 (오른쪽) */}
          <div className="flex justify-end">
            <div className="bg-green-100 text-green-900 px-4 py-2 rounded-2xl max-w-xs text-sm shadow-sm">
              {suggestion}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
