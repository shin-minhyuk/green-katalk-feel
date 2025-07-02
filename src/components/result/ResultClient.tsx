"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Lightbulb,
  MessageSquareHeart,
  ShieldAlert,
  Share2,
  Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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

  const signal = searchParams.get("signal");
  const reason = searchParams.get("reason");
  const greenie_comment = searchParams.get("greenie_comment");
  const suggested_reply = searchParams.get("suggested_reply");

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.integrity =
      "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // TODO: .env.local 파일에 실제 카카오 앱의 JavaScript 키를 입력해주세요.
        if (process.env.NEXT_PUBLIC_KAKAO_APP_KEY) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
          setIsKakaoReady(true);
        }
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
          color: "text-green-500",
          bgColor: "bg-green-100",
          title: "긍정적인 신호",
          description: "대화에서 긍정적인 신호를 발견했어요.",
        };
      case "부정":
        return {
          Icon: ShieldAlert,
          color: "text-red-500",
          bgColor: "bg-red-100",
          title: "부정적인 신호",
          description: "주의가 필요한 부정적인 신호가 있어요.",
        };
      default:
        return {
          Icon: Lightbulb,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          title: "중립적인 신호",
          description: "대화가 중립적인 흐름을 보이고 있어요.",
        };
    }
  };

  const { Icon, color, bgColor, title, description } = getSignalInfo();

  const shareToKakao = () => {
    if (!isKakaoReady || !window.Kakao) {
      toast({
        title: "공유 기능 준비 중",
        description:
          "카카오톡 공유 기능을 불러오고 있습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `그리니 AI 분석 결과: ${title}`,
        description: greenie_comment?.substring(0, 80) + "..." || description,
        imageUrl:
          "https://xqvvcocozxiwbztnegzv.supabase.co/storage/v1/object/public/assets/og-image.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 자세히 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const copyToClipboard = async () => {
    const textToCopy = `[그리니 AI 분석 결과: ${title}]\n\n* 종합 분석\n${greenie_comment}\n\n* 추천 답장\n${suggested_reply}\n\n결과 페이지에서 자세히 보기: ${window.location.href}`;
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
      <div className="flex h-full w-full items-center justify-center p-4">
        <p>분석 결과를 불러오는 중이거나, 잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-[70px] min-h-[calc(100vh-70px)] bg-gray-50">
      <div className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
        <Card className="overflow-hidden rounded-2xl border-0 shadow-2xl backdrop-blur-sm">
          <CardHeader className={`${bgColor} p-6`}>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center rounded-xl p-3 shadow-lg ${bgColor}`}
              >
                <Icon className={`size-12 ${color}`} />
              </div>
              <div>
                <CardTitle className={`text-2xl font-bold ${color}`}>
                  {title}
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  {description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">
                그리니의 종합 분석
              </h3>
              <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-600">
                {greenie_comment}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">상세 분석</h3>
              <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-600">
                {reason}
              </p>
            </div>
            <div className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <h3 className="flex items-center text-xl font-bold text-emerald-800">
                <MessageSquareHeart className="mr-2 size-5" />
                추천 답장
              </h3>
              <p className="text-base leading-relaxed whitespace-pre-wrap text-emerald-700">
                {suggested_reply}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row">
              <Button
                onClick={shareToKakao}
                className="w-full flex-1 bg-yellow-400 text-black shadow-lg hover:bg-yellow-500"
                size="lg"
              >
                <Share2 className="mr-2 size-5" />
                카카오톡으로 공유하기
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full flex-1"
                size="lg"
              >
                <Copy className="mr-2 size-5" />
                결과 내용 복사하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
