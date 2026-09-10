"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, AlertCircle, ExternalLink, Shield } from "lucide-react";

export default function AvailableRentalsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically inject Appfolio listing script if not already present
    const scriptId = "appfolio-listing-script";
    const existingScript = document.getElementById(scriptId);

    const initListing = () => {
      // @ts-expect-error Appfolio is attached to window
      if (window.Appfolio && window.Appfolio.Listing) {
        // @ts-expect-error Appfolio is attached to window
        window.Appfolio.Listing({
          hostUrl: "spokanearearentals.appfolio.com",
          themeColor: "#415161",
          height: "900px",
          width: "100%",
          defaultOrder: "date_available",
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://spokanearearentals.appfolio.com/javascripts/listing.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        initListing();
      };
      document.body.appendChild(script);
    } else {
      initListing();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 uppercase tracking-wide">
            Available Rental Properties
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Available properties are updated daily. To schedule a viewing appointment, call our office at{" "}
            <a href="tel:5092428144" className="font-bold text-[#415161] hover:underline">
              (509) 242-8144
            </a>
            .
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs sm:text-sm font-medium">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Showings available: Monday – Friday, 9:30am – 4:30pm (No weekend or holiday availability)</span>
          </div>

          <p className="text-xs text-gray-500">
            All showings are conducted as open house style. We allow a 15-minute grace period past the scheduled time.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Apply Here</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/rental-criteria/"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Shield className="w-4 h-4 text-gray-500" />
              <span>View Rental Criteria</span>
            </Link>
          </div>
        </div>

        {/* Requirements & Notes Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-amber-900 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Important Application Notes:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
            <li>Manito Property Management does not accept comprehensive reusable tenant screening reports.</li>
            <li>If approved for a rental, a $150 administration/document processing fee is due prior to taking occupancy.</li>
            <li>Security deposit is equivalent to one month’s rent.</li>
          </ul>
        </div>

        {/* AppFolio Listing Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-lg font-serif font-bold text-gray-800">
              Current Vacancies & Listings
            </h2>
            <a
              href="https://spokanearearentals.appfolio.com/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Open in Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div
            id="appfolio-listings-wrapper"
            ref={containerRef}
            className="w-full min-h-[500px]"
          >
            {/* The Appfolio script injects the listings iframe/markup here */}
            <div className="text-center py-12 space-y-4">
              <p className="text-gray-500 text-sm">
                Loading available listings from AppFolio Property Manager...
              </p>
              <a
                href="https://spokanearearentals.appfolio.com/listings"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold uppercase tracking-wider"
              >
                <span>View Listings Directly on AppFolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
