import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import PortfolioCarousel from "@/components/PortfolioCarousel";


export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/427901462.jpg"
        minHeight="min-h-[320px] sm:min-h-[350px] lg:min-h-[380px]"
        overlayOpacity="bg-slate-900/60"
        title={
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider">
            manito property management
          </span>
        }
        subtitle={
          <div className="space-y-3 pt-2 text-gray-200">
            <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
              If you are a current tenant, owner or vendor please contact us by
              phone Monday-Friday 9am-5pm at{" "}
              <a
                href="tel:5092428140"
                className="font-bold text-white underline hover:text-blue-300"
              >
                (509) 242-8140
              </a>
              . If you are inquiring about a property or have questions about our
              application process please contact directly at{" "}
              <a
                href="tel:5092428144"
                className="font-bold text-white underline hover:text-blue-300"
              >
                (509) 242-8144
              </a>
              .
            </p>
          </div>
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
            <div className="text-center flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#3f3f3f]">
                  Available Now
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  View our available rental properties and submit an application
                  quickly and easily.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/available-rentals/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Column 2: Management Services */}
            <div className="text-center flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#3f3f3f]">
                  Management Services
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  We manage your properties efficiently and effectively,
                  providing exceptional service.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/management-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Column 3: Real Estate Agents */}
            <div className="text-center flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#3f3f3f]">
                  Real Estate Agents
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  Our services provide your clients the opportunity to utilize
                  their property as a rental until they are ready to sell.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/real-estate-agent-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
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
