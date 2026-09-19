"use client";

import React, { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";

export default function AvailableRentalsClient() {
  const [iframeHeight, setIframeHeight] = useState("950px");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for resize messages sent by the AppFolio listings iframe
    const handleMessage = (e: MessageEvent) => {
      try {
        const dataFromIframe =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!dataFromIframe) return;

        const { eventType, data, iframe_id } = dataFromIframe;

        if (iframe_id === "af_iframe_listings") {
          if (eventType === "new_height" && typeof data === "number") {
            setIframeHeight(`${data + 30}px`);
            setIsLoading(false);
          } else if (eventType === "scrollToTop") {
            const wrapper = document.getElementById("appfolio-listings-wrapper");
            wrapper?.scrollIntoView({ behavior: "smooth" });
          }
        }
      } catch {
        // Ignore non-JSON messages from other extensions or tools
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/houseC.jpg"
        title="Available Rentals"
        subtitle={
          <span>
            Available properties are updated daily. To schedule a viewing appointment, call our office at{" "}
            <a href="tel:5092428144" className="font-bold underline text-white hover:text-gray-200">
              (509) 242-8144
            </a>
            .
          </span>
        }
        buttons={[
          {
            label: (
              <span className="inline-flex items-center gap-2">
                <span>Apply Here</span>
                <ExternalLink className="w-4 h-4" />
              </span>
            ),
            href: "https://manitopm.quickleasepro.com/",
            isExternal: true,
            variant: "primary",
          },
          {
            label: "View Rental Criteria",
            href: "/rental-criteria/",
            variant: "secondary",
          },
        ]}
      />

      <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Showing Information */}
          <div className="text-center space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs sm:text-sm font-medium">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Showings available: Monday – Friday, 9:30am – 4:30pm (No weekend or holiday availability)</span>
            </div>

            <p className="text-xs text-gray-500">
              All showings are conducted as open house style. We allow a 15-minute grace period past the scheduled time.
            </p>
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
            className="relative w-full min-h-[600px]"
          >
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center py-16 bg-white/90 z-10">
                <Loader2 className="w-8 h-8 text-[#415161] animate-spin mb-3" />
                <p className="text-sm text-gray-600 font-medium">
                  Loading available listings from AppFolio...
                </p>
              </div>
            )}

            <iframe
              id="af_iframe_listings"
              title="Available Rental Properties"
              src="https://spokanearearentals.appfolio.com/listings?theme_color=%23415161&filters%5Border_by%5D=date_available&iframe_id=af_iframe_listings"
              style={{
                width: "100%",
                height: iframeHeight,
                border: 0,
              }}
              onLoad={() => setIsLoading(false)}
              className="w-full transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
