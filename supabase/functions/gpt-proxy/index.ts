// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages 배열이 필요합니다." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const SYSTEM_PROMPT = await Deno.readTextFile("prompt.txt");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API 키가 누락되었습니다." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // 필요시 gpt-3.5-turbo로 변경 가능
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages, // ex) [{ role: "user", content: "오늘 좀 서운했어" }]
        ],
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    const content = result.choices?.[0]?.message?.content;

    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(
        JSON.stringify({
          error: "GPT 응답이 JSON 형식이 아닙니다.",
          raw: content,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ error: "요청 처리 중 오류가 발생했습니다." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/gpt-proxy' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
