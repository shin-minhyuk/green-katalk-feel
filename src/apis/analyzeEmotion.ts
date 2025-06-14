import { createClient } from "@/utils/supabase/client";

interface AnalyzeParams {
  relation: string;
  purpose: string;
  mood: string;
  worrying_message: string;
  question: string;
  conversation: string;
}

export interface AnalyzeResult {
  signal: string;
  reason: string;
  greenie_comment: string;
  suggested_reply: string;
  emotion_scores: Record<string, number>;
}

export const createAnalyzeEmotion = async (
  data: AnalyzeParams,
): Promise<AnalyzeResult> => {
  const supabase = createClient();
  const { data: result, error } = await supabase.functions.invoke("openai", {
    body: data,
  });

  if (error) {
    throw new Error(`GPT 분석 요청 실패: ${error.message}`);
  }

  return result;
};

/**
 * 사용자가 입력한 질문지 내용을 conversations 테이블에 저장합니다.
 */
export const saveConversation = async (
  requestData: AnalyzeParams,
  userId: string | null,
) => {
  const supabase = createClient();
  const { data: conversationData, error: conversationError } = await supabase
    .from("conversations")
    .insert({
      user_id: userId,
      ...requestData,
    })
    .select("id")
    .single();

  if (conversationError) {
    console.error("대화 내용 저장 실패:", conversationError.message);
    throw new Error(`대화 내용 저장 실패: ${conversationError.message}`);
  }

  return conversationData;
};

/**
 * AI의 분석 결과를 results 테이블에 저장합니다.
 */
export const saveResult = async (
  resultData: AnalyzeResult,
  conversationId: string,
  userId: string | null,
) => {
  const supabase = createClient();
  const { data, error: resultError } = await supabase.from("results").insert({
    user_id: userId,
    conversation_id: conversationId,
    signal: resultData.signal,
    reason: resultData.reason,
    greenie_comment: resultData.greenie_comment,
    suggested_reply: resultData.suggested_reply,
    emotion_scores: resultData.emotion_scores,
  });

  if (resultError) {
    console.error("분석 결과 저장 실패:", resultError.message);
    throw new Error(`분석 결과 저장 실패: ${resultError.message}`);
  }

  return data;
};
