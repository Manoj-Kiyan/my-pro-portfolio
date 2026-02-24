import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; // Importing the new fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar"; // 🔴 1. Imported your sleek new Navbar
import BootSequence from "@/components/BootSequence"; // 🔴 2. Imported the pre-loader
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";

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

// 🔴 Upgraded Metadata for a premium Cyber-OS identity
export const metadata: Metadata = {
  title: "MK | Creative Developer",
  description: "High-performance digital experiences and futuristic web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 🔴 THE FIX: Removed className="scroll-smooth" so it stops fighting Lenis! */}
      <html lang="en">
      <body
        // 🔴 Added your custom purple highlight globally!
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-neutral-950 text-white selection:bg-[#6b21a8] selection:text-white cursor-none`}
        >
        {/* 🔴 NEW: The Magnetic Cyber Cursor */}
        <CustomCursor />
        {/* 🔴 THE FIX: Added the BootSequence right here at the very top! */}
        <BootSequence />
        
        {/* Placed Navbar outside SmoothScroll so it stays perfectly locked at the top */}
        <Navbar />
        {/* 🔴 NEW: The Command Center Modal */}
        <CommandPalette />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
    </>
  );
}