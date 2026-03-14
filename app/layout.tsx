import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CustomCursor } from "@/app/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Modern developer portfolio — Full Stack Engineer",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[var(--bg-primary)] font-sans antialiased"
        suppressHydrationWarning
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
