import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { ExternalLink } from "lucide-react";


export const metadata = {
  title: "Spokane Area Rentals & Property Management",
  description:
    "Manito Property Management offers Spokane area rentals and full-service residential property management. Browse homes for rent, schedule showings, and apply online.",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/427901462.jpg"
        overlayOpacity="bg-slate-900/60"
        title={
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider">
            manito property management
          </span>
        }
        subtitle={
          <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed text-gray-200 pt-2">
            Manito Property Management is locally owned and operating in Spokane,
            Washington, committed to making all things property management and
            real estate a seamless experience for our tenants, owners, and
            clients.
          </p>
        }
        buttons={[
          {
            label: "Tenant Portal",
            href: "/tenant-portal/",
            variant: "primary",
          },
          {
            label: "Owner Portal",
            href: "/owner-portal/",
            variant: "primary",
          },
        ]}
      />

      {/* Moving Portfolio Slideshow/Carousel */}
      <PortfolioCarousel />

      {/* Main 3 Feature Columns */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1: Available Now */}
            <div className="text-center flex flex-col items-center space-y-4">
              <div className="w-full flex justify-center">
                <Link
                  href="/available-rentals/"
                  className="inline-flex items-center justify-center gap-2.5 w-full max-w-[310px] px-6 py-3.5 sm:py-4 rounded-lg bg-[#415161] hover:bg-[#32404e] text-white text-sm sm:text-base font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-[#32404e] group"
                >
                  <span>Available Now</span>
                  <ExternalLink className="w-4 h-4 shrink-0 text-white/90 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                View our available rental properties and submit an application
                quickly and easily.
              </p>
            </div>

            {/* Column 2: Management Services */}
            <div className="text-center flex flex-col items-center space-y-4">
              <div className="w-full flex justify-center">
                <Link
                  href="/management-services/"
                  className="inline-flex items-center justify-center gap-2.5 w-full max-w-[310px] px-6 py-3.5 sm:py-4 rounded-lg bg-[#415161] hover:bg-[#32404e] text-white text-sm sm:text-base font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-[#32404e] group"
                >
                  <span>Management Services</span>
                  <ExternalLink className="w-4 h-4 shrink-0 text-white/90 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                We manage your properties efficiently and effectively,
                providing exceptional service.
              </p>
            </div>

            {/* Column 3: Real Estate Agents */}
            <div className="text-center flex flex-col items-center space-y-4">
              <div className="w-full flex justify-center">
                <Link
                  href="/real-estate-agent-services/"
                  className="inline-flex items-center justify-center gap-2.5 w-full max-w-[310px] px-6 py-3.5 sm:py-4 rounded-lg bg-[#415161] hover:bg-[#32404e] text-white text-sm sm:text-base font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-[#32404e] group"
                >
                  <span>Real Estate Agents</span>
                  <ExternalLink className="w-4 h-4 shrink-0 text-white/90 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                Our services provide your clients the opportunity to utilize
                their property as a rental until they are ready to sell.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
