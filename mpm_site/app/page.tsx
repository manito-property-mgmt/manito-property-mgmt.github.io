import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import PortfolioCarousel from "@/components/PortfolioCarousel";


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
            label: "Tenant Resources",
            href: "/tenant-resources/",
            variant: "primary",
          },
          {
            label: "Owner Resources",
            href: "/owner-resources/",
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
              <div>
                <Link
                  href="/available-rentals/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Available Now
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                View our available rental properties and submit an application
                quickly and easily.
              </p>
            </div>

            {/* Column 2: Management Services */}
            <div className="text-center flex flex-col items-center space-y-4">
              <div>
                <Link
                  href="/management-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Management Services
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                We manage your properties efficiently and effectively,
                providing exceptional service.
              </p>
            </div>

            {/* Column 3: Real Estate Agents */}
            <div className="text-center flex flex-col items-center space-y-4">
              <div>
                <Link
                  href="/real-estate-agent-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Real Estate Agents
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

      {/* Why Choose Us / Advantage Section */}
      <section className="py-14 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 uppercase tracking-wide">
              The Manito Difference
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Over a decade of trusted residential property management in Spokane,
              Spokane Valley, Cheney, Liberty Lake, and surrounding areas.
            </p>
          </div>

          {/* Top Property Badge */}
          <div className="flex flex-col items-center justify-center">
            <a
              href="https://www.expertise.com/wa/spokane/property-management"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105 bg-[#415161] hover:bg-[#32404e] rounded-xl p-3.5 sm:p-4 shadow-md border border-[#32404e] transition-colors"
            >
              <div className="relative w-36 h-28 sm:w-44 sm:h-36">
                <Image
                  src="/uploads/6/6/2/9/66293977/wa_spokane_property-management_2026_inverse.png"
                  alt="Best Property Managers in Spokane 2026 - Expertise.com"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
            <span className="text-xs text-gray-600 mt-3 font-medium">
              Recognized as Top Property Managers in Spokane
            </span>
            <p className="text-xs text-gray-500 mt-3 text-center max-w-lg mx-auto">
              Manito Property Management does not accept comprehensive portable
              screening reports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
