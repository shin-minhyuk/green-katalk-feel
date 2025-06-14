import { createClient } from "@/utils/supabase/client";

interface AnalyzeParams {
  relation: string;
  purpose: string;
  mood: string;
  worrying_message: string;
  question: string;
  conversation: string;
}

export const createAnalyzeEmotion = async (data: AnalyzeParams) => {
  const supabase = createClient();
  const { data: result, error } = await supabase.functions.invoke("openai", {
    body: data,
  });

  if (error) {
    throw new Error(`GPT 분석 요청 실패: ${error.message}`);
  }

  return result;
};
