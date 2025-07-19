"use client";

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { MobileNavbar, DesktopNavbar } from "@/components/Navbar/NavigationPanel";
import { Chip, Tab, Tabs } from "@heroui/react";
import pages from "@/config/pages-data.json";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="lg:hidden">
            <MobileNavbar />
          </div>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="flex">
              {/* Main content scrolls normally */}
              <div className="flex flex-col flex-grow">
                <main className="flex gap-10">
                  <div className="hidden lg:block">
                  <DesktopNavbar />
                  </div>
                  <div className="container mx-auto max-w-7xl py-20">
                  {children}
                  </div>
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
