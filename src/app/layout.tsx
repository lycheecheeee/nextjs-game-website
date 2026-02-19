import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astro 候補生計劃 | 官方網站",
  description: "成為閃耀的偶像，開啟你的演藝之路。Astro 候補生計劃是一款結合角色養成、音樂節奏與故事劇情的偶像培育遊戲。",
  keywords: ["Astro", "偶像遊戲", "音樂遊戲", "角色養成", "手機遊戲", "偶像培育"],
  authors: [{ name: "Astro Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Astro 候補生計劃",
    description: "成為閃耀的偶像，開啟你的演藝之路",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
