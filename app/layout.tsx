import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CustomCursor } from "@/app/components/ui/custom-cursor";
import { site, navSocial } from "@/data/portfolio";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pranshusite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Priyanshu Kumar | Pranshu Portfolio — MERN Stack Developer",
    template: "%s | Priyanshu Kumar Portfolio",
  },
  description:
    "Priyanshu Kumar (Pranshu) — MERN Stack Developer portfolio. React, Next.js, Node.js, MongoDB. View projects, certifications & contact. Priyanshu portfolio, Pranshu portfolio, Priyanshu developer.",
  keywords: [
    "Priyanshu Kumar",
    "Pranshu portfolio",
    "Priyanshu portfolio",
    "Priyanshu developer",
    "Pranshu developer",
    "MERN stack developer",
    "Full stack developer portfolio",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "Priyanshu Kumar portfolio",
    "developer portfolio India",
  ],
  authors: [{ name: "Priyanshu Kumar", url: SITE_URL }],
  creator: "Priyanshu Kumar",
  publisher: "Priyanshu Kumar",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Priyanshu Kumar — Portfolio",
    title: "Priyanshu Kumar | Pranshu Portfolio — MERN Stack Developer",
    description:
      "Portfolio of Priyanshu Kumar (Pranshu). MERN Stack Developer — React, Next.js, Node.js, MongoDB. Projects, certifications & contact.",
    images: [
      {
        url: "/images/gallery/prannshu.jpg",
        width: 1200,
        height: 630,
        alt: "Priyanshu Kumar — MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Kumar | Pranshu Portfolio — MERN Stack Developer",
    description:
      "MERN Stack Developer portfolio. React, Next.js, Node.js. Priyanshu portfolio · Pranshu developer.",
    images: ["/images/gallery/prannshu.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
  },
  category: "portfolio",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: site.title,
              url: SITE_URL,
              description:
                "Priyanshu Kumar (Pranshu) — MERN Stack Developer. React, Next.js, Node.js, MongoDB. Portfolio with projects, certifications and contact.",
              sameAs: navSocial.map((s) => s.href),
              knowsAbout: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
              image: `${SITE_URL}/images/gallery/prannshu.jpg`,
            }),
          }}
        />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
