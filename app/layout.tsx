import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sniplink — Turn clicks into insights",
  description:
    "Sniplink is the modern link management platform for short links, conversion tracking, and QR code generation.",
  keywords: [
    "url shortener",
    "link shortener",
    "short links",
    "qr code",
    "link management",
    "analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
