"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const DEFAULT_API = "https://beauty-content-generator.onrender.com";
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

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API).replace(
    /\/+$/,
    ""
  );

  const isDisabled =
    !city.trim() || !service.trim() || !targetAudience.trim() || !goal.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      const data = (await response.json()) as { text?: string; detail?: string };
      setResult(data.text || "Не удалось получить текст поста.");
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Не удалось связаться с сервером. Проверьте backend.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }
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
              аудиторию. Экономьте время и публикуйте сразу.
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
                className="rounded-full border border-sand px-6 py-3 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral active:scale-[0.98]"
              >
                Посмотреть примеры
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="generator"
          className="grid gap-8 rounded-3xl border border-white/60 bg-white/70 p-10 shadow-card backdrop-blur"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-ink">
              Сформируйте пост под ваш салон
            </h2>
            <p className="text-sm text-ink/70">
              Достаточно нескольких строк — и текст готов к публикации.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Город
                <input
                  className="rounded-2xl border border-sand bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-coral"
                  placeholder="Например: Москва"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Услуга
                <input
                  className="rounded-2xl border border-sand bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-coral"
                  placeholder="Например: окрашивание, ламинирование, маникюр"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-ink">
              Целевая аудитория
              <input
                className="rounded-2xl border border-sand bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-coral"
                placeholder="Например: девушки 25–35, ценят качество и сервис"
                value={targetAudience}
                onChange={(event) => setTargetAudience(event.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-ink">
              Цель поста
              <input
                className="rounded-2xl border border-sand bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-coral"
                placeholder="Например: заполнить запись на ближайшую неделю"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              />
            </label>

            <button
              type="submit"
              disabled={isDisabled || loading}
              className="flex items-center justify-center rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:bg-coral/50 active:scale-[0.97]"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span>Генерируем пост…</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" style={{ animationDelay: "300ms" }} />
                  </span>
                </span>
              ) : (
                "Сгенерировать пост"
              )}
            </button>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {result && (
              <motion.section
                className="rounded-2xl border border-sand bg-white px-5 py-4 text-ink"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
                    Готовый пост
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90 active:scale-[0.97]"
                  >
                    {copied ? "Скопировано" : "Скопировать текст"}
                  </button>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-ink/90">
                  {result}
                </p>
              </motion.section>
            )}
          </form>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-ink">Кому подойдёт</h2>
            <p className="mt-2 text-sm text-ink/70">
              Когда нужно больше записей, а времени на контент нет.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-sand bg-white px-4 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-1"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-ink">Почему это работает</h2>
            <div className="mt-4 grid gap-4">
              {reasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
