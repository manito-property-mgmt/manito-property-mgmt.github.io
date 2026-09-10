import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import {
  Home,
  ShieldCheck,
  Briefcase,
  Key,
  FileCheck,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/427901462.jpg"
        minHeight="min-h-[480px] lg:min-h-[550px]"
        overlayOpacity="bg-slate-900/60"
        title={
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider">
            SPOKANE PROPERTY MANAGEMENT
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

      {/* Main 3 Feature Columns */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1: Available Now */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-8 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-[#415161]">
                  <Key className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#3f3f3f]">
                  Available Now
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  View our available rental properties and submit an application
                  quickly and easily.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/available-rentals/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Column 2: Management Services */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-8 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#3f3f3f]">
                  Management Services
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We manage your properties efficiently and effectively,
                  providing exceptional service.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/management-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Column 3: Real Estate Agents */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-8 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <Home className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#3f3f3f]">
                  Real Estate Agents
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Our services provide your clients the opportunity to utilize
                  their property as a rental until they are ready to sell.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/real-estate-agent-services/"
                  className="inline-block px-7 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Portable Reports Disclaimer */}
          <div className="mt-14 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm font-medium">
              Manito Property Management does not accept comprehensive portable
              screening reports.
            </p>
          </div>

          {/* Award Badge Section */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <a
              href="https://www.expertise.com/wa/spokane/property-management"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105"
            >
              <div className="relative w-52 h-44">
                <Image
                  src="/wa_spokane_property-management_2020_transparent.svg"
                  alt="Best Property Managers in Spokane - Expertise.com"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
            <span className="text-xs text-gray-500 mt-2">
              Recognized as Top Property Managers in Spokane
            </span>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Advantage Section */}
      <section className="py-14 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 uppercase tracking-wide">
              The Manito Difference
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Over a decade of trusted residential property management in Spokane,
              Spokane Valley, Cheney, Liberty Lake, and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-gray-900 mb-1">
                Local Live Support
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct phone access during office hours and 24/7 emergency
                response from local professionals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ShieldCheck className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-gray-900 mb-1">
                Rigorous Screening
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Comprehensive criminal, credit, employment, and rental background
                checks powered by AcraNet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FileCheck className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-gray-900 mb-1">
                AppFolio Tech Advantage
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Seamless online portal for 24/7 rent payments, digital owner
                statements, and instant work orders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Briefcase className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-gray-900 mb-1">
                Boutique Attention
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We maintain a controlled portfolio size so each property receives
                care, diligence, and personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Portals Banner */}
      <section className="py-12 bg-[#415161] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider">
            Ready to Get Started?
          </h2>
          <p className="text-gray-200 text-sm max-w-2xl mx-auto">
            Whether you are looking for your next home or seeking reliable
            property management for your residential investments, we are here
            to help.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/available-rentals/"
              className="px-6 py-2.5 bg-white text-[#415161] hover:bg-gray-100 font-bold text-xs uppercase tracking-wider rounded shadow transition"
            >
              Browse Rentals
            </Link>
            <Link
              href="/contact-us/"
              className="px-6 py-2.5 border border-white text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded transition"
            >
              Contact Our Team
            </Link>
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded shadow transition"
            >
              Apply Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
