import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/shared/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revispy E-commerce Auth | Next.js Assessment",
  description:
    "A simple e-commerce app built with Next.js, MongoDB, and EmailJS for Revispy's frontend developer assessment. Includes user authentication, category selection, and protected routes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen bg-white">
          <Header />
          <div className="flex items-center justify-center py-12 px-4">
            {children}
          </div>
        </main>

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
