"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  author: string;
  role: string;
  timeAgo: string;
  avatarInitials: string;
  avatarColor: string;
  rating: number;
  headline: string;
  content: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    author: "Sarah Mitchell",
    role: "Tenant • South Hill Spokane",
    timeAgo: "2 weeks ago",
    avatarInitials: "SM",
    avatarColor: "bg-blue-600",
    rating: 5,
    headline: "Fast maintenance & great communication",
    content:
      "Maintenance is always handled within 24 hours and paying rent online is effortless. Best rental experience in Spokane!",
  },
  {
    id: 2,
    author: "David & Karen Peterson",
    role: "Property Owners • Eagle Ridge",
    timeAgo: "1 month ago",
    avatarInitials: "DP",
    avatarColor: "bg-emerald-600",
    rating: 5,
    headline: "Stress-free management for owners",
    content:
      "Manito handles tenant placement and upkeep with total integrity. Clear monthly statements and always prompt deposits.",
  },
  {
    id: 3,
    author: "Marcus Reynolds",
    role: "Tenant • North Spokane",
    timeAgo: "3 weeks ago",
    avatarInitials: "MR",
    avatarColor: "bg-indigo-600",
    rating: 5,
    headline: "Seamless move-in experience",
    content:
      "The application was simple, approval took just two days, and the home was spotless and move-in ready.",
  },
  {
    id: 4,
    author: "Jennifer Hayes",
    role: "Property Owner • Spokane Valley",
    timeAgo: "2 months ago",
    avatarInitials: "JH",
    avatarColor: "bg-amber-600",
    rating: 5,
    headline: "Zero vacancy & quality tenants",
    content:
      "Our property was listed and leased to great tenants in under two weeks. Spot-on pricing and thorough screening.",
  },
  {
    id: 5,
    author: "Brian Vance",
    role: "Tenant • Perry District",
    timeAgo: "1 month ago",
    avatarInitials: "BV",
    avatarColor: "bg-teal-600",
    rating: 5,
    headline: "Emergency repairs handled in hours",
    content:
      "Called dispatch on a Sunday and a plumber arrived in under two hours to fix our water heater. Dependable and fast.",
  },
  {
    id: 6,
    author: "Elena Rostova",
    role: "Realtor Partner • Spokane Association of Realtors",
    timeAgo: "3 weeks ago",
    avatarInitials: "ER",
    avatarColor: "bg-rose-600",
    rating: 5,
    headline: "Trusted partner for client referrals",
    content:
      "They care for every home like their own and keep owners informed. Clients constantly thank me for introducing them.",
  },
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive cards per view: 1 on mobile (<640), 2 on tablet (640-1024), 3 on desktop (>=1024)
  const windowWidth = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth,
    () => 1200
  );

  const cardsPerView = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, reviewsData.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
  };

  return (
    <section
      className="py-8 sm:py-10 bg-white border-t border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Viewport */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="px-2.5 sm:px-3 flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="h-full bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col space-y-2">
                    {/* Top: Stars (Rich Gold) */}
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]"
                        />
                      ))}
                    </div>

                    {/* Headline */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {review.headline}
                    </h3>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-5 sm:pt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#597db9]"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#597db9] hover:border-[#597db9]/50 flex items-center justify-center shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#597db9] hover:border-[#597db9]/50 flex items-center justify-center shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
