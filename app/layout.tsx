import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce App",
  keywords: [
    "E-commerce",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Vercel",
    "API",
    "Fake Store API",
    "Product Listing",
    "Shopping Cart",
    "Responsive Design",
    "Web Development",
    "Frontend Development",
    "Web Application",
    "Modern Web",
    "Web Design",
    "User Interface",
    "UI",
    "User Experience",
    "UX",
    "Web App",
    "Frontend Framework",
    "JavaScript",
    "CSS",
    "HTML",
    "Web Technologies",
    "Web Development Tools",
    "Web Performance",
    "Web Standards",
    "Web Accessibility",
    "Web Best Practices",
    "Web Development Trends",
  ],
  authors: [
    {
      name: "Yeboah William",
      url: "https://yourwebsite.com",
    },
  ],
  creator: "Yeboah William",
  openGraph: {
    title: "E-commerce App",
    description:
      "A modern e-commerce application built with Next.js and Tailwind CSS.",
    url: "https://yourwebsite.com",
    siteName: "E-commerce App",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-commerce App OG Image",
      },
    ],
  },
  description:
    "A modern e-commerce application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="min-h-[100dvh] flex flex-col justify-between">
            <div>
              <NavBar />
              {children}
            </div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
