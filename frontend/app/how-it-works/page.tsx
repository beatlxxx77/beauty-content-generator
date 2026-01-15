"use client";

import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: "easeOut" };

const steps = [
  {
    title: "Заполняете форму",
    text: "Укажите город, услугу и цель — этого достаточно.",
  },
  {
    title: "ИИ пишет продающий текст",
    text: "Пост адаптируется под вашу аудиторию и задачу.",
  },
  {
    title: "Публикуете и получаете записи",
    text: "Текст готов для публикации без правок.",
  },
];

export default function HowItWorksPage() {
  return (
    <motion.main
      className="relative min-h-screen overflow-hidden px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-moss/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-moss">
            Как это работает
          </p>
          <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
            Три шага до готового поста
          </h1>
          <p className="max-w-2xl text-base text-ink/70 sm:text-lg">
            Без сложных настроек и лишних действий — всё по делу.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/15 text-lg font-semibold text-coral">
                {index + 1}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-ink/70">{step.text}</p>
            </div>
          ))}
        </section>
      </div>
    </motion.main>
  );
}
