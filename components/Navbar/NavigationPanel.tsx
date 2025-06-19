"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import pages from "../../config/pages-data.json";
import { Tab, Tabs } from "@heroui/react";

const Navbar = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { title: "Главная", href: "/" },
    { title: "Влад Савельев", href: "/vlad-saveliev" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let moved = false;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      moved = false;
    };

    const onMouseLeave = () => {
      isDragging = false;
      container.classList.remove("dragging");
    };

    const onMouseUp = () => {
      isDragging = false;
      container.classList.remove("dragging");

      // предотвращаем клик, если был drag
      if (moved) {
        const links = container.querySelectorAll("a");
        links.forEach((link) => {
          (link as HTMLElement).style.pointerEvents = "auto";
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) moved = true;

      container.scrollLeft = scrollLeft - walk;

      // блокируем клики по ссылкам во время drag
      const links = container.querySelectorAll("a");
      links.forEach((link) => {
        (link as HTMLElement).style.pointerEvents = moved ? "none" : "auto";
      });
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const router = useRouter();

  return (
    <aside className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="flex items-center gap-2 px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white tracking-wide">
            НИЖНИЙ ИНТЕРНЕТ
          </span>
        </Link>
      </div>

      <div className="flex gap-4 px-4 py-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab select-none">
        {pages.map((item, index) => (
          <Link
            key={index}
            href={`/person/${item.slug}`}
            className={clsx(
              "whitespace-nowrap text-sm font-medium px-4 py-2 rounded-full transition-colors snap-start",
              pathname === `/person/${item.slug}`
                ? "bg-white text-black"
                : "hover:bg-white/10 text-white"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Navbar;
