"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-lg font-semibold md:text-xl">
          그린이 감정분석기
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/analyzer"
            className="hover:text-primary transition-colors"
          >
            분석하기
          </Link>
          <Button asChild size="sm" variant="ghost">
            <Link href="https://github.com/your-repo" target="_blank">
              GitHub
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
