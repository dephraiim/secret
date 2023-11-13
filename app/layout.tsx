import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Secret",
  description: "Share a secret with anyone, securely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          calSans.variable,
          jetbrains.variable
        )}
      >
        <main className="flex min-h-screen flex-col items-center text-foreground mx-auto w-8/12 p-10">
          <div className="flex w-full justify-between">
            <Link href="/">
              <div className="font-display text-3xl">Secret</div>
            </Link>
            <a
              href="https://github.com/dephraiim/secret"
              className="text-xl text-foreground/60 hover:underline cursor-pointer"
            >
              Github
            </a>
          </div>

          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
