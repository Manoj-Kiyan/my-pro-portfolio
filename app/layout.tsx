import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; // Importing the new fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// 1. Setup Syne (Headline Font)
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

// 2. Setup Space Grotesk (Body Font)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Pro Portfolio",
  description: "High-performance portfolio built with Next.js and Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 3. Inject the font variables into the body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-neutral-950 text-white`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}