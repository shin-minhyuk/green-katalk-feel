import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  // createServerClient와
  // supabase.auth.getUser() 사이에 코드를 실행하지 마세요.
  // 사소한 실수라도 사용자가 무작위로 로그아웃되는 문제를 디버깅하는 데 매우 어려움을 초래할 수 있습니다.
  // 중요: auth.getUser()를 제거하지 마세요.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인한 사용자만 접근 가능한 보호된 경로 목록
  const protectedRoutes = ["/history"];
  const currentPath = request.nextUrl.pathname;

  // 사용자가 로그아웃 상태이고, 보호된 경로에 접근하려고 할 때
  if (!user && protectedRoutes.some((path) => currentPath.startsWith(path))) {
    // 로그인 페이지로 리디렉션합니다.
    // 로그인 후 원래 가려던 페이지로 돌려보내기 위해 'next' 파라미터를 추가합니다.
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", currentPath);
    return NextResponse.redirect(url);
  }
  // 중요: supabaseResponse 객체를 있는 그대로 반환해야 합니다.
  // NextResponse.next()를 사용하여 새 응답 객체를 생성하는 경우 다음을 확인하세요.
  // 1. 다음과 같이 요청을 전달합니다.
  // const myNewResponse = NextResponse.next({ request })
  // 2. 다음과 같이 쿠키를 복사합니다.
  // myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. 필요에 맞게 myNewResponse 객체를 변경하되, 쿠키는 변경하지 마세요.
  //
  // 4. 마지막으로:
  // return myNewResponse
  // 이렇게 하지 않으면 브라우저와 서버의 동기화가 중단되어
  // 사용자 세션이 조기에 종료될 수 있습니다!
  return supabaseResponse;
}
