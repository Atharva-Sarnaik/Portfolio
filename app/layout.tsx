import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Atharva Sarnaik — AI Application Developer",
  description:
    "Building AI-powered applications with Generative AI and real-world use cases. B.Tech AI & Data Science undergraduate portfolio.",
  keywords: [
    "Atharva Sarnaik",
    "AI Developer",
    "Generative AI",
    "Machine Learning",
    "NLP",
    "Portfolio",
  ],
  openGraph: {
    title: "Atharva Sarnaik — AI Application Developer",
    description:
      "Building AI-powered applications with Generative AI and real-world use cases.",
    type: "website",
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
