"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import pagesData from "../../../config/pages-data.json";
import clsx from "clsx";
import Link from "next/link";

const getSpelling = (length: number) => {
  if (length === 1) return "элемент";
  if (length > 1 && length < 5) return "элемента";
  return "элементов";
};

// демонс
// lxmxmm

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const person = pagesData.find((p: any) => p.slug === slug);

  if (!person) {
    return <div className="p-8 text-center text-red-500">Не найдено</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="z-[2]">
        <div className="w-full rounded-t-xl px-6 py-6 bg-neutral-900">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <Image
              src={person.items?.[0]?.img || "/fallback.jpg"}
              alt={person.title}
              width={240}
              height={240}
              className="rounded shadow-xl w-64 h-64 object-cover"
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

        <div className="px-3 pt-6 pb-16 flex flex-col gap-4 bg-neutral-900/80 cursor-pointer rounded-b-xl z-[2]">
          {person.items.map((item: any, index: number) => (
            <Link href={item.href} key={item.slug || index} target="_blank" rel="noopener noreferrer">
              <div className="p-4 rounded-md flex flex-row items-center ease-in-out delay-50 duration-100 transition-colors hover:bg-neutral-800">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
