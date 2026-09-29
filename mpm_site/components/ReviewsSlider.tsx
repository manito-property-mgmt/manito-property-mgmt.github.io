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

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

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
      className="py-16 sm:py-24 bg-white border-t border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <GoogleIcon className="w-4 h-4" />
              <span>Google Reviews & Attestations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight">
              Trusted by Spokane Residents & Owners
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl">
              See what tenants and property owners have to say about our
              hands-on, boutique property management service.
            </p>
          </div>

          {/* Google Summary Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-xs shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
              <GoogleIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 font-serif">4.9</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Over 120+ Verified Client Reviews
              </p>
            </div>
          </div>
        </div>

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
                      {/* Top: Stars & Google Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                          <GoogleIcon className="w-3.5 h-3.5" />
                          <span>Google</span>
                        </div>
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
                            <span title="Verified Reviewer" className="inline-flex">
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

          {/* Navigation Arrows */}
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
