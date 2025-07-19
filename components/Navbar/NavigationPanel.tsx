"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import pages from "../../config/pages-data.json";
import { Tab, Tabs } from "@heroui/react";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const LowerInternetLogoWithLink = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-2xl font-bold text-white tracking-wide">
        НИЖНИЙ ИНТЕРНЕТ
      </span>
    </Link>
  );
};

export const MobileNavbar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <aside className="fixed top-0 w-full z-50 bg-black border-r border-white/10 flex flex-col">
      {/* Верхняя часть с заголовком */}
      <div className="flex items-center gap-2 px-4 py-3">
        <Bars3Icon
          className="w-7 h-7 text-white cursor-pointer mr-2"
          onClick={handleOpen}
        />
        <LowerInternetLogoWithLink />
      </div>
      <Drawer
        isOpen={isOpen}
        placement={"left"}
        onOpenChange={onOpenChange}
        closeButton={<div></div>}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
            },
            exit: {
              x: 100,
              opacity: 0,
            },
          },
        }}
        classNames={{
          body: "bg-black",
          base: "bg-black",
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <div>
              <DrawerHeader className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Bars3Icon
                    className="w-7 h-7 text-white cursor-pointer mr-2"
                    onClick={onClose}
                  />
                  <LowerInternetLogoWithLink />
                </div>
              </DrawerHeader>
              <DrawerBody className="px-2">
                {/* Ссылки */}
                <div className="flex flex-col gap-4 overflow-auto">
                  {pages.map((item, index) => (
                    <Link
                      key={index}
                      href={`/person/${item.slug}`}
                      onClick={onClose}
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
              </DrawerBody>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </aside>
  );
};

export const DesktopNavbar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <aside className="h-screen w-full z-50 bg-black border-r border-white/10 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3">
        <LowerInternetLogoWithLink />
      </div>
      <div className="flex flex-col gap-4 overflow-auto px-4">
        {pages.map((item, index) => (
          <Link
            key={index}
            href={`/person/${item.slug}`}
            onClick={onClose}
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
