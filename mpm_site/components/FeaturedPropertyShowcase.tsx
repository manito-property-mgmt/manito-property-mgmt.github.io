"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import listingsData from "@/data/available_listings.json";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { PropertyListing } from "@/components/AvailableRentalsClient";

interface ShowcaseProperty extends PropertyListing {
  date_available?: string;
  deposit?: string;
}

export default function FeaturedPropertyShowcase() {
  // Always dynamically select the most expensive property from current listings
  const property = useMemo(() => {
    const list = (listingsData.listings || []) as ShowcaseProperty[];
    if (!list.length) return null;
    return [...list].sort(
      (a, b) => (b.rent_numeric || 0) - (a.rent_numeric || 0)
    )[0];
  }, []);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const photos = useMemo(() => {
    if (!property) return [];
    if (property.photos && property.photos.length > 0) return property.photos;
    if (property.image) return [property.image];
    return [];
  }, [property]);

  // Automatic slideshow for the photos
  useEffect(() => {
    if (isPaused || photos.length <= 1) return;
    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, photos.length]);

  if (!property) return null;

  const cleanTitle = property.title.replace(/\*\*/g, "").trim();

  const nextPhoto = () => {
    if (!photos.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    if (!photos.length) return;
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Extract first 4 highlighted amenities
  const highlights = (property.amenities || []).slice(0, 4);

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden border-t border-[#2e5284]/30"
      style={{
        background:
          "linear-gradient(to right, #1e3a63 0%, #39639e 30%, #597db9 50%, #84abdf 75%, #bed9f7 100%)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - hugging the left side */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight drop-shadow-md">
            Property Showcase
          </h2>
        </div>

        {/* Showcase Card with Square Ridge CSS Border in Rare Gold (#c5a059) */}
        <div
          className="max-w-6xl mx-auto border-[6px] sm:border-[8px] border-[#c5a059] bg-white shadow-2xl overflow-hidden"
          style={{ borderStyle: "ridge" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* LEFT: Automatic & Interactive Photo Gallery */}
            <div className="lg:col-span-7 bg-slate-900 relative flex flex-col justify-between min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
              {/* Main Active Photo */}
              <div className="relative flex-1 w-full min-h-[320px] sm:min-h-[380px] overflow-hidden group/image">
                {photos.length > 0 ? (
                  <Image
                    src={photos[activePhotoIndex]}
                    alt={`${cleanTitle} - Photo ${activePhotoIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No photo available
                  </div>
                )}

                {/* Top Badges over image (only photo counter) */}
                {photos.length > 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 shadow-sm">
                      {activePhotoIndex + 1} / {photos.length} Photos
                    </span>
                  </div>
                )}

                {/* Prev / Next Photo Buttons */}
                {photos.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        prevPhoto();
                      }}
                      className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105 shadow-md"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        nextPhoto();
                      }}
                      className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105 shadow-md"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Row Preview (clean borders, no glow) */}
              {photos.length > 1 && (
                <div className="bg-slate-950/90 border-t border-slate-800/80 p-2 sm:p-3 overflow-x-auto flex items-center gap-2 scrollbar-thin">
                  {photos.slice(0, 7).map((photoUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-150 ${
                        activePhotoIndex === idx
                          ? "border-[#597db9] opacity-100"
                          : "border-transparent opacity-50 hover:opacity-90"
                      }`}
                      aria-label={`Select photo ${idx + 1}`}
                    >
                      <Image
                        src={photoUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                  {photos.length > 7 && (
                    <Link
                      href="/available-rentals/"
                      className="px-3 py-2 text-xs font-bold text-gray-300 hover:text-white whitespace-nowrap bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                    >
                      +{photos.length - 7} more
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT: Property Details, Specs, & Call To Actions */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
              <div className="space-y-4">
                {/* Status Bar */}
                {property.date_available && (
                  <div>
                    <span className="text-xs font-semibold text-[#7d7836] bg-[#7d7836]/10 border border-[#7d7836]/30 px-2.5 py-1 rounded-md">
                      Available: {property.date_available}
                    </span>
                  </div>
                )}

                {/* Price Tag */}
                <div className="pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#363638] tracking-tight font-serif">
                      {property.rent}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      / month
                    </span>
                  </div>
                  {property.deposit && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Security Deposit: {property.deposit}
                    </p>
                  )}
                </div>

                {/* Title & Full Address */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {cleanTitle}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{property.address}</span>
                  </p>
                </div>

                {/* Specs Pill Grid (Beds, Baths, Sqft) */}
                <div className="grid grid-cols-3 gap-2.5 py-2">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                      <Bed className="w-3.5 h-3.5 text-[#5e7cae]" />
                      <span>Beds</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {property.beds > 0 ? property.beds : "Studio"}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                      <Bath className="w-3.5 h-3.5 text-[#5e7cae]" />
                      <span>Baths</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {property.baths}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#5e7cae]" />
                      <span>Sq Ft</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {property.sqft || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Key Amenities - matching checkmark style from Available Rentals page */}
                {highlights.length > 0 && (
                  <div className="pt-1 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Amenities & Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {highlights.map((amenity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-gray-700 p-2 bg-slate-50 rounded-lg border border-slate-100"
                        >
                          <Check className="w-3.5 h-3.5 text-[#597db9] flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Buttons */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Link
                    href="/available-rentals/"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#597db9] hover:bg-[#486b9f] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all group/btn"
                  >
                    <span>More Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  <a
                    href="https://manitopm.quickleasepro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#597db9] border-2 border-[#597db9] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>Apply Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center text-xs text-slate-500 pt-1">
                  <div className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#597db9]" />
                    <span>Schedule showing: <a href="tel:5092428144" className="font-bold text-slate-800 hover:text-[#597db9] hover:underline">(509) 242-8144</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
