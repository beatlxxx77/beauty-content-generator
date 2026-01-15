"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * ⚠️ ВАЖНО
 * Frontend работает ТОЛЬКО через NEXT_PUBLIC_API_URL
 * Никаких localhost и fallback'ов
 */
const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const transition = { duration: 0.5, ease: "easeOut" };

const benefits = [
  {
    title: "Экономия времени",
    text: "Пост готов за минуту — без долгих брифов и переписок.",
  },
  {
    title: "Текст под услугу",
    text: "Формулировки адаптированы под вашу аудиторию и задачу.",
  },
  {
    title: "Больше записей",
    text: "Фокус на результате, выгодах и мягком дефиците.",
  },
  {
    title: "Публикация сразу",
    text: "Пост готов для соцсетей — без правок и доработок.",
  },
];

const audiences = [
  "Салоны красоты",
  "Частные мастера",
  "Студии маникюра",
  "Косметологи",
];

const reasons = [
  {
    title: "Говорим языком клиента",
    text: "Живые формулировки без канцелярита и штампов.",
  },
  {
    title: "Фокус на выгоде",
    text: "Показываем, что получит человек, а не процесс.",
  },
  {
    title: "Мягкий дефицит",
    text: "Подталкиваем к записи, не давя на клиента.",
  },
];

export default function Page() {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isDisabled =
    !city.trim() || !service.trim() || !targetAudience.trim() || !goal.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiBase) {
      setError(
        "API не настроен. Укажите NEXT_PUBLIC_API_URL в переменных окружения."
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const response = await fetch(`${apiBase}/generate-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          service,
          target_audience: targetAudience,
          goal,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Ошибка генерации поста");
      }

      const data = (await response.json()) as { text?: string };
      setResult(data.text || "Не удалось получить текст поста.");
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Не удалось связаться с сервером.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-moss/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-moss">
              Контент для салонов без лишних затрат
            </p>
            <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
              SaaS-генератор постов, который заменяет SMM и приводит записи
            </h1>
            <p className="text-base text-ink/70 sm:text-lg">
              Введите данные салона — получите продающий пост под вашу услугу и
              аудиторию.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#generator"
                className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral/90 active:scale-[0.97]"
              >
                Создать пост
              </a>
              <a
                href="/examples"
                className="rounded-full border border-sand px-6 py-3 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral"
              >
                Посмотреть примеры
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-card transition-transform hover:-translate-y-1"
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GENERATOR */}
        <section
          id="generator"
          className="grid gap-8 rounded-3xl border border-white/60 bg-white/70 p-10 shadow-card backdrop-blur"
        >
          <form onSubmit={handleSubmit} className="grid gap-6">
            <input
              placeholder="Город"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Услуга"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
            <input
              placeholder="Целевая аудитория"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
            <input
              placeholder="Цель поста"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button
              type="submit"
              disabled={isDisabled || loading}
              className="rounded-full bg-coral px-6 py-3 font-semibold text-white"
            >
              {loading ? "Генерируем…" : "Сгенерировать пост"}
            </button>

            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {result && (
              <div className="rounded-xl bg-white p-4">
                <button type="button" onClick={handleCopy}>
                  {copied ? "Скопировано" : "Скопировать"}
                </button>
                <p className="mt-4 whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </form>
        </section>
      </div>
    </motion.main>
  );
}
