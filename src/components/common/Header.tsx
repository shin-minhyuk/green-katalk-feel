// "use client";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Github } from "lucide-react";

// export function Header() {
//   return (
//     <header className="sticky top-0 z-20 w-full border-b bg-background/70 backdrop-blur">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
//         <Link href="/" className="text-lg font-semibold md:text-xl">
//           그린이 감정분석기
//         </Link>
//         <nav className="flex items-center gap-4 text-sm font-medium">
//           <Link
//             href="/analyzer"
//             className="hover:text-primary transition-colors"
//           >
//             분석하기
//           </Link>
//           <Button asChild size="sm" variant="ghost">
//             <Link href="https://github.com/your-repo" target="_blank">
//               <Github className="size-4" />
//               <span className="sr-only">GitHub</span>
//             </Link>
//           </Button>
//         </nav>
//       </div>
//     </header>
//   );
// }

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-sm border-b shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* 브랜딩 */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold md:text-xl text-primary hover:opacity-90 transition"
        >
          <span className="text-2xl">🌱</span>
          그린이 감정분석기
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-3 text-sm font-medium">
          {/* 분석하기 → 강조 */}
          <Button asChild size="sm">
            <Link href="/analyzer">감정 분석하기</Link>
          </Button>

          {/* GitHub */}
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href="https://github.com/your-repo" target="_blank">
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
