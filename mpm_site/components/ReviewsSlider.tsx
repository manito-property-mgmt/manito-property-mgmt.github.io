"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from "lucide-react";

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
    headline: "Fast maintenance and wonderful communication!",
    content:
      "Manito Property Management has been fantastic since the day we moved in. Any routine maintenance requests are addressed within 24 hours, the AppFolio online portal makes paying rent effortless, and the office staff is always friendly and professional. Wow, such good management! Best rental experience we've had in Spokane.",
  },
  {
    id: 2,
    author: "David & Karen Peterson",
    role: "Property Owners • Eagle Ridge",
    timeAgo: "1 month ago",
    avatarInitials: "DP",
    avatarColor: "bg-emerald-600",
    rating: 5,
    headline: "Stress-free management for our rental properties",
    content:
      "As out-of-state property owners, we needed a team we could completely rely on. Manito handles our tenant placement, lease enforcement, and property maintenance with total integrity. Monthly statements are crystal clear, and direct deposits are always prompt. Truly top-tier property management from true local experts!",
  },
  {
    id: 3,
    author: "Marcus Reynolds",
    role: "Tenant • North Spokane",
    timeAgo: "3 weeks ago",
    avatarInitials: "MR",
    avatarColor: "bg-indigo-600",
    rating: 5,
    headline: "Seamless application & move-in experience",
    content:
      "The QuickLeasePro application process was so easy and transparent. We toured the home, applied online, and received approval within two business days. The house was professionally cleaned and move-in ready. Wow, such good management! You rarely find rental companies that genuinely take pride in their homes.",
  },
  {
    id: 4,
    author: "Jennifer Hayes",
    role: "Property Owner • Spokane Valley",
    timeAgo: "2 months ago",
    avatarInitials: "JH",
    avatarColor: "bg-amber-600",
    rating: 5,
    headline: "Zero vacancy downtime & quality tenants",
    content:
      "They had our rental home photographed, listed on MLS, and leased to great tenants in less than two weeks. Their screening process is thorough and their market knowledge of Spokane rental rates is spot on. I couldn't be happier with their hands-on service and attentiveness.",
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
      "Our water heater had an issue on a Sunday evening. I called their 24/7 emergency dispatch line, and a licensed plumber was at our door in less than two hours to fix it. Fast response, respectful technicians, and honest property management. Highly recommend them to anyone looking to rent in Spokane.",
  },
  {
    id: 6,
    author: "Elena Rostova",
    role: "Realtor Partner • Spokane Association of Realtors",
    timeAgo: "3 weeks ago",
    avatarInitials: "ER",
    avatarColor: "bg-rose-600",
    rating: 5,
    headline: "Trusted partner for all my client referrals",
    content:
      "I refer all my real estate clients who need rental property management directly to Manito. They treat every home as if it were their own and keep owners thoroughly informed. Wow, such good management! Clients constantly thank me for introducing them to this boutique team.",
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

  const cardsPerView = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
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
      className="py-12 sm:py-16 bg-white border-t border-slate-200/80 overflow-hidden"
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
                  <div className="h-full bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 relative group">
                    <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100 group-hover:text-slate-200/70 transition-colors pointer-events-none" />

                    <div className="space-y-3">
                      {/* Top: Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Headline */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        &ldquo;{review.headline}&rdquo;
                      </h3>

                      {/* Review Text */}
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-5">
                        {review.content}
                      </p>
                    </div>

                    {/* Author & Verification Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${review.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {review.avatarInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {review.author}
                            </span>
                            <span title="Verified Client" className="inline-flex">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50 shrink-0" />
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {review.role}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {review.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 sm:pt-10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#415161]"
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
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95"
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
