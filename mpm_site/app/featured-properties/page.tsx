import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import PortfolioGallery from "@/components/PortfolioGallery";
import { residentialPortfolio } from "@/data/portfolio";
import { Info } from "lucide-react";

export const metadata = {
  title: "Featured Properties - Spokane Residential Properties",
  description:
    "Explore our featured properties of managed single family homes, apartments, duplexes, and townhomes across Spokane, the South Hill, and Spokane County.",
};

export default function FeaturedPropertiesPage() {
  const propertyTypes = [
    "Single Family Homes",
    "Apartments",
    "Multi-Family Dwellings",
    "Condominiums",
    "Duplexes",
    "Townhomes",
  ];

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/185086630.jpg"
        title="Featured Properties"
        subtitle="Our featured properties represent homes and rentals throughout the Spokane area. From Cheney to Liberty Lake & Colbert to the Palouse, we cover a broad but limited market area to ensure quality service."
      />

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Availability Notice Banner */}
          <div className="bg-blue-50/90 border border-blue-200/90 rounded-xl p-4 sm:p-5 text-center max-w-3xl mx-auto flex items-center justify-center gap-2.5 shadow-sm">
            <Info className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-blue-900 font-medium leading-relaxed">
              Not all featured properties are available at this time. Please see our{" "}
              <Link
                href="/available-rentals/"
                className="font-bold underline text-blue-700 hover:text-blue-900 transition-colors"
              >
                Available Properties
              </Link>{" "}
              for current vacancies.
            </p>
          </div>

          {/* Property Types List Card */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 mb-6">
              Here are a few of the rental property types we manage:
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              {propertyTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#415161] flex-shrink-0" />
                  <span className="font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid with interactive Lightbox */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Featured Properties Gallery
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Click any photo to open full-screen view
              </p>
            </div>

            <PortfolioGallery properties={residentialPortfolio} />
          </div>
        </div>
      </section>
    </div>
  );
}
