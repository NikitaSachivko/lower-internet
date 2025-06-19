"use client";

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import NavigationPanel from "@/components/Navbar/NavigationPanel";
import { Chip, Tab, Tabs } from "@heroui/react";
import pages from "@/config/pages-data.json";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="min-h-screen">
          <NavigationPanel />
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="flex">
              {/* Sidebar that scrolls with the page */}
              {/* <aside className="w-60 border-r border-white/10 bg-black p-4">
                <Tabs
                  aria-label="Navigation"
                  isVertical
                  variant="bordered"
                  classNames={{
                    tab: "",
                  }}
                >
                  {pages.map((item, index) => (
                    <Tab
                      key={index}
                      title={item.title}
                      onClick={() => {
                        setTimeout(() => {
                          router.push(`/person/${item.slug}`);
                        }, 200);
                      }}
                    ></Tab>
                  ))}
                </Tabs>
              </aside> */}

              {/* Main content scrolls normally */}
              <div className="flex flex-col flex-grow">
                <main className="container mx-auto max-w-7xl py-5 md:py-10 lg:py-20">
                  {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3">
                  {/* Optional footer */}
                </footer>
              </div>
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
