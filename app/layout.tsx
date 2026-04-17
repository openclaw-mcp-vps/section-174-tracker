import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "@/app/globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://section174tracker.com"),
  title: "Section 174 Tracker | Model R&D Tax Cash Flow Impact",
  description:
    "Track how Section 174 capitalization affects tax bills, cash flow, and runway for software companies.",
  openGraph: {
    title: "Section 174 Tracker",
    description:
      "A Section 174 calculator for profitable software companies facing phantom-income tax bills.",
    type: "website",
    url: "https://section174tracker.com",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen font-[var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
