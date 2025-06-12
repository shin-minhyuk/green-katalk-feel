import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background/50 border-t py-10 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">그린이 감정분석기</p>
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Minhyuk. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <Link href="#about" className="hover:underline">
            About
          </Link>
          <Link href="#guide" className="hover:underline">
            Guide
          </Link>
          <Link href="#faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="mailto:hello@example.com" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
