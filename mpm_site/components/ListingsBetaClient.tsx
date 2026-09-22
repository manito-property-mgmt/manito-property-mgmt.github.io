"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import listingsData from "@/data/available_listings.json";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  RotateCcw,
  LayoutGrid,
  Columns,
  Sparkles,
  Check,
  Camera,
} from "lucide-react";
import type { MapListing } from "@/components/ListingsMap";

// Dynamic import for Leaflet map to prevent SSR issues
const ListingsMap = dynamic(() => import("@/components/ListingsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] bg-slate-100 flex flex-col items-center justify-center text-gray-500 rounded-xl border border-slate-200">
      <div className="w-8 h-8 border-3 border-[#415161] border-t-transparent rounded-full animate-spin mb-2" />
      <span className="text-xs font-semibold uppercase tracking-wider">Loading Interactive Map...</span>
    </div>
  ),
});

export interface PropertyListing extends MapListing {
  city: string;
  sqft_numeric: number;
  beds: number;
  baths: number;
  photos: string[];
  description: string;
  amenities: string[];
  cats_allowed: boolean;
  dogs_allowed: boolean;
}

const PRICE_MIN_LIMIT = 500;
const PRICE_MAX_LIMIT = 4000;
const PRICE_STEP = 50;

export default function ListingsBetaClient() {
  const allListings = (listingsData.listings || []) as PropertyListing[];

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBeds, setSelectedBeds] = useState<string>("all");
  const [selectedBaths, setSelectedBaths] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [minRent, setMinRent] = useState<number>(PRICE_MIN_LIMIT);
  const [maxRent, setMaxRent] = useState<number>(PRICE_MAX_LIMIT);
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  const [catsOnly, setCatsOnly] = useState(false);
  const [dogsOnly, setDogsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("date_avail");

  // View States - default to grid view on mobile devices (< 768px), otherwise split view
  const [viewMode, setViewMode] = useState<"split" | "grid">("split");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [modalProperty, setModalProperty] = useState<PropertyListing | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number>(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Mobile defaults to grid view, desktop/tablet defaults to split view
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("grid");
    }
  }, []);

  // Extract unique cities
  const cities = useMemo(() => {
    const set = new Set<string>();
    allListings.forEach((l) => {
      if (l.city) set.add(l.city);
    });
    return Array.from(set).sort();
  }, [allListings]);

  // Filter & Sort listings
  const filteredListings = useMemo(() => {
    return allListings
      .filter((item) => {
        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const match =
            item.title.toLowerCase().includes(q) ||
            item.address.toLowerCase().includes(q) ||
            item.city.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q));
          if (!match) return false;
        }

        // City
        if (selectedCity !== "all" && item.city !== selectedCity) {
          return false;
        }

        // Beds
        if (selectedBeds !== "all") {
          const reqBeds = parseInt(selectedBeds, 10);
          if (reqBeds === 0) {
            if (item.beds !== 0) return false;
          } else {
            if (item.beds < reqBeds) return false;
          }
        }

        // Baths
        if (selectedBaths !== "all") {
          const reqBaths = parseFloat(selectedBaths);
          if (item.baths < reqBaths) return false;
        }

        // Rent range
        if (item.rent_numeric > 0) {
          if (item.rent_numeric < minRent) return false;
          if (item.rent_numeric > maxRent) return false;
        }

        // Pets
        if (catsOnly && !item.cats_allowed) return false;
        if (dogsOnly && !item.dogs_allowed) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") {
          return (a.rent_numeric || 0) - (b.rent_numeric || 0);
        }
        if (sortBy === "price_desc") {
          return (b.rent_numeric || 0) - (a.rent_numeric || 0);
        }
        if (sortBy === "sqft_desc") {
          return (b.sqft_numeric || 0) - (a.sqft_numeric || 0);
        }
        // Default: date_avail or id
        return b.id - a.id;
      });
  }, [
    allListings,
    searchTerm,
    selectedCity,
    selectedBeds,
    selectedBaths,
    minRent,
    maxRent,
    catsOnly,
    dogsOnly,
    sortBy,
  ]);

  // Reset selected property if it no longer matches filtered listings
  React.useEffect(() => {
    if (selectedPropertyId !== null && !filteredListings.some((l) => l.id === selectedPropertyId)) {
      setSelectedPropertyId(null);
    }
  }, [filteredListings, selectedPropertyId]);

  // Listings displayed on the right-hand side (filters to the clicked map pin if selected)
  const displayedListings = useMemo(() => {
    if (selectedPropertyId !== null) {
      const matched = filteredListings.filter((l) => l.id === selectedPropertyId);
      if (matched.length > 0) return matched;
    }
    return filteredListings;
  }, [filteredListings, selectedPropertyId]);

  // Dynamic sync between double-ended slider and text boxes
  const handleMinSliderChange = (newVal: number) => {
    const val = Math.min(newVal, maxRent - PRICE_STEP);
    setMinRent(val);
    setMinPriceInput(val.toLocaleString());
  };

  const handleMaxSliderChange = (newVal: number) => {
    const val = Math.max(newVal, minRent + PRICE_STEP);
    setMaxRent(val);
    setMaxPriceInput(val.toLocaleString());
  };

  const handleMinInputChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    setMinPriceInput(digits);
    if (digits === "") {
      setMinRent(PRICE_MIN_LIMIT);
    } else {
      const parsed = parseInt(digits, 10);
      if (!isNaN(parsed)) {
        setMinRent(Math.min(parsed, maxRent - PRICE_STEP));
      }
    }
  };

  const handleMaxInputChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    setMaxPriceInput(digits);
    if (digits === "") {
      setMaxRent(PRICE_MAX_LIMIT);
    } else {
      const parsed = parseInt(digits, 10);
      if (!isNaN(parsed)) {
        setMaxRent(Math.max(parsed, minRent + PRICE_STEP));
      }
    }
  };

  const handleMinInputBlur = () => {
    if (minPriceInput) {
      const digits = minPriceInput.replace(/[^0-9]/g, "");
      if (digits) {
        setMinPriceInput(parseInt(digits, 10).toLocaleString());
      }
    }
  };

  const handleMaxInputBlur = () => {
    if (maxPriceInput) {
      const digits = maxPriceInput.replace(/[^0-9]/g, "");
      if (digits) {
        setMaxPriceInput(parseInt(digits, 10).toLocaleString());
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBeds("all");
    setSelectedBaths("all");
    setSelectedCity("all");
    setMinRent(PRICE_MIN_LIMIT);
    setMaxRent(PRICE_MAX_LIMIT);
    setMinPriceInput("");
    setMaxPriceInput("");
    setCatsOnly(false);
    setDogsOnly(false);
    setSortBy("date_avail");
    setSelectedPropertyId(null);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedBeds !== "all" ||
    selectedBaths !== "all" ||
    selectedCity !== "all" ||
    minRent !== PRICE_MIN_LIMIT ||
    maxRent !== PRICE_MAX_LIMIT ||
    catsOnly ||
    dogsOnly ||
    selectedPropertyId !== null;

  const openModal = (listing: PropertyListing) => {
    setModalProperty(listing);
    setModalPhotoIndex(0);
  };

  const closeModal = () => {
    setModalProperty(null);
  };

  // Keyboard accessibility (Escape to close, Arrow keys for photos) & scroll lock
  React.useEffect(() => {
    if (!modalProperty) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft" && modalProperty.photos && modalProperty.photos.length > 1) {
        setModalPhotoIndex((prev) => (prev === 0 ? modalProperty.photos.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && modalProperty.photos && modalProperty.photos.length > 1) {
        setModalPhotoIndex((prev) => (prev === modalProperty.photos.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [modalProperty]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/houseC.jpg"
        title={
          <span className="inline-flex items-center gap-2">
            <span>Listings Explorer</span>
            <span className="bg-[#415161] text-white text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans font-bold">
              Beta
            </span>
          </span>
        }
        subtitle={
          <span>
            Explore current vacancies with filters, interactive map markers, and photo galleries.
          </span>
        }
        buttons={[
          {
            label: (
              <span className="inline-flex items-center gap-1.5">
                <span>Apply Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
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

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
          {/* Top Row: Search, View Mode Switcher, Mobile Filter Toggle */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by address, street, neighborhood, or keyword..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415161] focus:bg-white transition-all text-slate-800"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-2 justify-between lg:justify-end flex-wrap">
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setViewMode("split")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === "split"
                      ? "bg-white text-[#415161] shadow-xs font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Split View (Map + Cards)"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Split</span>
                </button>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-[#415161] shadow-xs font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Grid View (Cards Only)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>


                <a
                  href="https://spokanearearentals.appfolio.com/listings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all text-gray-600 hover:text-gray-900 hover:bg-white/80"
                  title="Open AppFolio Listings in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View in Appfolio</span>
                </a>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-lg border border-slate-200"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && "•"}</span>
              </button>
            </div>
          </div>

          {/* Filter Dropdowns Row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100 ${
              showFiltersMobile ? "block" : "hidden lg:grid"
            }`}
          >
            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Bedrooms
              </label>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-700 focus:outline-none focus:bg-white"
              >
                <option value="all">Any Beds</option>
                <option value="0">Studio</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Bathrooms
              </label>
              <select
                value={selectedBaths}
                onChange={(e) => setSelectedBaths(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-700 focus:outline-none focus:bg-white"
              >
                <option value="all">Any Baths</option>
                <option value="1">1+ Bath</option>
                <option value="1.5">1.5+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
              </select>
            </div>

            {/* Price Range: Double-ended Slider with Dynamic Text Boxes */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Price Range
                </label>
                {(minRent > PRICE_MIN_LIMIT || maxRent < PRICE_MAX_LIMIT) && (
                  <span className="text-[11px] font-semibold text-[#415161]">
                    ${minRent.toLocaleString()} – ${maxRent.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Slider Above */}
              <div className="relative w-full h-5 flex items-center px-1">
                {/* Inactive Base Track */}
                <div className="absolute left-1 right-1 h-1.5 bg-slate-200 rounded-full pointer-events-none" />

                {/* Active Colored Range Bar */}
                <div
                  className="absolute h-1.5 bg-[#415161] rounded-full pointer-events-none"
                  style={{
                    left: `${Math.max(0, Math.min(100, ((minRent - PRICE_MIN_LIMIT) / (PRICE_MAX_LIMIT - PRICE_MIN_LIMIT)) * 100))}%`,
                    right: `${Math.max(0, Math.min(100, 100 - ((maxRent - PRICE_MIN_LIMIT) / (PRICE_MAX_LIMIT - PRICE_MIN_LIMIT)) * 100))}%`,
                  }}
                />

                {/* Min Slider Thumb */}
                <input
                  type="range"
                  min={PRICE_MIN_LIMIT}
                  max={PRICE_MAX_LIMIT}
                  step={PRICE_STEP}
                  value={minRent}
                  onChange={(e) => handleMinSliderChange(Number(e.target.value))}
                  aria-label="Minimum rent"
                  className="pointer-events-none absolute inset-0 w-full h-full appearance-none bg-transparent m-0 z-20 hover:z-30 focus:z-30 active:z-30
                    [&::-webkit-slider-runnable-track]:bg-transparent
                    [&::-moz-range-track]:bg-transparent
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#415161]
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-115
                    [&::-webkit-slider-thumb]:active:scale-120
                    [&::-moz-range-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:appearance-none
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#415161]
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-white
                    [&::-moz-range-thumb]:shadow-md
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:hover:scale-115
                    [&::-moz-range-thumb]:active:scale-120"
                />

                {/* Max Slider Thumb */}
                <input
                  type="range"
                  min={PRICE_MIN_LIMIT}
                  max={PRICE_MAX_LIMIT}
                  step={PRICE_STEP}
                  value={maxRent}
                  onChange={(e) => handleMaxSliderChange(Number(e.target.value))}
                  aria-label="Maximum rent"
                  className="pointer-events-none absolute inset-0 w-full h-full appearance-none bg-transparent m-0 z-20 hover:z-30 focus:z-30 active:z-30
                    [&::-webkit-slider-runnable-track]:bg-transparent
                    [&::-moz-range-track]:bg-transparent
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#415161]
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-115
                    [&::-webkit-slider-thumb]:active:scale-120
                    [&::-moz-range-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:appearance-none
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#415161]
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-white
                    [&::-moz-range-thumb]:shadow-md
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:hover:scale-115
                    [&::-moz-range-thumb]:active:scale-120"
                />
              </div>

              {/* [min text box] - [max text box] */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={minPriceInput}
                    onChange={(e) => handleMinInputChange(e.target.value)}
                    onBlur={handleMinInputBlur}
                    placeholder="Min"
                    className="w-full pl-6 pr-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#415161] transition-all"
                  />
                </div>

                <span className="text-gray-400 text-xs font-bold shrink-0">–</span>

                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={maxPriceInput}
                    onChange={(e) => handleMaxInputChange(e.target.value)}
                    onBlur={handleMaxInputBlur}
                    placeholder="Max"
                    className="w-full pl-6 pr-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#415161] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                City / Area
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-700 focus:outline-none focus:bg-white"
              >
                <option value="all">All Locations</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-gray-700 focus:outline-none focus:bg-white"
              >
                <option value="date_avail">Date Available</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="sqft_desc">Square Feet</option>
              </select>
            </div>
          </div>

          {/* Bottom Filter Tags & Counts */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800">
                {filteredListings.length} {filteredListings.length === 1 ? "Property" : "Properties"} Found
              </span>

              {/* Pet filter pills */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCatsOnly(!catsOnly)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    catsOnly
                      ? "bg-black text-white border border-black font-medium"
                      : "bg-white text-black border border-slate-300 hover:bg-slate-100 font-normal"
                  }`}
                >
                  Cats OK
                </button>
                <button
                  onClick={() => setDogsOnly(!dogsOnly)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    dogsOnly
                      ? "bg-black text-white border border-black font-medium"
                      : "bg-white text-black border border-slate-300 hover:bg-slate-100 font-normal"
                  }`}
                >
                  Dogs OK
                </button>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout: Split or Grid */}
        <div className={viewMode === "split" ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" : ""}>
            {/* Split View Map Column (Sticky on Desktop) */}
            {viewMode === "split" && (
              <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-32 order-2 lg:order-1">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between px-2 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                      Spokane Area Map ({filteredListings.length} Pins)
                    </span>
                    <span className="text-[11px] text-gray-400">Click any pin to filter</span>
                  </div>
                  <ListingsMap
                    listings={filteredListings}
                    selectedId={selectedPropertyId}
                    onSelectListing={(l) => {
                      setSelectedPropertyId((prev) => (prev === l.id ? null : l.id));
                      // On mobile screens, scroll smoothly to the listing card
                      if (typeof window !== "undefined" && window.innerWidth < 1024) {
                        const target = document.getElementById("listings-results-column");
                        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="w-full h-[520px] xl:h-[640px]"
                  />
                </div>
              </div>
            )}

            {/* Listings Grid Column (Right-hand side in Split view) */}
            <div
              id="listings-results-column"
              className={
                viewMode === "split"
                  ? "lg:col-span-7 xl:col-span-7 order-1 lg:order-2 space-y-4"
                  : "space-y-4"
              }
            >
              {/* Map Selection Filter Banner */}
              {selectedPropertyId !== null && (
                <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center gap-2 text-slate-800">
                    <MapPin className="w-4 h-4 text-[#415161] flex-shrink-0" />
                    <span>
                      Filtered to map selection:{" "}
                      <strong className="font-bold text-slate-900">
                        {allListings.find((l) => l.id === selectedPropertyId)?.address || "Selected Property"}
                      </strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPropertyId(null)}
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-black font-semibold cursor-pointer text-xs px-2.5 py-1 bg-white rounded-md border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Show All ({filteredListings.length})</span>
                  </button>
                </div>
              )}

              {filteredListings.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                  <p className="text-gray-700 font-semibold text-base">No properties match your current filters.</p>
                  <p className="text-xs text-gray-500">Try broadening your price range, bedroom criteria, or search term.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 px-4 py-2 bg-[#415161] hover:bg-[#313f4d] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-5 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {displayedListings.map((property) => (
                    <div
                      key={property.id}
                      id={`listing-card-${property.id}`}
                      className={`group bg-white rounded-xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                        selectedPropertyId === property.id
                          ? "border-[#415161] ring-2 ring-[#415161]/30 shadow-md"
                          : "border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      {/* Photo Thumbnail with Badges */}
                      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                        {property.image ? (
                          <Image
                            src={property.image}
                            alt={property.address}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Photo Available
                          </div>
                        )}

                        {/* Top Overlays */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                            {property.available ? `Avail: ${property.available}` : "Available Now"}
                          </span>

                          {property.photos && property.photos.length > 1 && (
                            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium rounded inline-flex items-center gap-1">
                              <Camera className="w-3 h-3" />
                              <span>{property.photos.length}</span>
                            </span>
                          )}
                        </div>

                        {/* Price Tag Overlay at bottom of image */}
                        <div className="absolute bottom-2.5 left-2.5">
                          <span className="px-3 py-1 bg-[#415161]/95 text-white font-bold text-sm sm:text-base rounded-md shadow-sm">
                            {property.rent} <span className="text-[10px] font-normal opacity-80">/ mo</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-[#415161] transition-colors">
                            {property.title || property.address}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{property.address}</span>
                          </div>

                          {/* Quick Specs */}
                          <div className="pt-2 flex items-center gap-3 text-xs text-slate-700 font-medium">
                            <div className="flex items-center gap-1">
                              <Bed className="w-3.5 h-3.5 text-slate-500" />
                              <span>{property.beds === 0 ? "Studio" : `${property.beds} bd`}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Bath className="w-3.5 h-3.5 text-slate-500" />
                              <span>{property.baths} ba</span>
                            </div>
                            {property.sqft && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{property.sqft} sq ft</span>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Pet indicators */}
                          {(property.cats_allowed || property.dogs_allowed) && (
                            <div className="flex items-center gap-2 pt-1 text-xs text-black font-normal">
                              {property.cats_allowed && <span>Cats OK</span>}
                              {property.cats_allowed && property.dogs_allowed && (
                                <span className="text-slate-400">•</span>
                              )}
                              {property.dogs_allowed && <span>Dogs OK</span>}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => openModal(property)}
                            className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
                          >
                            View Details
                          </button>

                          <a
                            href="https://manitopm.quickleasepro.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3.5 py-2 bg-[#415161] hover:bg-[#313f4d] text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            <span>Apply</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </main>

      {/* Property Details Modal */}
      {modalProperty && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 cursor-default"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs uppercase font-bold text-[#415161] tracking-wider">
                  {modalProperty.city} • Available Listing #{modalProperty.id}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                  {modalProperty.title || modalProperty.address}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Photo Slider */}
              {modalProperty.photos && modalProperty.photos.length > 0 && (
                <div className="space-y-2">
                  <div className="relative h-72 sm:h-[420px] lg:h-[480px] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    <Image
                      src={modalProperty.photos[modalPhotoIndex] || modalProperty.image}
                      alt={modalProperty.title}
                      fill
                      className="object-contain"
                    />

                    {/* Prev/Next arrows */}
                    {modalProperty.photos.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setModalPhotoIndex((prev) =>
                              prev === 0 ? modalProperty.photos.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setModalPhotoIndex((prev) =>
                              prev === modalProperty.photos.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/70 text-white text-xs font-semibold">
                          {modalPhotoIndex + 1} / {modalProperty.photos.length}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {modalProperty.photos.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
                      {modalProperty.photos.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalPhotoIndex(idx)}
                          className={`relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                            modalPhotoIndex === idx ? "border-[#415161] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Key Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500">Monthly Rent</span>
                  <div className="text-xl font-bold text-gray-900">{modalProperty.rent}</div>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500">Beds / Baths</span>
                  <div className="text-base font-bold text-gray-800">{modalProperty.bed_bath}</div>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500">Square Footage</span>
                  <div className="text-base font-bold text-gray-800">{modalProperty.sqft ? `${modalProperty.sqft} sq ft` : "N/A"}</div>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500">Availability</span>
                  <div className="text-base font-bold text-gray-800">{modalProperty.available || "Now"}</div>
                </div>
              </div>

              {/* Pet policy */}
              {(modalProperty.cats_allowed || modalProperty.dogs_allowed) && (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-black font-normal">
                  <span className="font-bold text-gray-700">Pets Allowed:</span>
                  {modalProperty.cats_allowed && <span>Cats OK</span>}
                  {modalProperty.cats_allowed && modalProperty.dogs_allowed && <span className="text-slate-400">•</span>}
                  {modalProperty.dogs_allowed && <span>Dogs OK</span>}
                </div>
              )}

              {/* Address & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">{modalProperty.address}</div>
                    <div className="text-xs text-gray-500">Spokane County, WA</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://manitopm.quickleasepro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#415161] hover:bg-[#313f4d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors"
                  >
                    <span>Apply Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {modalProperty.detail_url && (
                    <a
                      href={modalProperty.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-lg transition-colors"
                    >
                      <span>AppFolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              {modalProperty.description && (
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-base">Property Description</h4>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {modalProperty.description}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {modalProperty.amenities && modalProperty.amenities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-base">Amenities & Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modalProperty.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-[#415161] flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Showing Appointment Info */}
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1 text-xs text-blue-950">
                <div className="font-bold text-sm text-blue-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  <span>Interested in viewing this property?</span>
                </div>
                <p>
                  Showings are conducted open-house style Monday through Friday from 9:30am to 4:30pm. Please call our showings coordinator at{" "}
                  <a href="tel:5092428144" className="font-bold underline text-blue-800">
                    (509) 242-8144
                  </a>{" "}
                  to schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
