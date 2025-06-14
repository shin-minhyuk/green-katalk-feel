"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  HelpCircle,
  MessageSquare,
  Bot,
  Sparkles,
} from "lucide-react";
import { createAnalyzeEmotion } from "@/apis";

const STEPS = [
  {
    id: 1,
    title: "관계 설정",
    description: "이 대화는 누구와의 대화인가요?",
    field: "relation",
    type: "select",
    options: ["연인", "썸", "친구", "동료", "가족", "기타"],
    icon: Users,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "대화 목적",
    description: "대화의 주된 목적은 무엇이었나요?",
    field: "purpose",
    type: "select",
    options: [
      "일상 대화",
      "일정 조율",
      "감정 표현",
      "부탁/요청",
      "갈등/문제 해결",
      "기타",
    ],
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "현재 관계 상태",
    description: "최근 두 분의 관계는 어떤가요?",
    field: "mood",
    type: "select",
    options: ["아주 좋음", "좋음", "평범함", "어색함", "냉랭함/싸움", "기타"],
    icon: Heart,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: 4,
    title: "핵심 메시지",
    description: "대화에서 가장 마음에 걸리는 메시지는 무엇인가요?",
    field: "worrying_message",
    type: "text",
    icon: MessageCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: 5,
    title: "궁금한 점",
    description: "이 대화를 통해 무엇을 알고 싶으신가요?",
    field: "question",
    type: "text",
    icon: HelpCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 6,
    title: "대화 내용 입력",
    description: "분석하고 싶은 카카오톡, 인스타 대화 내용을 붙여넣어 주세요.",
    field: "conversation",
    type: "textarea",
    icon: MessageSquare,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export function AnalyzerQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    relation: "",
    purpose: "",
    mood: "",
    worrying_message: "",
    question: "",
    conversation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [, setAnalyzeResult] = useState(null);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await createAnalyzeEmotion(formData);

      // 👉 결과를 페이지에 띄우거나, 상태로 저장해서 보여줘도 됨
      setAnalyzeResult(result.content);
      console.log(result.content);
    } catch (error) {
      console.error("분석 실패:", error);
      // toast나 alert 등으로 사용자에게 알려줄 수도 있어
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 진행률 계산
    setProgress(((currentStep + 1) / STEPS.length) * 100);
  }, [currentStep]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentStepData = STEPS[currentStep];
  const currentValue = formData[currentStepData.field as keyof typeof formData];
  const isNextDisabled = !currentValue?.trim();
  const Icon = currentStepData.icon;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* 진행 상태 표시 */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">분석 설정</span>
          <span className="text-sm font-medium text-gray-600">
            {currentStep + 1} / {STEPS.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className={`h-full bg-gradient-to-r ${currentStepData.gradient}`}
            initial={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      <Card className="w-full overflow-hidden border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
        {/* 상단 그라데이션 바 */}
        <div
          className={`h-1.5 w-full bg-gradient-to-r ${currentStepData.gradient}`}
        ></div>

        <CardHeader className="relative pb-0">
          <div className="mb-2 flex items-center gap-3">
            <div
              className={`rounded-xl p-3 ${currentStepData.bgColor} shadow-lg`}
            >
              <Icon className={`h-6 w-6 ${currentStepData.color}`} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-base">
                {currentStepData.description}
              </CardDescription>
            </div>
          </div>

          {/* 단계 인디케이터 */}
          <div className="mt-4 flex justify-center gap-1.5">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                className={`h-1.5 rounded-full ${
                  idx === currentStep
                    ? `w-8 bg-gradient-to-r ${step.gradient}`
                    : idx < currentStep
                      ? "w-4 bg-gray-400"
                      : "w-4 bg-gray-200"
                }`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: idx === currentStep ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[200px]"
            >
              <div className="space-y-4">
                {currentStepData.type === "select" && (
                  <div className="grid gap-3">
                    <Label
                      htmlFor={currentStepData.field}
                      className="text-base font-medium"
                    >
                      {currentStepData.title}
                    </Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleChange(currentStepData.field, value)
                      }
                      defaultValue={
                        formData[currentStepData.field as keyof typeof formData]
                      }
                    >
                      <SelectTrigger
                        id={currentStepData.field}
                        className="h-14 border-2 border-gray-200 px-4 text-base transition-all duration-300 hover:border-gray-300 focus:border-2 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white"
                      >
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                      <SelectContent className="border-2">
                        {currentStepData.options?.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="cursor-pointer py-3 text-base"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {currentStepData.type === "text" && (
                  <div className="grid gap-3">
                    <Label
                      htmlFor={currentStepData.field}
                      className="text-base font-medium"
                    >
                      {currentStepData.title}
                    </Label>
                    <Input
                      id={currentStepData.field}
                      value={
                        formData[currentStepData.field as keyof typeof formData]
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(currentStepData.field, e.target.value)
                      }
                      autoComplete="off"
                      className="h-14 border-2 border-gray-200 px-4 text-base transition-all duration-300 hover:border-gray-300 focus:border-2 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white"
                      placeholder="여기에 입력해주세요..."
                    />
                  </div>
                )}

                {currentStepData.type === "textarea" && (
                  <div className="grid gap-3">
                    <Label
                      htmlFor={currentStepData.field}
                      className="text-base font-medium"
                    >
                      {currentStepData.title}
                    </Label>
                    <Textarea
                      id={currentStepData.field}
                      value={
                        formData[currentStepData.field as keyof typeof formData]
                      }
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleChange(currentStepData.field, e.target.value)
                      }
                      rows={10}
                      autoComplete="off"
                      className="resize-none border-2 border-gray-200 p-4 text-base transition-all duration-300 hover:border-gray-300 focus:border-2 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white"
                      placeholder="카카오톡, 인스타 대화 내용을 복사하여 붙여넣어 주세요..."
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="justify-between border-t p-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-2 transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 size-4" />
            이전
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={isNextDisabled}
              className={`bg-gradient-to-r ${currentStepData.gradient} border-0 transition-all duration-300 hover:opacity-90`}
            >
              다음
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isNextDisabled || isLoading}
              className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  분석 중...
                </>
              ) : (
                <>
                  <Bot className="mr-2 size-4" />
                  분석하기
                  <Sparkles className="ml-2 size-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* 도움말 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          입력하신 정보는 더 정확한 감정 분석을 위해서만 사용됩니다.
          <br />
          <span className="text-green-600">개인정보는 안전하게 보호</span>
          됩니다.
        </p>
      </div>
    </div>
  );
}
