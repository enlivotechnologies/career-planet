import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://careerplanet.com"),
  title: {
    default: "Career Planet - Your Career Growth Partner",
    template: "%s | Career Planet",
  },
  icons: {
    icon: "/icon.png",
  },
  description:
    "Career Planet helps you achieve your career goals with expert guidance, job opportunities, and professional development resources.",
  keywords: [
    "career",
    "jobs",
    "employment",
    "career growth",
    "professional development",
    "job search",
  ],
  authors: [{ name: "Career Planet" }],
  creator: "Career Planet",
  publisher: "Career Planet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Career Planet",
    title: "Career Planet - Your Career Growth Partner",
    description:
      "Career Planet helps you achieve your career goals with expert guidance, job opportunities, and professional development resources.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Career Planet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Planet - Your Career Growth Partner",
    description:
      "Career Planet helps you achieve your career goals with expert guidance, job opportunities, and professional development resources.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

import LayoutWrapper from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
