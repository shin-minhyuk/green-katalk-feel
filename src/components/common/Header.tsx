"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Menu,
  X,
  BookOpen,
  BarChart2,
  Home,
  ExternalLink,
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
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* 브랜딩 */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold md:text-xl hover:opacity-90 transition group"
        >
          <div className="relative">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110 inline-block">
              🌱
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            그린이 감정분석기
          </span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>홈</span>
          </Link>

          <Link
            href="/guide"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>가이드</span>
          </Link>

          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-sm hover:shadow transition-all"
          >
            <Link href="/analyzer" className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />
              <span>감정 분석하기</span>
            </Link>
          </Button>

          <Button
            asChild
            size="icon"
            variant="outline"
            className="text-gray-500 hover:text-gray-900 hover:border-green-300 transition-colors"
          >
            <Link
              href="https://github.com/your-repo"
              target="_blank"
              className="relative group"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
        </nav>

        {/* 모바일 메뉴 토글 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 text-green-600" />
              <span className="font-medium">홈</span>
            </Link>

            <Link
              href="/guide"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5 text-green-600" />
              <span className="font-medium">가이드</span>
            </Link>

            <Link
              href="/analyzer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart2 className="w-5 h-5" />
              <span className="font-medium">감정 분석하기</span>
            </Link>

            <Link
              href="https://github.com/your-repo"
              target="_blank"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-5 h-5 text-gray-600" />
              <span className="font-medium">GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-gray-400" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
