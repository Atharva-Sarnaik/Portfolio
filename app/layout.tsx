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
      <body className={`${playfair.variable} antialiased`}>
        {children}
        <div
          id="gh-cursor"
          style={{
            position: 'fixed',
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 999999,
            top: '0px',
            left: '0px',
            transform: 'translate(-999px, -999px)',
            gap: '3px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="#1a1a1a" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          <span id="gh-cursor-label" style={{
            fontSize: '7px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            color: '#1a1a1a',
            textTransform: 'uppercase',
          }}>GITHUB</span>
        </div>
      </body>
    </html>
  );
}
