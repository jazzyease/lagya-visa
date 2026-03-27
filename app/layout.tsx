import type { Metadata } from "next";
import localFont from "next/font/local";

import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "./fonts/instrument-serif-400.woff2",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lagya Visa",
  description: "Luxury visa and travel landing page inspired by premium Framer experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
