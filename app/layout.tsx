import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DesignHour - Curated Tools for Designers",
  description:
    "Discover the best design tools, animation libraries, and UI components. Curated collection of 40+ resources for designers and developers.",
  keywords:
    "design tools, animation libraries, UI components, GSAP, Framer Motion, Lottie, React components, web design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
