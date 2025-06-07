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
