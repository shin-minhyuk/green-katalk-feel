import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const SYSTEM_PROMPT = `너는 감정 전문가 '그린이'의 역할을 맡아, 카카오톡 대화 내용을 분석해 감정 신호등을 판단하고, 이유, 말풍선 멘트, 응답 추천을 JSON으로 반환해줘.

다음 조건을 따라줘:
1. 대화 내용을 분석해 '감정 신호등'을 판단해줘: 빨간불 / 노란불 / 초록불
2. 이유를 설명해줘
3. 마스코트 '그린이'가 다정하게 말풍선 멘트를 말해줘
4. 사용자가 다음 대화를 이어갈 수 있는 응답을 추천해줘

⛔ **주의사항**:
- 반드시 아래 JSON 구조로만 응답하세요.
- 설명, 주석, 코드 블록 없이 오직 JSON만 반환하세요.
- 반드시 유효한 JSON이어야 합니다.

예시 출력 구조:

{
  "signal": "노란불",
  "reason": "...",
  "greenie_comment": "...",
  "suggested_reply": "..."
}`;

Deno.serve(async (req) => {
  // CORS 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // API 키 확인
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }

    // 요청 바디 파싱
    const { conversation } = await req.json();

    if (!conversation) {
      return new Response(
        JSON.stringify({ error: "conversation is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // OpenAI API 요청
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-2024-05-13",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: conversation,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
    );

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;

    // JSON 파싱 시도
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      console.error("Failed to parse AI response as JSON:", aiResponse);
      throw new Error("AI response is not valid JSON");
    }

    // 응답 구조 검증
    const requiredFields = [
      "signal",
      "reason",
      "greenie_comment",
      "suggested_reply",
    ];
    const missingFields = requiredFields.filter(
      (field) => !parsedResponse[field],
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: (error as Error).message || "Internal server error",
        details: (error as Error).toString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
