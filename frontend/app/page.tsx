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
  const [copied, setCopied] = useState(false);

  const apiBase = (
    process.env.NEXT_PUBLIC_API_URL ||
    "https://beauty-content-generator.onrender.com"
  ).replace(/\/+$/, "");

  const isDisabled =
    !city.trim() ||
    !service.trim() ||
    !targetAudience.trim() ||
    !goal.trim();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const response = await fetch(`${apiBase}/generate-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          service,
          target_audience: targetAudience,
          goal,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка генерации поста");
      }

      const data = await response.json();
      setResult(data.text || "");
    } catch {
      setError("Не удалось связаться с сервером. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main
      className="min-h-screen bg-[#f7efe6] px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">
          Сгенерируйте продающий пост
        </h1>
        <p className="mb-8 text-gray-600">
          Введите данные салона — получите готовый текст для публикации
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full rounded-xl border border-gray-200 px-5 py-4 text-base outline-none focus:border-[#e87b6d]"
            placeholder="Город (например: Москва)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          />

          <input
            className="w-full rounded-xl border border-gray-200 px-5 py-4 text-base outline-none focus:border-[#e87b6d]"
            placeholder="Услуга (маникюр, окрашивание и т.д.)"
            value={service}
            onChange={(e) => setService(e.target.value)}
            autoComplete="off"
          />

          <input
            className="w-full rounded-xl border border-gray-200 px-5 py-4 text-base outline-none focus:border-[#e87b6d]"
            placeholder="Целевая аудитория (девушки 25–35)"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            autoComplete="off"
          />

          <input
            className="w-full rounded-xl border border-gray-200 px-5 py-4 text-base outline-none focus:border-[#e87b6d]"
            placeholder="Цель поста (заполнить запись)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={isDisabled || loading}
            className="w-full rounded-full bg-[#e87b6d] py-4 text-lg font-semibold text-white transition hover:bg-[#e36d5e] disabled:opacity-50"
          >
            {loading ? "Генерируем…" : "Сгенерировать пост"}
          </button>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </form>

        {result && (
          <motion.div
            className="mt-8 rounded-2xl bg-gray-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase text-gray-500">
                Готовый пост
              </span>
              <button
                onClick={handleCopy}
                className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
              >
                {copied ? "Скопировано" : "Скопировать"}
              </button>
            </div>
            <p className="whitespace-pre-wrap text-gray-800 leading-7">
              {result}
            </p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
