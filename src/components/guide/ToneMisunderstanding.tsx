"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  Smile,
  Zap,
} from "lucide-react";

/** 말투 케이스 정의 */
type ToneCase = {
  id: string;
  label: string;
  message: string;
  misunderstanding: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGradient: string;
};

/** 컴포넌트 내부에서 바로 사용할 상수 */
const TONE_CASES: ToneCase[] = [
  {
    id: "short",
    label: "짧은 단답",
    message: "ㅇㅋ",
    misunderstanding: `"건성인가…?"`,
    tip: "짧은 답 뒤에 간단한 이유나 이모지 💬를 추가해 보세요.",
    icon: Zap,
    color: "text-orange-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    id: "dot",
    label: "마침표",
    message: "조심히 와.",
    misunderstanding: `"화난 걸까…?"`,
    tip: "마침표 대신 느낌표나 이모지 😊를 사용해 부드럽게 표현해 보세요.",
    icon: AlertTriangle,
    color: "text-red-600",
    bgGradient: "from-red-50 to-pink-50",
  },
  {
    id: "laugh",
    label: "ㅋㅋ/ㅎㅎ 남발",
    message: "그래ㅋㅋㅋ",
    misunderstanding: `"비꼬는 건가…?"`,
    tip: "웃음 표현은 한두 번만! 꼭 필요한 곳에만 사용하면 진심이 전달돼요.",
    icon: Smile,
    color: "text-yellow-600",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    id: "formality",
    label: "존댓↔반말 급변",
    message: "밥 먹었어요? → 뭐 먹었어?",
    misunderstanding: `"갑자기 거리 두거나 친한 척하나…?"`,
    tip: `톤을 바꿀 땐 "편하게 말해도 될까?"처럼 전환을 알리는 한마디를 넣어 주세요.`,
    icon: MessageCircle,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-blue-50",
  },
  {
    id: "delay",
    label: "답장 지연",
    message: `8시간 뒤 "미안 ㅠㅠ"`,
    misunderstanding: `"관심 없나 보다…"`,
    tip: `늦을 것 같으면 먼저 "오늘 바쁠 것 같아, 늦어도 이해해 줘!"라고 알려 주세요.`,
    icon: Clock,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
];

export function ToneMisunderstanding() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-purple-50 to-white">
      <div className="w-full max-w-4xl mx-auto p-6 ">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            💬 말투 오해 방지 가이드
          </h1>
          <p className="text-muted-foreground text-lg">
            내가 보낸 메시지, 상대방은 어떻게 받아들일까요?
          </p>
        </div>

        <Tabs defaultValue={TONE_CASES[0].id} className="w-full">
          {/* 탭 트리거 - 더 세련된 디자인 */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-transparent h-auto p-1">
            {TONE_CASES.map(({ id, label, icon: Icon, color }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-md bg-white/50 backdrop-blur-sm"
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-sm font-medium text-center leading-tight">
                  {label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 탭 콘텐츠 - 더 매력적인 카드 디자인 */}
          {TONE_CASES.map(
            ({
              id,
              message,
              misunderstanding,
              tip,
              icon: Icon,
              color,
              bgGradient,
            }) => (
              <TabsContent key={id} value={id} className="mt-8">
                <Card
                  className={`overflow-hidden border-0 shadow-2xl bg-gradient-to-br ${bgGradient} backdrop-blur-sm`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full bg-white/80 shadow-lg`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          실제 보낸 메시지
                        </h3>
                        <p className="text-sm text-gray-600">
                          상대방이 받은 그대로
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* 메시지 박스 */}
                    <div className="relative">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                        <p className="text-lg font-medium text-gray-800">
                          {message}
                        </p>
                      </div>
                      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/90 rotate-45 border-r border-b border-white/20"></div>
                    </div>

                    {/* 오해 섹션 */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-red-100">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-2">
                            상대방의 오해
                          </h4>
                          <p className="text-red-700 text-lg font-medium italic">
                            {misunderstanding}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 팁 섹션 */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-green-100">
                          <Lightbulb className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800 mb-2">
                            💡 개선 팁
                          </h4>
                          <p className="text-green-700 text-base leading-relaxed">
                            {tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          )}
        </Tabs>

        {/* 푸터 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">소통이 더 원활해질 거예요! ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
