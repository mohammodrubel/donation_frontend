import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GlobalProvider from "@/lib/reudx/reduxProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "DonateBridge - Connect Donors with Causes",
    template: "%s | DonateBridge",
  },
  description:
    "A transparent donation platform connecting generous donors with verified NGO campaigns.",
  applicationName: "DonateBridge",
  keywords: [
    "donation",
    "charity",
    "NGO",
    "fundraising",
    "campaigns",
    "donate",
    "volunteer",
  ],
  authors: [{ name: "DonateBridge" }],
  icons: {
    icon: [
      { url: "/donation.png", type: "image/png" },
      { url: "/donation.png", sizes: "32x32", type: "image/png" },
      { url: "/donation.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/donation.png",
    apple: "/donation.png",
  },
  openGraph: {
    title: "DonateBridge - Connect Donors with Causes",
    description:
      "A transparent donation platform connecting generous donors with verified NGO campaigns.",
    siteName: "DonateBridge",
    images: [
      {
        url: "/donation.png",
        width: 512,
        height: 512,
        alt: "DonateBridge",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DonateBridge - Connect Donors with Causes",
    description:
      "A transparent donation platform connecting generous donors with verified NGO campaigns.",
    images: ["/donation.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GlobalProvider>
          <Toaster />
          {children}
          <Analytics />
        </GlobalProvider>
      </body>
    </html>
  );
}