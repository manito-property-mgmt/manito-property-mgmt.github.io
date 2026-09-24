"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { residentialPortfolio, PortfolioProperty } from "@/data/portfolio";

export default function PortfolioCarousel() {
  const properties = residentialPortfolio;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = properties.length;

  // Track responsive screen width for responsive 3D card layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

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
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Circular offset calculation relative to currentIndex
  const getOffset = (index: number) => {
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Card transform styles mimicking the iconic 3D tilted showcase
  const getCardStyle = (diff: number) => {
    // Only render/compute for visible items (|diff| <= 2)
    if (Math.abs(diff) > 2) {
      return {
        transform: "translate(-50%, -50%) scale(0.5)",
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 0,
      };
    }

    if (diff === 0) {
      // Center card: straight, prominent, elevated
      return {
        transform: "translate(-50%, -50%) translateX(0%) translateY(0px) rotate(0deg) scale(1.02)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
      };
    }

    if (diff === -1) {
      // Left card: shifted left, tilted/rotated counter-clockwise (left)
      const translateX = isMobile ? "-36%" : isTablet ? "-48%" : "-56%";
      const rotate = isMobile ? "-3.5deg" : isTablet ? "-4.5deg" : "-5deg";
      const scale = isMobile ? "0.85" : isTablet ? "0.88" : "0.9";
      const translateY = isMobile ? "6px" : isTablet ? "8px" : "10px";

      return {
        transform: `translate(-50%, -50%) translateX(${translateX}) translateY(${translateY}) rotate(${rotate}) scale(${scale})`,
        opacity: isMobile ? 0.65 : 0.8,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    if (diff === 1) {
      // Right card: shifted right, tilted/rotated clockwise (right)
      const translateX = isMobile ? "36%" : isTablet ? "48%" : "56%";
      const rotate = isMobile ? "3.5deg" : isTablet ? "4.5deg" : "5deg";
      const scale = isMobile ? "0.85" : isTablet ? "0.88" : "0.9";
      const translateY = isMobile ? "6px" : isTablet ? "8px" : "10px";

      return {
        transform: `translate(-50%, -50%) translateX(${translateX}) translateY(${translateY}) rotate(${rotate}) scale(${scale})`,
        opacity: isMobile ? 0.65 : 0.8,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    if (diff === -2) {
      // Far left card fading out/in
      return {
        transform: "translate(-50%, -50%) translateX(-104%) translateY(16px) rotate(-9deg) scale(0.74)",
        opacity: 0,
        zIndex: 10,
        pointerEvents: "none" as const,
      };
    }

    if (diff === 2) {
      // Far right card fading out/in
      return {
        transform: "translate(-50%, -50%) translateX(104%) translateY(16px) rotate(9deg) scale(0.74)",
        opacity: 0,
        zIndex: 10,
        pointerEvents: "none" as const,
      };
    }

    return {
      transform: "translate(-50%, -50%) scale(0.5)",
      opacity: 0,
      pointerEvents: "none" as const,
      zIndex: 0,
    };
  };

  return (
    <div
      className="w-full relative select-none pt-0 pb-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient backlight glow behind the center card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[620px] md:w-[780px] lg:w-[1020px] xl:w-[1180px] h-[260px] sm:h-[340px] lg:h-[430px] xl:h-[470px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Tilted Cards Viewport */}
      <div
        className="relative w-full max-w-[1440px] mx-auto h-[260px] sm:h-[320px] md:h-[385px] lg:h-[440px] xl:h-[475px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1300px" }}
      >
        {properties.map((property: PortfolioProperty, idx: number) => {
          const diff = getOffset(idx);
          if (Math.abs(diff) > 2) return null; // Keep DOM lean

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          return (
            <div
              key={property.id}
              onClick={() => {
                if (isLeft) prevSlide();
                else if (isRight) nextSlide();
              }}
              style={getCardStyle(diff)}
              className={`absolute top-1/2 left-1/2 w-[88vw] max-w-[360px] sm:max-w-[520px] md:max-w-[660px] lg:max-w-[780px] xl:max-w-[860px] h-[230px] sm:h-[290px] md:h-[350px] lg:h-[400px] xl:h-[435px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                isCenter
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-2 ring-white/35"
                  : "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.65)] ring-1 ring-white/15 hover:ring-white/30"
              }`}
            >
              {/* Property Image */}
              <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                <Image
                  src={property.thumb || property.full}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 780px"
                  priority={idx === 0 || idx === 1}
                  className={`object-cover transition-transform duration-700 ${
                    isCenter ? "group-hover:scale-105" : "brightness-90 group-hover:brightness-100"
                  }`}
                />

                {/* Left/Right Dimmer Overlay to direct focus to center card */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors" />
                )}

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
                    {property.type || "Spokane Residence"}
                  </span>
                </div>

                {/* Bottom Content Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pt-14 pb-3.5 sm:pb-5 px-4 sm:px-6 z-10 flex items-end justify-between gap-4 text-left">
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow truncate">
                      {property.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-medium truncate mt-0.5">
                      Spokane, Washington
                    </p>
                  </div>

                  {isCenter ? (
                    <Link
                      href="/featured-properties/"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md border border-white/30 transition-all duration-200 shrink-0 shadow-md"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="hidden sm:inline-block text-xs text-white/70 font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                      {isLeft ? "← Click to view" : "Click to view →"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating Side Arrow Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous featured property"
          className="absolute left-1 sm:left-3 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next featured property"
          className="absolute right-1 sm:right-3 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Carousel Navigation Dots (Closer to the bottom of the backdrop) */}
      <div className="mt-4 sm:mt-5 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {properties.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to property ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-white shadow-sm"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
