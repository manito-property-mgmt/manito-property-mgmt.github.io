import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MANITO PROPERTY MANAGEMENT",
    default: "MANITO PROPERTY MANAGEMENT - Spokane Property Management & Rentals",
  },
  description:
    "Manito Property Management in Spokane Washington is a professional, full-service property management company that has been managing properties in the Spokane area for over a decade.",
  keywords: [
    "Spokane Property Management",
    "Spokane Property Managers",
    "Spokane Property Management Companies",
    "Property Managers in Spokane",
    "Property Management in Spokane",
    "Spokane houses for rent",
    "houses for rent in Spokane",
    "Manito Property Management",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
