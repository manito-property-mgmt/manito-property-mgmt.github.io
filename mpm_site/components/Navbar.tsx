"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
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
      { label: "Maintenance Request", href: "/maintenance-request/" },
      { label: "Tenant Portal", href: "/tenant-portal/" },
      { label: "Tenant Resources", href: "/tenant-resources/" },
      { label: "Evacuation Plans", href: "/evacuation-plans/" },
    ],
  },
  {
    label: "Owners",
    children: [
      { label: "Owner Portal", href: "/owner-portal/" },
      { label: "Owner Resources", href: "/owner-resources/" },
    ],
  },
  {
    label: "Real Estate Agents",
    children: [
      {
        label: "Real Estate Agent Services",
        href: "/real-estate-agent-services/",
      },
    ],
  },
  {
    label: "Management Services",
    children: [
      { label: "Management Services", href: "/management-services/" },
      { label: "Our Portfolio", href: "/our-portfolio1/" },
    ],
  },
  { label: "Rental Criteria", href: "/rental-criteria/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Q&A", href: "/qa/" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

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
      return item.children.some((child) => pathname.startsWith(child.href));
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all">
      {/* Top Utility / Contact Bar */}
      <div className="bg-[#1f2937] text-gray-200 text-xs py-2 px-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="tel:5092428140"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Office: <strong className="text-white font-semibold">(509) 242-8140</strong></span>
            </a>
            <a
              href="tel:5092428144"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Showings & Info: <strong className="text-white font-semibold">(509) 242-8144</strong></span>
            </a>
            <a
              href="tel:5092428142"
              className="hidden sm:flex items-center gap-1.5 hover:text-red-300 transition-colors text-red-200"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Emergency: <strong className="text-white font-semibold">(509) 242-8142</strong></span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon-Fri 9:00am - 5:00pm</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 transition"
            >
              <User className="w-3 h-3 text-blue-400" />
              <span>Tenant Login</span>
            </a>
            <a
              href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 transition"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Owner Login</span>
            </a>
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-0.5 rounded font-medium transition"
            >
              <FileText className="w-3 h-3" />
              <span>Apply Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <div className="relative w-48 sm:w-56 h-14">
              <Image
                src="/uploads/6/6/2/9/66293977/published/manito-pm-logo-blue-black-final-1.jpg"
                alt="Manito Property Management"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              if (item.children) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-md ${
                        active
                          ? "text-[#415161] border-b-2 border-[#415161]"
                          : "text-gray-700 hover:text-[#415161] hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#415161]" : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.children.map((child) => {
                          const childActive = pathname.startsWith(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-xs font-semibold tracking-wide uppercase transition-colors ${
                                childActive
                                  ? "bg-slate-100 text-[#415161] font-bold"
                                  : "text-gray-600 hover:bg-slate-50 hover:text-[#415161]"
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
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-md ${
                    active
                      ? "text-[#415161] border-b-2 border-[#415161]"
                      : "text-gray-700 hover:text-[#415161] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider bg-[#415161] text-white px-3 py-1.5 rounded"
            >
              Apply
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Quick Action Buttons on Mobile */}
          <div className="grid grid-cols-2 gap-2 mb-4 pb-3 border-b border-gray-100 text-center">
            <a
              href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 text-white py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Tenant Login</span>
            </a>
            <a
              href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 text-white py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Login</span>
            </a>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
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
                        {item.children.map((child) => (
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
                        ))}
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
              <a href="tel:5092428140" className="text-blue-600 font-bold">
                (509) 242-8140
              </a>
            </p>
            <p>
              Showings:{" "}
              <a href="tel:5092428144" className="text-blue-600 font-bold">
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
