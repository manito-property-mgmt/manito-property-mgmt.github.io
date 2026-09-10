import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider font-serif">
              Company
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              We are a small team of committed property management professionals
              that have been managing homes and small unit properties in Spokane
              for over a decade. With a focus on quality, we pride ourselves on
              service and personal attention to detail. Our small boutique approach
              to management ensures we never outgrow our commitment of service and
              quality.
            </p>
            <p className="text-sm text-gray-300 font-medium">
              Call us to see how we can tailor a management plan for you and your
              properties.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.facebook.com/search/top?q=manito%20property%20management"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Visit Manito Property Management on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:mpropertymanager@windermere.com"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Email Manito Property Management"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Support Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider font-serif">
              Support & Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact-us/"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/qa/" className="hover:text-white transition-colors">
                  Frequently Asked Questions (Q&A)
                </Link>
              </li>
              <li>
                <Link
                  href="/rental-criteria/"
                  className="hover:text-white transition-colors"
                >
                  Rental Criteria & Application
                </Link>
              </li>
              <li>
                <Link
                  href="/available-rentals/"
                  className="hover:text-white transition-colors"
                >
                  Available Rental Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/tenant-portal/"
                  className="hover:text-white transition-colors"
                >
                  Tenant Portal & Payments
                </Link>
              </li>
              <li>
                <Link
                  href="/owner-portal/"
                  className="hover:text-white transition-colors"
                >
                  Owner Portal & Statements
                </Link>
              </li>
              <li>
                <Link
                  href="/maintenance-request/"
                  className="hover:text-white transition-colors"
                >
                  Maintenance Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Office */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider font-serif">
              Spokane Office
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  2829 S Grand Blvd. Ste 101<br />
                  Spokane, WA 99203
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Office: <a href="tel:5092428140" className="text-white hover:underline">(509) 242-8140</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Showings: <a href="tel:5092428144" className="text-white hover:underline">(509) 242-8144</a></span>
              </div>
              <div className="flex items-center gap-2.5 text-red-300">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Emergency: <a href="tel:5092428142" className="text-white hover:underline">(509) 242-8142</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:mpropertymanager@windermere.com"
                  className="text-white hover:underline break-all"
                >
                  mpropertymanager@windermere.com
                </a>
              </div>
            </div>

            {/* Equal Housing Logo */}
            <div className="pt-2">
              <div className="flex items-center gap-3 bg-gray-800/80 p-3 rounded border border-gray-700">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/uploads/6/6/2/9/66293977/published/3f2afb2fa017ece61be17e071104f5d4_3.png"
                    alt="Equal Housing Opportunity"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  <span className="font-semibold text-gray-200">
                    Equal Housing Opportunity
                  </span>
                  <br />
                  Committed to fair housing laws for all applicants.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© COPYRIGHT 2015-PRESENT MANITO PROPERTY MANAGEMENT. ALL RIGHTS RESERVED.</p>
          <p className="text-gray-450 text-[11px]">
            Manito Property Management does not accept comprehensive portable screening reports.
          </p>
        </div>
      </div>
    </footer>
  );
}
