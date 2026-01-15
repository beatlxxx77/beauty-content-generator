"use client";

import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: "easeOut" };

const examples = [
  {
    title: "Маникюр и покрытие",
    text: "В Казани часто ищут аккуратный маникюр без переплат. Мы делаем чистое покрытие, которое держится до 3 недель, а запись занимает меньше минуты. Ближайшие окна есть на этой неделе — напишите в сообщения, подберем удобное время.",
  },
  {
    title: "Окрашивание волос",
    text: "В Екатеринбурге хочется оттенок, который выглядит дорого и не требует постоянных визитов. Мы подбираем цвет под тон кожи и сохраняем качество волос. На ближайшие даты осталось пару мест — оставьте заявку, и администратор свяжется.",
  },
  {
    title: "Ламинирование ресниц",
    text: "Если хочется просыпаться без туши, ламинирование решает это за один визит. В вашем районе есть свободные окна на выходные. Напишите нам, подскажем длительность и стоимость.",
  },
  {
    title: "Чистка лица",
    text: "В Новосибирске сезон требует свежего, ровного тона без покраснений. Чистка помогает вернуть коже ухоженный вид и снять раздражение. Есть свободные записи на ближайшие дни — напишите в сообщения.",
  },
  {
    title: "Брови и архитектура",
    text: "Выразительные брови меняют лицо, но важно сохранить естественность. Мы подбираем форму и цвет под вас. Запись ограничена — оставьте заявку, и мы подберем удобное время.",
  },
  {
    title: "Массаж головы",
    text: "Снять напряжение и добавить лёгкости можно за 40 минут. В салоне рядом с вами остались окошки на этой неделе. Напишите, если хотите записаться.",
  },
];

export default function ExamplesPage() {
  return (
    <motion.main
      className="relative min-h-screen overflow-hidden px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-moss/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-moss">
            Примеры
          </p>
          <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
            Реальные примеры постов
          </h1>
          <p className="max-w-2xl text-base text-ink/70 sm:text-lg">
            Тексты короткие, понятные и ориентированы на запись.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {examples.map((example) => (
            <article
              key={example.title}
              className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-ink">{example.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {example.text}
              </p>
            </article>
          ))}
        </section>
      </div>
    </motion.main>
  );
}
