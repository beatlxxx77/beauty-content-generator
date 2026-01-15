import "../styles/globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import PageTransition from "./page-transition";

export const metadata = {
  title: "beauty-content-generator",
  description: "MVP генерации постов для салонов красоты",
};

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-sand text-ink antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-moss"
            >
              Beauty Content
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
              <Link
                className="relative transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-coral after:transition-all hover:after:w-full"
                href="/"
              >
                Главная
              </Link>
              <Link
                className="relative transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-coral after:transition-all hover:after:w-full"
                href="/how-it-works"
              >
                Как это работает
              </Link>
              <Link
                className="relative transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-coral after:transition-all hover:after:w-full"
                href="/examples"
              >
                Примеры
              </Link>
              <Link
                className="relative transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-coral after:transition-all hover:after:w-full"
                href="/pricing"
              >
                Тарифы
              </Link>
            </nav>
            <Link
              href="/#generator"
              className="rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral/90 active:scale-[0.97]"
            >
              Создать пост
            </Link>
          </div>
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-3 text-xs font-medium text-ink/60 md:hidden">
            <Link href="/how-it-works">Как это работает</Link>
            <Link href="/examples">Примеры</Link>
            <Link href="/pricing">Тарифы</Link>
          </div>
        </header>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
