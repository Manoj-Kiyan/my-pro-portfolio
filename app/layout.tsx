import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; 
import "./globals.css";
//import "@/app/globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar"; 
import BootSequence from "@/components/BootSequence"; 
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

// 🔴 THE UPGRADE: Premium SEO, OpenGraph, and Twitter Card Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://mk-portfolio.vercel.app"),
  title: "MANOJ KIYAN MK | Full Stack Developer & QA Automation Engineer",
  description: "End-to-end web applications, automation frameworks, and robust software solutions engineered by Manoj Kiyan.",
  keywords: ["Full Stack Developer", "Java Developer", "QA Automation Engineer", "Selenium", "Next.js", "React", "Core Java"],
  authors: [{ name: "Manoj Kiyan" }],
  creator: "Manoj Kiyan",
  
  // 🔴 OpenGraph: This controls how it looks on WhatsApp, LinkedIn, iMessage, and Discord!
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mk-portfolio.vercel.app", 
    title: "MANOJ KIYAN MK | Java Developer & QA Automation Engineer",
    description: "Delivering scalable Web & Automation solutions. Explore my projects and system architecture.",
    siteName: "MK | System Mainframe",
    images: [
      {
        url: "/og-image.jpg", // This is the image we are about to add!
        width: 1200,
        height: 630,
        alt: "Manoj Kiyan - Full Stack Developer Holographic Badge",
      },
    ],
  },
  
  // 🔴 Twitter: Controls how it looks when tweeted!
  twitter: {
    card: "summary_large_image",
    title: "MANOJ KIYAN MK| Full Stack Developer & QA Automation Engineer",
    description: "End-to-end web applications and automation frameworks.",
    images: ["/og-image.jpg"],
  },
  
  // Tells Google to actively crawl and rank your website!
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-neutral-950 text-white selection:bg-[#6b21a8] selection:text-white cursor-none`}
        >
        <CustomCursor />
        <BootSequence />
        <Navbar />
        <CommandPalette />
        <SmoothScroll>
          {/* 🔴 THE FIX: Added md:pl-20 to push content right of the sidebar! */}
          <div className="md:pl-20">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}