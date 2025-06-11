// "use client";
// import { motion } from "framer-motion";
// import { ShieldX, ShieldAlert, ShieldCheck } from "lucide-react";

// const PREVIEW = [
//   {
//     label: "빨간불",
//     color: "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400",
//     icon: ShieldX,
//     convo: "A: ㅇㅋ\nB: (읽씹)",
//     comment:
//       "상대방이 불쾌함을 느꼈을 가능성이 높아요. 즉시 대화를 중단하고 사과하는 것을 고려해보세요.",
//   },
//   {
//     label: "노란불",
//     color:
//       "bg-yellow-400/10 border-yellow-400 text-yellow-700 dark:text-yellow-400",
//     icon: ShieldAlert,
//     convo: "A: 그래^^\nB: 응.",
//     comment:
//       "오해의 소지가 있는 말투예요. 관계에 따라 부정적으로 해석될 수 있으니 주의가 필요해요.",
//   },
//   {
//     label: "초록불",
//     color:
//       "bg-green-500/10 border-green-500 text-green-700 dark:text-green-500",
//     icon: ShieldCheck,
//     convo: "A: 너무 좋았어!ㅎㅎ\nB: 나도! 다음에 또 가자😄",
//     comment:
//       "긍정적인 분위기네요! 상대방도 즐거워하고 있어요. 안심하고 대화를 이어가세요.",
//   },
// ];

// export default function PreviewSection() {
//   return (
//     <section className="bg-muted/50 dark:bg-muted/20" id="preview">
//       <div className="mx-auto max-w-6xl px-4 py-20">
//         <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
//           감정 결과 미리보기
//         </h2>
//         <div className="grid gap-6 md:grid-cols-3">
//           {PREVIEW.map((p, i) => {
//             const Icon = p.icon;
//             return (
//               <motion.div
//                 key={p.label}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 initial={{ opacity: 0, y: 30 }}
//                 transition={{ duration: 0.5, delay: i * 0.15 }}
//                 viewport={{ once: true }}
//                 className={`flex flex-col rounded-xl border p-6 shadow-sm ${p.color}`}
//               >
//                 <div className="mb-4 flex items-center gap-3">
//                   <Icon className="size-7" />
//                   <h3 className="text-xl font-semibold">{p.label}</h3>
//                 </div>
//                 <blockquote className="mb-4 border-l-4 pl-4 text-sm italic leading-relaxed">
//                   {p.convo.split("\n").map((line, idx) => (
//                     <p key={idx}>{line}</p>
//                   ))}
//                 </blockquote>
//                 <div>
//                   <p className="font-semibold">그린이의 한줄평</p>
//                   <p className="text-sm opacity-90">{p.comment}</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquareQuote,
} from "lucide-react";

const PREVIEW = [
  {
    signal: "빨간불",
    reason:
      "‘ㅇㅋ 알겠어’는 단답으로 감정을 차단한 인상을 줄 수 있어요. 특히 썸 상황에서는 차가워 보일 수 있습니다.",
    greenie_comment:
      "지금은 빨간불이에요. 상대방 기분이 상했을 수 있어요. 잠깐 멈추고 톤을 바꿔보는 게 좋아요.",
    suggested_reply:
      "어제 좀 무뚝뚝했지? 미안해. 기분 상했다면 진심으로 사과할게.",
    icon: XCircle,
    color: "border-red-500 text-red-700 bg-red-50",
  },
  {
    signal: "노란불",
    reason:
      "‘그래^^’는 맥락에 따라 쎄한 인상을 줄 수 있어요. 상대방이 진심인지 헷갈릴 수 있죠.",
    greenie_comment:
      "지금은 노란불이에요. 마음은 있지만 표현이 부족했을 수 있어요. 부드럽게 먼저 다가가보는 건 어때요?",
    suggested_reply:
      "아까 “그래^^”는 좀 쎄했지? 미안해~ 진짜 고마운 마음이었어 😅",
    icon: AlertCircle,
    color: "border-yellow-400 text-yellow-700 bg-yellow-50",
  },
  {
    signal: "초록불",
    reason:
      "“너무 좋았어!ㅎㅎ”는 진심이 담긴 긍정 표현이에요. 상대방도 기분 좋게 받아들였을 가능성이 높아요.",
    greenie_comment:
      "지금은 초록불이에요! 분위기 아주 좋아요. 지금 이 흐름을 자연스럽게 이어가보세요 😄",
    suggested_reply: "나도 진짜 좋았어~ 다음엔 더 재밌게 놀자!",
    icon: CheckCircle,
    color: "border-green-500 text-green-700 bg-green-50",
  },
];

export function PreviewSection() {
  return (
    <section className="bg-muted/50 dark:bg-muted/20" id="preview">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          감정 결과 미리보기
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {PREVIEW.map((result, i) => {
            const Icon = result.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col justify-between rounded-2xl border p-6 shadow-md ${result.color} transition`}
              >
                {/* 헤더 */}
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">{result.signal}</h3>
                </div>

                {/* 분석 요약 */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1 text-gray-700">
                    분석 요약
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {result.reason}
                  </p>
                </div>

                {/* 그린이 코멘트 */}
                <div className="mb-4 bg-white/70 backdrop-blur px-4 py-3 rounded-lg shadow-sm border-l-4 border-green-400">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    🌱 그린이의 코멘트
                  </p>
                  <p className="text-sm mt-1">{result.greenie_comment}</p>
                </div>

                {/* 추천 멘트 */}
                <div className="bg-white border rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-100 shadow-sm flex items-start gap-2">
                  <MessageSquareQuote className="w-4 h-4 mt-1 text-gray-400" />
                  <span>
                    <strong>추천 멘트:</strong> {result.suggested_reply}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
