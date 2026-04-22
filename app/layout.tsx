import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://section174tracker.com"),
  title: {
    default: "Section 174 Tracker | Model R&D Tax Cash Flow Impact",
    template: "%s | Section 174 Tracker",
  },
  description:
    "Track Section 174 amortization impact on taxes, cash flow, and runway. Built for CFOs and founders at profitable software companies.",
  keywords: [
    "Section 174 calculator",
    "R&D tax amortization",
    "software tax planning",
    "phantom income",
    "SaaS CFO tools",
  ],
  openGraph: {
    title: "Section 174 Tracker",
    description:
      "See how mandatory 5-year R&D amortization increases taxes and compresses runway.",
    type: "website",
    url: "https://section174tracker.com",
    siteName: "Section 174 Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Section 174 Tracker",
    description:
      "A practical calculator for modeling Section 174 tax impact on profitable software companies.",
  },
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
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
