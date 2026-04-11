import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; 
import "./globals.css";
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
  title: "MANOJ KIYAN | Creative Developer",
  description: "High-performance digital experiences, secure architectures, and futuristic web applications engineered by Manoj Kiyan.",
  keywords: ["Creative Developer", "Frontend Engineer", "Next.js", "React", "Cyber Security", "Blue Feather'z", "Web3", "UI/UX"],
  authors: [{ name: "Manoj Kiyan" }],
  creator: "Manoj Kiyan",
  
  // 🔴 OpenGraph: This controls how it looks on WhatsApp, LinkedIn, iMessage, and Discord!
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mk-portfolio.vercel.app", 
    title: "MANOJ KIYAN | Cyber Analyst & Developer",
    description: "Bridging the gap between Design & Logic. Explore my execution logs and system architecture.",
    siteName: "MK | System Mainframe",
    images: [
      {
        url: "/og-image.jpg", // This is the image we are about to add!
        width: 1200,
        height: 630,
        alt: "Manoj Kiyan - Creative Developer Holographic Badge",
      },
    ],
  },
  
  // 🔴 Twitter: Controls how it looks when tweeted!
  twitter: {
    card: "summary_large_image",
    title: "MANOJ KIYAN | Creative Developer",
    description: "High-performance digital experiences and futuristic web applications.",
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
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}