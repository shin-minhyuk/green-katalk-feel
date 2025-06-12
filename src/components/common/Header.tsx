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
          ? "bg-white/90 backdrop-blur-xl shadow-xl border-b border-green-100"
          : "bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20"
      }`}
    >
      {/* 상단 그라데이션 라인 */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400"></div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* 브랜딩 */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold md:text-xl hover:opacity-90 transition-all duration-300 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full shadow-lg">
              <span className="text-xl text-white transition-transform duration-300 group-hover:scale-110 inline-block">
                🌱
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent leading-tight">
              그린이 감정분석기
            </span>
            <span className="text-xs text-gray-500 font-normal">
              AI 감정 코치
            </span>
          </div>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>홈</span>
          </Link>

          <Link
            href="/guide"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
          >
            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>가이드</span>
          </Link>

          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            <Link
              href="/analyzer"
              className="flex items-center gap-2 px-4 py-2.5"
            >
              <BarChart2 className="w-4 h-4" />
              <span>감정 분석하기</span>
              <Sparkles className="w-3 h-3" />
            </Link>
          </Button>

          {/* 카카오톡 로그인 버튼 */}
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            <Link href="/login" className="flex items-center gap-2 px-4 py-2.5">
              <MessageCircle className="w-4 h-4" />
              <span>카톡 로그인</span>
            </Link>
          </Button>
        </nav>

        {/* 모바일 메뉴 토글 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 relative z-10" />
          ) : (
            <Menu className="w-5 h-5 relative z-10" />
          )}
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50"></div>
          <nav className="relative flex flex-col p-6 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                홈
              </span>
            </Link>

            <Link
              href="/guide"
              className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                가이드
              </span>
            </Link>

            <Link
              href="/analyzer"
              className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-white/20 rounded-xl">
                <BarChart2 className="w-5 h-5" />
              </div>
              <span className="font-semibold">감정 분석하기</span>
              <Sparkles className="w-4 h-4 ml-auto" />
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-white/30 rounded-xl">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold">카카오톡 로그인</span>
              <User className="w-4 h-4 ml-auto" />
            </Link>

            {/* 모바일 메뉴 하단 장식 */}
            <div className="mt-6 pt-4 border-t border-green-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Sparkles className="w-3 h-3" />
                <span>AI 감정 분석으로 더 나은 소통을</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
