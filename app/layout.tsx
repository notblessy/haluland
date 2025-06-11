import "./globals.css";

import type React from "react";
import Provider from "./provider";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import config from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haluland - Music & Movie News",
  description:
    "Your ultimate destination for music and movie entertainment news",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Haluland – Music & Movie News",
    description:
      "Haluland covers the latest music and movie news, reviews, interviews, and trending entertainment stories.",
    url: "https://haluland.com",
    siteName: "Haluland",
    images: [
      {
        url: "https://haluland.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Haluland – Music & Movie News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haluland – Music & Movie News",
    description:
      "Haluland covers the latest music and movie news, reviews, interviews, and trending entertainment stories.",
    images: ["https://haluland.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Provider googleClientId={config.GOOGLE_CLIENT_ID || ""}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
