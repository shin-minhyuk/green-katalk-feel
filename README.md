# 🌱 그리니 (Greenie)

> **AI 감정 코치가 카카오톡 대화를 분석해드려요**

연애, 썸, 인간관계에서 애매한 카톡 메시지의 진짜 감정을 GPT가 분석해주는 웹 서비스입니다.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ 주요 기능

- 🎯 **감정 신호등 분석**: 초록불/노란불/빨간불로 상대방 기분 파악
- 🤖 **AI 감정 코치**: GPT 기반 대화 분석과 맞춤형 조언
- 💬 **추천 답변**: 상황에 맞는 답변 문구 제안
- 📱 **카카오 로그인**: 간편한 소셜 로그인
- 📊 **분석 결과 저장**: 로그인 시 분석 기록 보관
- 🔗 **결과 공유**: 분석 결과를 친구들과 공유

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn
- Supabase 계정 (OAuth 및 Edge Function 포함)

### 설치 및 실행

1. **저장소 클론**

```bash
git clone https://github.com/your-username/green-katalk-feel.git
cd green-katalk-feel
```

2. **의존성 설치**

```bash
npm install
# 또는
yarn install
```

3. **환경 변수 설정**
   `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ 보안 주의사항**:

- OpenAI API 키는 보안을 위해 Supabase Edge Function에서 서버 사이드 환경 변수로 관리됩니다.
- 카카오 OAuth 설정은 Supabase Dashboard에서 관리되므로 별도의 클라이언트 환경 변수가 필요하지 않습니다.

4. **개발 서버 실행**

```bash
npm run dev
# 또는
yarn dev
```

5. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)에서 앱을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── analyzer/          # 감정 분석 페이지
│   ├── auth/              # 인증 관련
│   ├── guide/             # 가이드 페이지
│   ├── result/            # 분석 결과 페이지
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── analyzer/          # 분석기 관련 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   ├── guide/             # 가이드 관련 컴포넌트
│   ├── home/              # 홈페이지 컴포넌트
│   ├── result/            # 결과 관련 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── apis/                  # API 함수들
├── utils/                 # 유틸리티 함수들
└── lib/                   # 라이브러리 설정
```

## 🛠 기술 스택

### Frontend

- **Next.js 14**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트
- **Lucide React**: 아이콘 라이브러리

### Backend & Database

- **Supabase**: 백엔드 서비스 (인증, 데이터베이스)
- **PostgreSQL**: 관계형 데이터베이스
- **Row Level Security**: 데이터 보안

### AI & APIs

- **OpenAI GPT**: 감정 분석 및 대화 해석 (Supabase Edge Function으로 안전하게 처리)
- **Kakao OAuth**: 소셜 로그인

## 📊 데이터베이스 스키마

### conversations

- 사용자 대화 내용 저장
- 맥락 정보 (연애, 썸, 직장 등) 포함

### results

- GPT 분석 결과 저장
- 감정 신호등, 조언, 추천 답변 포함

### analytics_events

- 사용자 행동 분석을 위한 이벤트 로깅

## 🔐 보안

- **Row Level Security (RLS)**: 사용자별 데이터 접근 제어
- **OAuth 인증**: 안전한 소셜 로그인
- **서버 사이드 API 처리**: OpenAI API 키는 Supabase Edge Function에서만 사용
- **환경 변수 관리**: 민감한 정보 클라이언트 노출 방지

## 🤝 기여하기

1. 저장소를 포크하세요
2. 새로운 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- 개발자: [dev.minhyuk@gmail.com](mailto:dev.minhyuk@gmail.com)
- 프로젝트 링크: [https://github.com/your-username/green-katalk-feel](https://github.com/your-username/green-katalk-feel)

---

<div align="center">
  <p>❤️ Made with love for better communication</p>
  <p>🌱 그리니와 함께 더 나은 소통을 시작하세요!</p>
</div>
