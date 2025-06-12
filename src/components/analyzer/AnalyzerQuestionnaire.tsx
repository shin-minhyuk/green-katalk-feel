"use client";

import { useState } from "react";
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
import { ArrowRight, ArrowLeft } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "관계 설정",
    description: "이 대화는 누구와의 대화인가요?",
    field: "relation",
    type: "select",
    options: ["연인", "썸", "친구", "동료", "가족", "기타"],
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
  },
  {
    id: 3,
    title: "현재 관계 상태",
    description: "최근 두 분의 관계는 어떤가요?",
    field: "mood",
    type: "select",
    options: ["아주 좋음", "좋음", "평범함", "어색함", "냉랭함/싸움", "기타"],
  },
  {
    id: 4,
    title: "핵심 메시지",
    description: "대화에서 가장 마음에 걸리는 메시지는 무엇인가요?",
    field: "worrying_message",
    type: "text",
  },
  {
    id: 5,
    title: "궁금한 점",
    description: "이 대화를 통해 무엇을 알고 싶으신가요?",
    field: "question",
    type: "text",
  },
  {
    id: 6,
    title: "대화 내용 입력",
    description: "분석하고 싶은 카카오톡 대화 내용을 붙여넣어 주세요.",
    field: "conversation",
    type: "textarea",
  },
];

export default function AnalyzerQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    relation: "",
    purpose: "",
    mood: "",
    worrying_message: "",
    question: "",
    conversation: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // TODO: API call logic
  };

  const currentStepData = STEPS[currentStep];
  const currentValue = formData[currentStepData.field as keyof typeof formData];
  const isNextDisabled = !currentValue?.trim();

  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>{currentStepData.title}</CardTitle>
        <CardDescription>{currentStepData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              {currentStepData.type === "select" && (
                <div className="grid gap-2">
                  <Label htmlFor={currentStepData.field}>
                    {currentStepData.title}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange(currentStepData.field, value)
                    }
                    defaultValue={
                      formData[currentStepData.field as keyof typeof formData]
                    }
                  >
                    <SelectTrigger id={currentStepData.field}>
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentStepData.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {currentStepData.type === "text" && (
                <div className="grid gap-2">
                  <Label htmlFor={currentStepData.field}>
                    {currentStepData.title}
                  </Label>
                  <Input
                    id={currentStepData.field}
                    value={
                      formData[currentStepData.field as keyof typeof formData]
                    }
                    onChange={(e) =>
                      handleChange(currentStepData.field, e.target.value)
                    }
                    autoComplete="off"
                  />
                </div>
              )}

              {currentStepData.type === "textarea" && (
                <div className="grid gap-2">
                  <Label htmlFor={currentStepData.field}>
                    {currentStepData.title}
                  </Label>
                  <Textarea
                    id={currentStepData.field}
                    value={
                      formData[currentStepData.field as keyof typeof formData]
                    }
                    onChange={(e) =>
                      handleChange(currentStepData.field, e.target.value)
                    }
                    rows={10}
                    autoComplete="off"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 size-4" />
          이전
        </Button>
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={nextStep} disabled={isNextDisabled}>
            다음
            <ArrowRight className="ml-2 size-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isNextDisabled}>
            분석하기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
