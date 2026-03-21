import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: 'Atharva Sarnaik — Generative AI Application Developer',
  description: 'Portfolio of Atharva Sarnaik. Building intelligent AI-powered apps exploring Machine Learning & Generative AI.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Atharva Sarnaik — Generative AI Application Developer',
    description: 'Building intelligent AI-powered apps exploring Machine Learning & Generative AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
