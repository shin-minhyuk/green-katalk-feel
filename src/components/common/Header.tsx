"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  BookOpen,
  BarChart2,
  Home,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 감지 효과
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "border-b border-green-100 bg-white/90 shadow-xl backdrop-blur-xl"
          : "border-b border-white/20 bg-white/70 shadow-lg backdrop-blur-lg"
      }`}
    >
      {/* 상단 그라데이션 라인 */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400"></div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* 브랜딩 */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-lg font-bold transition-all duration-300 hover:opacity-90 md:text-xl"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-50"></div>
            <div className="relative rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-2 shadow-lg">
              <span className="inline-block text-xl text-white transition-transform duration-300 group-hover:scale-110">
                🌱
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text leading-tight text-transparent">
              그린이 감정분석기
            </span>
            <span className="text-xs font-normal text-gray-500">
              AI 감정 코치
            </span>
          </div>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-gray-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>홈</span>
          </Link>

          <Link
            href="/guide"
            className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-gray-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600"
          >
            <BookOpen className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>가이드</span>
          </Link>

          <Button
            asChild
            size="sm"
            className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-xl"
          >
            <Link
              href="/analyzer"
              className="flex items-center gap-2 px-4 py-2.5"
            >
              <BarChart2 className="h-4 w-4" />
              <span>감정 분석하기</span>
              <Sparkles className="h-3 w-3" />
            </Link>
          </Button>

          {/* 카카오톡 로그인 버튼 */}
          <Button
            asChild
            size="sm"
            className="border-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl"
          >
            <Link href="/login" className="flex items-center gap-2 px-4 py-2.5">
              <MessageCircle className="h-4 w-4" />
              <span>카톡 로그인</span>
            </Link>
          </Button>
        </nav>

        {/* 모바일 메뉴 토글 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="group relative md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
          {isMobileMenuOpen ? (
            <X className="relative z-10 h-5 w-5" />
          ) : (
            <Menu className="relative z-10 h-5 w-5" />
          )}
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="border-t border-green-100 bg-white/95 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50"></div>
          <nav className="relative flex flex-col space-y-4 p-6">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-2 shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors group-hover:text-green-600">
                홈
              </span>
            </Link>

            <Link
              href="/guide"
              className="group flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-2 shadow-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                가이드
              </span>
            </Link>

            <Link
              href="/analyzer"
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-4 text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="rounded-xl bg-white/20 p-2">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="font-semibold">감정 분석하기</span>
              <Sparkles className="ml-auto h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-4 text-gray-800 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="rounded-xl bg-white/30 p-2">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-semibold">카카오톡 로그인</span>
              <User className="ml-auto h-4 w-4" />
            </Link>

            {/* 모바일 메뉴 하단 장식 */}
            <div className="mt-6 border-t border-green-100 pt-4">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Sparkles className="h-3 w-3" />
                <span>AI 감정 분석으로 더 나은 소통을</span>
                <Sparkles className="h-3 w-3" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
