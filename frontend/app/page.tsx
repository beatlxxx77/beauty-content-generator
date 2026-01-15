"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const transition = { duration: 0.5, ease: "easeOut" };

export default function Page() {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch(`${apiBase}/generate-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          service,
          target_audience: targetAudience,
          goal,
        }),
      });

      if (!res.ok) {
        throw new Error("Ошибка генерации");
      }

      const data = await res.json();
      setResult(data.text);
    } catch {
      setError("Не удалось связаться с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-[#F9EFE6] to-[#F3E4D8] px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="mx-auto max-w-5xl space-y-16">
        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] text-[#8E9F8E] uppercase">
              Контент для салонов без лишних затрат
            </p>
            <h1 className="text-4xl font-semibold text-[#1E1E1E]">
              SaaS-генератор постов, который заменяет SMM и приводит записи
            </h1>
            <p className="text-[#555]">
              Введите данные салона — получите продающий пост под вашу услугу и
              аудиторию.
            </p>
            <div className="flex gap-4">
              <a
                href="#form"
                className="rounded-full bg-[#E77463] px-6 py-3 text-white font-semibold shadow"
              >
                Создать пост
              </a>
              <a
                href="/examples"
                className="rounded-full border px-6 py-3 font-semibold"
              >
                Посмотреть примеры
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Экономия времени", "Пост готов за минуту"],
              ["Текст под услугу", "Адаптация под аудиторию"],
              ["Больше записей", "Фокус на результате"],
              ["Публикация сразу", "Без правок"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-5 shadow"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section
          id="form"
          className="rounded-3xl bg-white p-10 shadow space-y-6"
        >
          <h2 className="text-2xl font-semibold">
            Сформируйте пост под ваш салон
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Город"
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                placeholder="Услуга"
                className="input"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            <input
              placeholder="Целевая аудитория"
              className="input"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />

            <input
              placeholder="Цель поста"
              className="input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button
              disabled={loading}
              className="rounded-full bg-[#E77463] py-4 text-white font-semibold"
            >
              {loading ? "Генерируем…" : "Сгенерировать пост"}
            </button>

            {error && (
              <p className="text-red-600">{error}</p>
            )}

            {result && (
              <div className="rounded-2xl bg-[#F9F4EE] p-6 whitespace-pre-wrap">
                {result}
              </div>
            )}
          </form>
        </section>
      </div>
    </motion.main>
  );
}
