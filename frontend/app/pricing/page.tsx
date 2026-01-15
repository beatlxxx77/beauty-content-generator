"use client";

import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: "easeOut" };

const features = [
  "До 5 генераций в день",
  "Базовые шаблоны под услуги",
  "Без регистрации",
  "Поддержка русского языка",
];

export default function PricingPage() {
  return (
    <motion.main
      className="relative min-h-screen overflow-hidden px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-moss/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-moss">
            Тарифы
          </p>
          <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
            Прозрачные условия
          </h1>
          <p className="max-w-2xl text-base text-ink/70 sm:text-lg">
            Сейчас сервис бесплатный, а платные функции появятся позже.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/75 p-8 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Бесплатно</h2>
              <p className="mt-2 text-sm text-ink/70">
                Платные функции скоро
              </p>
            </div>
            <div className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white">
              0 ₽
            </div>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-ink/70">
            {features.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-sand bg-white px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.main>
  );
}
