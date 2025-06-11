# 🟢 그린이 감정분석기 프로젝트 정리

> **연애, 썸, 인간관계 톡 대화를 분석해주는 감정 분석 AI 웹앱**  
> GPT를 기반으로 상대방의 기분을 유머러스하게 분석하여 말풍선 결과로 보여줍니다.  
> (예: "ㅇㅋ 알겠어" → 초록불 / 노란불 / 빨간불 판단)

---

## 📌 프로젝트 개요

| 항목            | 내용                                                      |
| --------------- | --------------------------------------------------------- |
| 서비스 이름     | **그린이 감정분석기**                                     |
| 부제목 (마켓용) | `그린이 - 연애, 썸, 사랑의 온도, 카톡감정분석기`          |
| 주요 기능       | 감정 신호등 분석, GPT 기반 톡 해석, 공감 멘트 & 추천 답변 |
| 타겟            | 2030 인간관계 눈치러, 연애/썸 고민러                      |
| 목표            | 빠른 바이럴, 퍼스널 감정 피드백, 공유 유도                |
| 마스코트        | **그린이** – 감정 분석을 말풍선으로 알려주는 캐릭터       |

---

## 🎯 주요 기능 흐름

1. 사용자가 **대화 내용을 입력**
2. 관계 맥락 선택 (ex. 연애, 썸, 친구)
3. GPT로 분석 요청
4. 결과:
   - 감정 신호등 (초록불, 노란불, 빨간불)
   - 그린이의 말풍선 멘트
   - 추천 답변 문구
   - 감정 점수 (선택)
5. 결과 페이지 공유 (URL 기반)

---

## 🧠 정보 구조(IA)

1. 홈 (/)
   ├─ 서비스 소개 (카톡으로 쎄한 말? GPT가 분석해줍니다!)
   ├─ CTA: [카톡 감정 분석하러 가기] → /analyzer
   └─ 예시 결과 미리보기 (그린이 말풍선 포함)

2. 감정 분석기 (/analyzer)
   ├─ 대화 내용 입력
   ├─ 관계/맥락 선택 (연애, 썸, 직장 등)
   └─ [감정 분석하기] → GPT 호출

3. 결과 페이지 (/result)
   ├─ 감정 신호등 (빨간불/노란불/초록불)
   ├─ 분석 요약 (이유)
   ├─ 그린이의 말풍선 멘트 (greenie_comment)
   ├─ 추천 대답 멘트 (suggested_reply)
   ├─ 감정 수치 그래프 (선택)
   └─ 공유 기능 (카카오톡 / 이미지 다운로드 / 링크 복사)

4. 그린이의 감정 팁 모음 (/guide)
   ├─ 말투별 오해 사례
   ├─ 연애/썸/직장 별 눈치 팁
   └─ 자주 묻는 질문 (FAQ)

5. About 페이지 (/about)
   ├─ 서비스 목적 및 소개
   ├─ 마스코트 ‘그린이’ 소개
   ├─ GPT 기반 감정 분석 설명
   └─ 제작자 정보 & 문의 링크

6. 공유 결과 페이지 (/share/[id])
   ├─ 공유용 썸네일형 결과
   ├─ ‘내 대화도 분석해보기’ 버튼

---

## 🧱 Supabase 구조

### ✅ Auth: Kakao OAuth 사용

- 이메일 로그인은 **비활성화**
- 비즈 앱은 **향후 필요 시 등록**

### ✅ 사용 테이블 목록

## 📦 Supabase 테이블 구조 정리 (MVP 기준)

---

### #### 1. `conversations`

| 필드명       | 타입      | 설명                          |
| ------------ | --------- | ----------------------------- |
| id           | uuid      | 대화 ID (기본키)              |
| user_id      | uuid      | 사용자 ID (nullable)          |
| content      | text      | 사용자가 입력한 대화 내용     |
| context_type | text      | 맥락 정보 (연애, 썸, 직장 등) |
| created_at   | timestamp | 대화 입력 시각                |

---

### #### 2. `results`

| 필드명          | 타입      | 설명                                 |
| --------------- | --------- | ------------------------------------ |
| id              | uuid      | 결과 ID (기본키, 공유 URL에 사용)    |
| user_id         | uuid      | 사용자 ID (nullable)                 |
| conversation_id | uuid      | 연결된 대화 ID (`conversations.id`)  |
| signal          | text      | 감정 신호등 (초록불, 노란불, 빨간불) |
| reason          | text      | 감정 판단 이유                       |
| greenie_comment | text      | 그린이 말풍선 멘트                   |
| suggested_reply | text      | 추천 답변 문구                       |
| emotion_scores  | jsonb     | 감정 분석 점수 (선택 항목)           |
| created_at      | timestamp | 결과 생성 시각                       |

---

### #### 3. `feedback` (선택)

| 필드명     | 타입      | 설명                        |
| ---------- | --------- | --------------------------- |
| id         | uuid      | 피드백 ID                   |
| user_id    | uuid      | 사용자 ID                   |
| result_id  | uuid      | 어떤 결과에 대한 피드백인지 |
| rating     | int (1~5) | 만족도 점수                 |
| comment    | text      | 자유 의견                   |
| created_at | timestamp | 피드백 작성 시각            |

---

### #### 4. `analytics_events`

| 필드명     | 타입      | 설명                                                         |
| ---------- | --------- | ------------------------------------------------------------ |
| id         | uuid      | 이벤트 고유 ID                                               |
| user_id    | uuid      | 사용자 ID (nullable, 익명 가능)                              |
| result_id  | uuid      | 어떤 감정 분석 결과와 연결된 이벤트인지                      |
| event_type | text      | 이벤트 종류 (`analyze_click`, `shared`, `copy_reply` 등)     |
| context    | jsonb     | 메타데이터 (`signal`, `channel`, `reply`, `context_type` 등) |
| created_at | timestamp | 이벤트 발생 시각                                             |

---

## 🔐 RLS 설정 정책 요약

- 모든 테이블은 **user_id 기준으로 RLS 적용**
- 익명 유저도 사용 가능하도록 `user_id IS NULL` 허용

```sql
-- 예: conversations 테이블
alter table public.conversations enable row level security;

create policy "select_own_or_anon" on public.conversations
  for select using (
    auth.uid() = user_id OR user_id IS NULL
  );

create policy "insert_own_or_anon" on public.conversations
  for insert with check (
    auth.uid() = user_id OR user_id IS NULL
  );
```
