"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckCircle,
  Lightbulb,
  MessageSquareHeart,
  ShieldAlert,
  Share2,
  Copy,
  Sparkles,
} from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export function ResultClient() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const signal = searchParams.get("signal");
  const reason = searchParams.get("reason");
  const greenie_comment = searchParams.get("greenie_comment");
  const suggested_reply = searchParams.get("suggested_reply");

  useEffect(() => {
    // 페이지 로드 애니메이션
    setIsLoaded(true);

    // 카카오 SDK 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // TODO: 실제 카카오 앱의 JavaScript 키를 입력해주세요.
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        setIsKakaoReady(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const getSignalInfo = () => {
    switch (signal) {
      case "긍정":
        return {
          Icon: CheckCircle,
          color: "text-emerald-600",
          bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
          borderColor: "border-emerald-200",
          title: "긍정적인 신호",
          description: "대화에서 긍정적인 신호를 발견했어요! ✨",
          emoji: "💚",
        };
      case "부정":
        return {
          Icon: ShieldAlert,
          color: "text-red-600",
          bgColor: "bg-gradient-to-br from-red-50 to-pink-100",
          borderColor: "border-red-200",
          title: "부정적인 신호",
          description: "주의가 필요한 부정적인 신호가 있어요. 🚨",
          emoji: "💔",
        };
      default:
        return {
          Icon: Lightbulb,
          color: "text-amber-600",
          bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
          borderColor: "border-amber-200",
          title: "중립적인 신호",
          description: "대화가 중립적인 흐름을 보이고 있어요. 💭",
          emoji: "💛",
        };
    }
  };

  const { Icon, color, bgColor, borderColor, title, description, emoji } =
    getSignalInfo();

  const shareToKakao = () => {
    if (!isKakaoReady || !window.Kakao) {
      toast({
        title: "공유 실패",
        description: "카카오톡 공유 기능을 불러올 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `그리니 분석 결과: ${title}`,
        description: `${description}\n\n${greenie_comment?.substring(0, 100)}...`,
        imageUrl: "https://your-domain.com/greenie-logo.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });

    toast({
      title: "공유 완료!",
      description: "카카오톡으로 결과를 공유했습니다.",
      variant: "success",
    });
  };

  const copyToClipboard = async () => {
    const textToCopy = `그리니 분석 결과: ${title}\n\n${greenie_comment}\n\n추천 답장: ${suggested_reply}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "복사 완료!",
        description: "분석 결과가 클립보드에 복사되었습니다.",
        variant: "success",
      });
    } catch {
      toast({
        title: "복사 실패",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!signal) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto h-16 w-16 rounded-full border-4 border-emerald-600 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <p className="text-lg text-gray-600">
            분석 결과를 불러오는 중입니다...
          </p>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.main
          className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-4xl">
            {/* 헤더 섹션 */}
            <motion.div
              className="mb-8 space-y-4 text-center"
              variants={itemVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="size-4 text-emerald-600" />
                </motion.div>
                <span className="text-sm font-medium text-emerald-700">
                  그리니 AI 분석 완료
                </span>
              </motion.div>
              <motion.h1
                className="text-3xl font-bold text-gray-900 md:text-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                대화 분석 결과 {emoji}
              </motion.h1>
            </motion.div>

            {/* 메인 결과 카드 */}
            <motion.div variants={itemVariants}>
              <Card className="mb-8 overflow-hidden rounded-3xl border-0 shadow-2xl backdrop-blur-sm">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader
                    className={`${bgColor} ${borderColor} border-b p-8`}
                  >
                    <div className="flex flex-col items-center gap-6 sm:flex-row">
                      <motion.div
                        className={`flex items-center justify-center rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.5,
                          duration: 0.6,
                          type: "spring",
                        }}
                      >
                        <Icon className={`size-16 ${color}`} />
                      </motion.div>
                      <div className="text-center sm:text-left">
                        <CardTitle
                          className={`text-3xl font-bold ${color} mb-2`}
                        >
                          {title}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-700">
                          {description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 p-8">
                    {/* 그리니의 종합 분석 */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600"
                          initial={{ height: 0 }}
                          animate={{ height: 32 }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                        />
                        <h3 className="text-2xl font-bold text-gray-900">
                          그리니의 종합 분석
                        </h3>
                      </div>
                      <motion.div
                        className="rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
                          {greenie_comment}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* 상세 분석 */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600"
                          initial={{ height: 0 }}
                          animate={{ height: 32 }}
                          transition={{ delay: 1.0, duration: 0.4 }}
                        />
                        <h3 className="text-2xl font-bold text-gray-900">
                          상세 분석
                        </h3>
                      </div>
                      <motion.div
                        className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
                          {reason}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* 추천 답장 */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600"
                          initial={{ height: 0 }}
                          animate={{ height: 32 }}
                          transition={{ delay: 1.2, duration: 0.4 }}
                        />
                        <h3 className="flex items-center text-2xl font-bold text-emerald-800">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <MessageSquareHeart className="mr-3 size-7" />
                          </motion.div>
                          추천 답장
                        </h3>
                      </div>
                      <motion.div
                        className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap text-emerald-800">
                          {suggested_reply}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* 공유 버튼들 */}
                    <motion.div
                      className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                    >
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={shareToKakao}
                          className="w-full rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-yellow-900 shadow-lg transition-all duration-200 hover:bg-yellow-500 hover:shadow-xl"
                          size="lg"
                        >
                          <Share2 className="mr-2 size-5" />
                          카카오톡으로 공유하기
                        </Button>
                      </motion.div>

                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          className="w-full rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-xl"
                          size="lg"
                        >
                          <Copy className="mr-2 size-5" />
                          결과 복사하기
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>

            {/* 푸터 */}
            <motion.div
              className="text-center text-sm text-gray-500"
              variants={itemVariants}
            >
              <p>그리니 AI가 분석한 결과입니다. 참고용으로만 활용해주세요.</p>
            </motion.div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
