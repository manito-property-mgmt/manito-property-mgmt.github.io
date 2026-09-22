import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";

export const metadata = {
  title: "Sitemap & Page Directory",
  description:
    "Complete directory and sitemap of all pages, tenant & owner portals, Spokane area rental listings, and resources for Manito Property Management.",
};

interface SitemapGroup {
  category: string;
  description: string;
  links: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function SitemapPage() {
  const sitemapGroups: SitemapGroup[] = [
    {
      category: "Properties & Spokane Area Rentals",
      description: "Search available homes, review criteria, and explore managed properties.",
      links: [
        {
          title: "Available Rentals",
          href: "/available-rentals/",
          description: "Browse available Spokane area rental homes, duplexes, and apartments.",
        },
        {
          title: "Listings (Beta)",
          href: "/listings-beta/",
          description: "Interactive map and filtered search of all current rental vacancies.",
        },
        {
          title: "Rental Criteria & Applications",
          href: "/rental-criteria/",
          description: "Tenant screening criteria, Resident Benefits Package, and application info.",
        },
        {
          title: "Featured Properties",
          href: "/featured-properties/",
          description: "Overview of managed single family homes, duplexes, and multi-family dwellings.",
        },
        {
          title: "Property Showcase",
          href: "/our-portfolio1/",
          description: "Visual showcase of rental properties across Spokane and the South Hill.",
        },
      ],
    },
    {
      category: "Tenant Hub & Portals",
      description: "Online rent payments, maintenance coordination, and tenant utilities.",
      links: [
        {
          title: "Tenant Portal",
          href: "/tenant-portal/",
          description: "Make rent payments via ACH/eCheck, view payment history, and manage your account.",
        },
        {
          title: "Tenant Resources",
          href: "/tenant-resources/",
          description: "Local Spokane utilities (Avista, City of Spokane), moving checklist, and office policies.",
        },
        {
          title: "Maintenance Requests",
          href: "/maintenance-request/",
          description: "Submit written routine maintenance requests or contact 24/7 emergency dispatch.",
        },
        {
          title: "Evacuation Plans",
          href: "/evacuation-plans/",
          description: "Emergency fire evacuation routes and safety diagrams for multi-family dwellings.",
        },
      ],
    },
    {
      category: "Property Owner Hub & Services",
      description: "Financial oversight, management programs, and investor resources.",
      links: [
        {
          title: "Owner Portal",
          href: "/owner-portal/",
          description: "Access 24/7 monthly statements, cash flow reports, and expense invoices.",
        },
        {
          title: "Management Services",
          href: "/management-services/",
          description: "Full-service management: tenant screening, digital accounting, and maintenance.",
        },
        {
          title: "Owner Resources",
          href: "/owner-resources/",
          description: "Spokane County property tax links, IRS guidance, and mortgage options.",
        },
        {
          title: "Real Estate Agent Services",
          href: "/real-estate-agent-services/",
          description: "Client return guarantee program and partnerships for licensed real estate brokers.",
        },
      ],
    },
    {
      category: "Company & General Information",
      description: "Get in touch, browse FAQs, or view office details.",
      links: [
        {
          title: "Home",
          href: "/",
          description: "Manito Property Management homepage and company overview.",
        },
        {
          title: "Contact Us",
          href: "/contact-us/",
          description: "Office location on Grand Blvd, direct phone lines, hours, and message form.",
        },
        {
          title: "Frequently Asked Questions (Q&A)",
          href: "/qa/",
          description: "Answers to common questions for tenants, applicants, and property owners.",
        },
      ],
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/427901462.jpg"
        title="Site Index & Directory"
        subtitle="Quickly find pages, client portals, rental listings, and resources across Manito Property Management."
      />

      <div className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {sitemapGroups.map((group) => (
              <div
                key={group.category}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
              >
                <div className="pb-3 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    {group.category}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {group.description}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group block p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-slate-50 transition"
                      >
                        <span className="text-sm font-semibold text-[#415161] group-hover:text-blue-600 transition-colors block">
                          {link.title}
                        </span>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {link.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
