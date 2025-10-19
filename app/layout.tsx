import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Financial News API",
  description: "Free API for financial news aggregated from multiple RSS feeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
