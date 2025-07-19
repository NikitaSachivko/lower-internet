"use client";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Нижний Интернет
      </h1>
      <p className="text-lg md:text-xl text-white/80 mb-8">
        «Нижний Интернет» — это сегмент сети, где доминируют маргиналы,
        души́евнобольные, бывшие заключённые и люди с зависимостями. Это не место
        для нормальной жизни — тут треш, провокации, чёрный юмор, политота,
        грязная правда, которую удаляют сверху. Контент не ценится по количеству
        просмотров и лайков, а по тому, насколько он разрушает нормы “верхнего”
        интернета.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition">
          Спуститься
        </button>
        <button className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white/10 transition">
          Смотреть на свой страх и риск
        </button>
      </div>
    </div>
  );
}
