"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  FileText,
  ExternalLink,
} from "lucide-react";

interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

// Primary navigation links placed on the LEFT of the centered logo (like hammercoffee.com)
const leftNavItems: NavItem[] = [
  {
    label: "Properties",
    children: [
      { label: "Available Rentals", href: "/available-rentals/" },
      { label: "Our Portfolio", href: "/our-portfolio/" },
    ],
  },
  {
    label: "Tenants",
    children: [
      { label: "Tenant Portal", href: "/tenant-portal/" },
      { label: "Maintenance Request", href: "/maintenance-request/" },
      { label: "Tenant Resources", href: "/tenant-resources/" },
      { label: "Evacuation Plans", href: "/evacuation-plans/" },
    ],
  },
  {
    label: "Owners",
    children: [
      { label: "Owner Portal", href: "/owner-portal/" },
      { label: "Owner Resources", href: "/owner-resources/" },
      { label: "Management Services", href: "/management-services/" },
    ],
  },
];

// Secondary navigation links placed on the RIGHT of the centered logo
const rightNavItems: NavItem[] = [
  { label: "Rental Criteria", href: "/rental-criteria/" },
  { label: "Contact", href: "/contact-us/" },
  { label: "Q&A", href: "/qa/" },
];

const allNavItems = [...leftNavItems, ...rightNavItems];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
  };

  const toggleDropdown = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdown and mobile menu on route changes
  useEffect(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(null);
    closeMobile();
  }, [pathname]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileGroup(null);
  };

  const isActive = (item: NavItem) => {
    if (item.href) {
      if (item.href === "/" && pathname === "/") return true;
      if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    }
    if (item.children) {
      return item.children.some(
        (child) => !child.external && pathname.startsWith(child.href)
      );
    }
    return false;
  };

  const renderNavGroup = (items: NavItem[]) => {
    return (
      <div className="flex items-center gap-2 xl:gap-3.5 2xl:gap-5">
        {items.map((item) => {
          const active = isActive(item);
          const isSelected = openDropdown === item.label || active;

          if (item.children) {
            const isOpen = openDropdown === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={isOpen}
                  className={`group relative inline-flex items-center gap-1 px-2.5 py-2 text-[11px] xl:text-xs 2xl:text-[13px] font-bold tracking-wider uppercase transition-colors rounded-md ${
                    isSelected
                      ? "text-[#415161]"
                      : "text-gray-700 hover:text-[#415161]"
                  }`}
                >
                  <span className="relative py-1">
                    {item.label}
                    {/* Animated Underline Indicator (matches hammercoffee.com) */}
                    <span
                      className={`absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#415161] transform transition-all duration-300 origin-center ${
                        isSelected
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#415161]" : "text-gray-400 group-hover:text-[#415161]"
                    }`}
                  />
                </button>

                {/* Dropdown Menu with hover bridge */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-full pt-1.5 w-60 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      {item.children.map((child) => {
                        if (child.external) {
                          return (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold tracking-wide uppercase transition-colors text-gray-700 hover:bg-slate-50 hover:text-[#415161] group"
                            >
                              <span>{child.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#415161]" />
                            </a>
                          );
                        }

                        const childActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-xs font-semibold tracking-wide uppercase transition-colors ${
                              childActive
                                ? "bg-slate-100 text-[#415161] font-bold"
                                : "text-gray-700 hover:bg-slate-50 hover:text-[#415161]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`group relative px-2.5 py-2 text-[11px] xl:text-xs 2xl:text-[13px] font-bold tracking-wider uppercase transition-colors rounded-md ${
                isSelected
                  ? "text-[#415161]"
                  : "text-gray-700 hover:text-[#415161]"
              }`}
            >
              <span className="relative py-1">
                {item.label}
                {/* Animated Underline Indicator (matches hammercoffee.com) */}
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#415161] transform transition-all duration-300 origin-center ${
                    isSelected
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b ${
        isScrolled
          ? "shadow-md border-gray-200"
          : "shadow-sm border-gray-100"
      }`}
    >
      {/* Top Brand Accent Stripe (matches hammercoffee's .header-stripe) */}
      <div className="w-full h-[3px] bg-[#415161]" />

      {/* Main Navigation Bar */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={`relative flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "h-16 lg:h-18"
              : "h-20 sm:h-24 lg:h-28"
          }`}
        >
          {/* LEFT ZONE: Primary Navigation (aligned to center logo) */}
          <nav className="hidden lg:flex items-center flex-1 justify-end pr-3 xl:pr-5 2xl:pr-8">
            {renderNavGroup(leftNavItems)}
          </nav>

          {/* MOBILE LEFT: Hamburger Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 -ml-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* CENTER ZONE: Centered Brand Logo */}
          <div className="flex-shrink-0 flex items-center justify-center z-20 lg:static absolute left-1/2 -translate-x-1/2 lg:translate-x-0">
            <Link
              href="/"
              className="flex items-center justify-center group focus:outline-none py-1"
              aria-label="Manito Property Management - Home"
            >
              <div
                className={`relative flex items-center justify-center rounded-lg border border-slate-200/90 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] group-hover:border-[#415161]/50 group-hover:shadow-md transition-all duration-300 ${
                  isScrolled
                    ? "p-1 sm:p-1.5"
                    : "p-1.5 sm:p-2 lg:p-2.5"
                }`}
              >
                <Image
                  src="/uploads/6/6/2/9/66293977/published/manito-pm-logo-blue-black-final-1.jpg"
                  alt="Manito Property Management"
                  width={350}
                  height={200}
                  priority
                  className={`w-auto object-contain block group-hover:scale-[1.02] transition-all duration-300 ${
                    isScrolled
                      ? "h-9 sm:h-10 lg:h-11 xl:h-12"
                      : "h-12 sm:h-14 lg:h-16 xl:h-[72px]"
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* RIGHT ZONE: Secondary Navigation (aligned to center logo) + Vertically Stacked CTA Unit */}
          <div className="hidden lg:flex items-center flex-1 justify-start pl-3 xl:pl-5 2xl:pl-8">
            {renderNavGroup(rightNavItems)}

            {/* Vertically Stacked CTA Unit: Apply Now above, Login below */}
            <div className="flex flex-col items-stretch justify-center gap-1 ml-auto flex-shrink-0">
              {/* Apply Now Pill CTA Button (Above) */}
              <a
                href="https://manitopm.quickleasepro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-3.5 py-1 text-[10px] xl:text-[11px] font-bold tracking-wider uppercase text-white bg-[#415161] hover:bg-[#313f4d] rounded-full shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap min-w-[100px]"
              >
                <FileText className="w-3 h-3" />
                <span>Apply Now</span>
              </a>

              {/* Login Dropdown Button (Below) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Login")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown("Login")}
                  aria-expanded={openDropdown === "Login"}
                  className={`w-full inline-flex items-center justify-center gap-1 px-3 py-0.5 text-[10px] xl:text-[11px] font-bold tracking-wider uppercase transition-colors rounded-full border whitespace-nowrap min-w-[100px] ${
                    openDropdown === "Login"
                      ? "bg-slate-100 text-[#415161] border-gray-300"
                      : "border-gray-200 text-gray-700 hover:text-[#415161] hover:border-[#415161]/40 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-3 h-3 text-[#415161]" />
                  <span>Login</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openDropdown === "Login"
                        ? "rotate-180 text-[#415161]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Login Dropdown Card with hover bridge */}
                {openDropdown === "Login" && (
                  <div
                    className="absolute right-0 top-full pt-1.5 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter("Login")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Client Portals
                      </div>
                      <a
                        href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-800 group-hover:text-[#415161]">
                          Tenant Login
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          Pay rent & maintenance requests
                        </div>
                      </a>

                      <a
                        href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-800 group-hover:text-[#415161]">
                          Owner Login
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          Monthly statements & financials
                        </div>
                      </a>

                      <div className="my-1.5 border-t border-gray-100" />

                      <div className="px-4 py-1 flex items-center justify-between text-[11px]">
                        <Link
                          href="/tenant-portal/"
                          className="text-[#415161] hover:text-blue-600 hover:underline font-medium"
                        >
                          Tenant Portal Info
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                          href="/owner-portal/"
                          className="text-[#415161] hover:text-blue-600 hover:underline font-medium"
                        >
                          Owner Portal Info
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE RIGHT: Apply Button */}
          <div className="flex lg:hidden items-center">
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-wider bg-[#415161] hover:bg-[#313f4d] text-white px-3.5 py-1.5 rounded-full shadow-sm transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Prominent Mobile Portals & Application Header */}
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-center">
              <a
                href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1f2937] hover:bg-slate-800 text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Tenant Login</span>
              </a>
              <a
                href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1f2937] hover:bg-slate-800 text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Owner Login</span>
              </a>
            </div>
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#415161] hover:bg-[#313f4d] text-white py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
            >
              <FileText className="w-4 h-4" />
              <span>Apply Online Now</span>
            </a>
          </div>

          <div className="space-y-1">
            {allNavItems.map((item) => {
              const active = isActive(item);
              if (item.children) {
                const isExpanded = openMobileGroup === item.label;
                return (
                  <div key={item.label} className="border-b border-gray-100 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileGroup(isExpanded ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-gray-800"
                    >
                      <span className={active ? "text-[#415161]" : ""}>
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pb-2 space-y-1 bg-slate-50 rounded-lg p-2 mt-1">
                        {item.children.map((child) => {
                          if (child.external) {
                            return (
                              <a
                                key={child.href}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMobile}
                                className="flex items-center justify-between py-1.5 text-xs font-medium uppercase tracking-wide text-gray-600 hover:text-black"
                              >
                                <span>{child.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMobile}
                              className={`block py-1.5 text-xs font-medium uppercase tracking-wide ${
                                pathname.startsWith(child.href)
                                  ? "text-[#415161] font-bold"
                                  : "text-gray-600 hover:text-black"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.label} className="border-b border-gray-100 py-1">
                  <Link
                    href={item.href!}
                    onClick={closeMobile}
                    className={`block py-2 text-sm font-bold uppercase tracking-wider ${
                      active ? "text-[#415161]" : "text-gray-800 hover:text-[#415161]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Mobile Direct Contact Details */}
          <div className="mt-5 pt-4 border-t border-gray-200 text-xs space-y-2 text-gray-600">
            <p className="font-semibold text-gray-800">Manito Property Management</p>
            <p>2829 S Grand Blvd. Ste 101, Spokane, WA 99203</p>
            <p>
              Office:{" "}
              <a href="tel:5092428140" className="text-[#415161] font-bold">
                (509) 242-8140
              </a>
            </p>
            <p>
              Showings:{" "}
              <a href="tel:5092428144" className="text-[#415161] font-bold">
                (509) 242-8144
              </a>
            </p>
            <p>
              Maintenance Emergency:{" "}
              <a href="tel:5092428142" className="text-red-600 font-bold">
                (509) 242-8142
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
