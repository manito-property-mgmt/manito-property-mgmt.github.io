"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PortfolioProperty } from "@/data/portfolio";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface PortfolioGalleryProps {
  properties: PortfolioProperty[];
}

export default function PortfolioGallery({ properties }: PortfolioGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const prevProperty = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! > 0 ? prev! - 1 : properties.length - 1
    );
  };

  const nextProperty = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! < properties.length - 1 ? prev! + 1 : 0
    );
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevProperty();
      if (e.key === "ArrowRight") nextProperty();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="w-full">
      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {properties.map((property, idx) => (
          <div
            key={property.id}
            onClick={() => openLightbox(idx)}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <Image
                src={property.thumb}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-gray-800 p-2.5 rounded-full shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-white text-center border-t border-gray-100">
              <h3 className="font-serif font-bold text-gray-800 text-base tracking-wide group-hover:text-[#415161] transition-colors">
                {property.title}
              </h3>
              {property.type && (
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  {property.type}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top toolbar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-semibold tracking-wide">
              {properties[selectedIndex].title}
              <span className="text-xs text-gray-400 ml-3">
                ({selectedIndex + 1} of {properties.length})
              </span>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Display */}
          <div
            className="relative w-full max-w-5xl h-[70vh] sm:h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Button */}
            <button
              onClick={prevProperty}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full">
              <Image
                src={properties[selectedIndex].full}
                alt={properties[selectedIndex].title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Right Button */}
            <button
              onClick={nextProperty}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom caption */}
          <div
            className="mt-3 text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium">
              {properties[selectedIndex].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
