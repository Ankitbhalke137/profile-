import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";
import { Nav } from "@/components/nav";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ankitbhalke.vercel.app";

const title = "Ankit Bhalke — Software Engineer";
const description =
  "Software engineer building full-stack products with TypeScript, Next.js, Node.js, and PostgreSQL. CS student at PW Institute of Innovation. I've shipped a multi-tenant ERP, a WebRTC calling PWA, and an end-to-end encrypted collaboration platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Ankit Bhalke",
  },
  description,
  applicationName: "Ankit Bhalke — Portfolio",
  authors: [{ name: "Ankit Bhalke", url: siteUrl }],
  creator: "Ankit Bhalke",
  keywords: [
    "Ankit Bhalke",
    "software engineer",
    "full-stack developer",
    "SDE internship",
    "Next.js developer",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ankit Bhalke",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} min-h-screen bg-bg font-sans text-ink antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only z-[100] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-[#171208] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CursorGlow />
          <Nav />
          <CommandPalette />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
