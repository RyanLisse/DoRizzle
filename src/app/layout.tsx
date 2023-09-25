import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Provider } from "./_trpc/Provider";
import Navbar from "@/components/Navbar";
import React from "react";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo App",
  description: "simple ToDo management system built with a modern tech stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className=" dark:bg-gray-950 bg-stone-200  dark:text-stone-200 text-stone-800 transition-colors duration-500">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
