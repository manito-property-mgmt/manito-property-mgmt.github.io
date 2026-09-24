import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";
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
  metadataBase: new URL("https://manitopropertymgmt.com"),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Manito Property Management - Spokane Area Rentals & Property Management",
    template: "%s | Manito Property Management",
  },
  description:
    "Manito Property Management in Spokane, WA offers full-service residential property management and Spokane area rentals. Discover available homes for rent, applicant screening, digital accounting, and 24/7 maintenance.",
  keywords: [
    "Spokane Area Rentals",
    "Spokane area rentals",
    "Spokane Property Management",
    "Spokane Property Managers",
    "Spokane Property Management Companies",
    "Property Managers in Spokane",
    "Property Management in Spokane",
    "Spokane houses for rent",
    "houses for rent in Spokane",
    "Spokane apartments for rent",
    "South Hill Spokane rentals",
    "Manito Property Management",
    "residential property management Spokane",
    "Spokane rental homes",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manitopropertymgmt.com",
    siteName: "Manito Property Management - Spokane Area Rentals",
    title: "Manito Property Management - Spokane Area Rentals & Property Management",
    description:
      "Discover Spokane area rentals and boutique property management with Manito Property Management. View available homes, apply online, and access owner & tenant portals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manito Property Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manito Property Management - Spokane Area Rentals & Property Management",
    description:
      "Discover Spokane area rentals and full-service residential property management with Manito Property Management.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Manito Property Management",
  alternateName: [
    "Spokane Area Rentals",
    "Manito Property Mgmt",
    "Manito PM",
  ],
  image: "https://manitopropertymgmt.com/og-image.jpg",
  url: "https://manitopropertymgmt.com",
  telephone: "(509) 242-8140",
  email: "mpropertymanager@windermere.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2829 S Grand Blvd. Ste 101",
    addressLocality: "Spokane",
    addressRegion: "WA",
    postalCode: "99203",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.6293,
    longitude: -117.4087,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Spokane" },
    { "@type": "AdministrativeArea", name: "Spokane County" },
    { "@type": "City", name: "Liberty Lake" },
    { "@type": "City", name: "Cheney" },
    { "@type": "City", name: "Spokane Valley" },
  ],
  sameAs: [
    "https://spokanearearentals.appfolio.com/connect/users/sign_in",
    "https://spokanearearentals.appfolio.com/oportal/users/log_in",
    "https://manitopm.quickleasepro.com/",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800">
        {/* STAGING / PREVIEW BANNER - ONLY ON DEV BRANCH */}
        <div
          role="region"
          aria-label="Staging Environment Notification"
          className="bg-amber-500 text-slate-950 px-4 py-2 text-xs sm:text-sm font-medium border-b border-amber-600/50 shadow-sm relative z-50 text-center flex flex-wrap items-center justify-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Dev Environment
          </span>
          <span className="font-semibold text-slate-900">
            You are viewing <strong>dev.manitopropertymgmt.com</strong> (Staging / Testing Build)
          </span>
          <span className="hidden sm:inline text-slate-800 text-xs">
            — Changes here do not affect the live production site.
          </span>
        </div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
