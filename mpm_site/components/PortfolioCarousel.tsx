"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { residentialPortfolio, PortfolioProperty } from "@/data/portfolio";

export default function PortfolioCarousel() {
  const properties = residentialPortfolio;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive items count: max 3 properties
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, properties.length - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Not all featured properties are available at this time, please see{" "}
              <Link
                href="/available-rentals/"
                className="font-semibold text-[#415161] hover:underline"
              >
                Available Properties
              </Link>
              .
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/featured-properties/"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#415161] hover:text-[#32404e] transition-colors mr-2"
            >
              <span>View All Featured Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={prevSlide}
              aria-label="Previous property"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next property"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {properties.map((property: PortfolioProperty) => (
              <div
                key={property.id}
                className="flex-shrink-0 px-3 sm:px-3.5"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <Link
                  href="/featured-properties/"
                  className="group block bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={property.thumb || property.full}
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-[#415161] transition-colors truncate">
                      {property.title}
                    </h3>
                    {property.type && (
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        {property.type}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-[#415161]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
