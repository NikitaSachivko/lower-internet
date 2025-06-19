"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import pagesData from "../../../config/pages-data.json";
import { useEffect, useRef, useState } from "react";
import { extractColorsFromImage } from "extract-colors";
import clsx from "clsx";



export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const person = pagesData.find((p: any) => p.slug === slug);

  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<string>("#18181b"); // fallback цвет

  useEffect(() => {
    if (!person) return;

    const imgEl = imgRef.current;
    if (!imgEl) return;

    const handleLoad = async () => {
      try {
        // Проверка: успешно ли загрузилось изображение
        if (imgEl.naturalWidth === 0) {
          console.warn("Изображение не загрузилось корректно:", imgEl.src);
          return; // Не пытаться извлекать цвета из "битой" картинки
        }

        const colors = await extractColorsFromImage(imgEl);
        if (colors?.length > 0) {
          setBgColor(colors[0].hex);
        }
      } catch (error) {
        console.error("Ошибка извлечения цветов:", error);
      }
    };

    if (imgEl.complete) {
      handleLoad();
    } else {
      imgEl.addEventListener("load", handleLoad);
      imgEl.addEventListener("error", () => {
        console.warn("Ошибка загрузки изображения:", imgEl.src);
      });
      return () => {
        imgEl.removeEventListener("load", handleLoad);
      };
    }
  }, [person]);

  if (!person) {
    return <div className="p-8 text-center text-red-500">Не найдено</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Обложка и заголовок */}
      <div
        className="w-full rounded-t-lg px-6 pt-10 pb-6"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}, #121212)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
          {/* Картинка с ref и crossOrigin для работы extract-colors */}
          <img
            ref={imgRef}
            src={person.items?.[0]?.img || "/fallback.jpg"}
            alt={person.title}
            width={240}
            height={240}
            className="rounded shadow-xl w-[240px] h-[240px] object-cover"
            crossOrigin="anonymous"
          />
          <div className="text-center sm:text-left">
            <p className="uppercase text-sm text-gray-400 font-medium mb-2">
              Playlist
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold">{person.title}</h1>
            <p className="text-sm text-gray-400 mt-2">
              {person.items.length} элементов
            </p>
          </div>
        </div>
      </div>

      {/* Десктоп: таблица */}
      {/* <div
        className={clsx(
          "px-3 pt-6 pb-16 hidden lg:block bg-[#121212] rounded-b-lg"
        )}
      >
        <div className="px-3 grid grid-cols-12 text-gray-500 mb-3 text-sm font-semibold border-b border-white/10 pb-2">
          <span className="col-span-4">Название</span>
          <span className="col-span-8">Описание</span>
        </div>

        <div className="flex flex-col gap-2 cursor-pointer">
          {person.items.map((item: any, index: number) => (
            <div
              key={item.slug || index}
              className="px-3 grid grid-cols-12 py-3 hover:bg-white/5 rounded transition"
            >
              <span className="col-span-4 font-medium truncate mr-5">
                {item.title}
              </span>
              <span className="col-span-8 text-sm text-gray-400 line-clamp-2">
                {item.description || "Описание отсутствует"}
              </span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Мобильная версия: блоки */}
      <div className="px-3 pt-6 pb-16 flex flex-col gap-4 bg-neutral-900 cursor-pointer rounded-b-lg">
        {person.items.map((item: any, index: number) => (
          <div
            key={item.slug || index}
            className="p-4 rounded-md flex flex-row items-center ease-in-out delay-50 duration-100 transition-colors hover:bg-neutral-800"
          >
            <div className="relative w-16 h-16 shrink-0 mr-5">
              <Image
                src={item.img || "/fallback.jpg"}
                alt={item.title}
                fill
                className="rounded shadow-lg w-full aspect-square object-cover mb-2"
              />
            </div>
            <div>
              <div className="font-semibold text-white text-base mb-1">
                {item.title}
              </div>
              <div className="text-sm text-gray-400 line-clamp-2 w-64 lg:w-[80%]">
                {item.description || "Описание отсутствует"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
