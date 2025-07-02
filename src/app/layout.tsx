import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greenie.ai"),
  title: {
    default: "그리니 - 카톡 대화 감정 분석 AI",
    template: `%s | 그리니`,
  },
  description:
    "카카오톡, 인스타 DM 대화를 분석하여 상대방의 속마음과 감정을 알아보세요. 연애, 썸, 친구, 동료와의 관계 개선을 위한 AI 감정 분석 솔루션입니다.",
  openGraph: {
    title: "그리니 - 카톡 대화 감정 분석 AI",
    description: "AI로 카톡 대화 속 숨은 감정을 파악하고 관계를 개선하세요.",
    images: "/og-image.png",
    siteName: "그리니",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "그리니 - 카톡 대화 감정 분석 AI",
    description: "AI로 카톡 대화 속 숨은 감정을 파악하고 관계를 개선하세요.",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
