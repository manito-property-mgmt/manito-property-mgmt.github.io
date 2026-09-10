"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Users,
  Home,
  UserCheck,
  ExternalLink,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface FAQSection {
  title: string;
  category: string;
  icon: React.ElementType;
  items: FAQItem[];
}

export default function QAAccordion() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "gen-0": true,
    "app-0": true,
    "ten-0": true,
    "own-0": true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const faqSections: FAQSection[] = [
    {
      title: "General Questions",
      category: "gen",
      icon: HelpCircle,
      items: [
        {
          q: "How do I get more information?",
          a: (
            <p>
              For more information about our rental properties or rental
              services, please contact Manito Property Management by phone at{" "}
              <a
                href="tel:5092428144"
                className="font-bold text-blue-600 hover:underline"
              >
                (509) 242-8144
              </a>{" "}
              or by email at{" "}
              <a
                href="mailto:mpropertymanager@windermere.com"
                className="font-bold text-blue-600 hover:underline"
              >
                mpropertymanager@windermere.com
              </a>
              .
            </p>
          ),
        },
        {
          q: "Where is your office located?",
          a: (
            <p>
              Our office is located at: <strong>2829 S Grand Blvd. Ste 101, Spokane, WA 99203</strong>.
              Please note: Office visits are by <em>scheduled appointment only</em>.
            </p>
          ),
        },
        {
          q: "What are your business hours?",
          a: (
            <p>
              Our office is open <strong>Monday through Friday, 9:00am – 5:00pm</strong>.
              The office is closed on all major holidays, including Native American Heritage Day.
            </p>
          ),
        },
        {
          q: "When can I view available properties?",
          a: (
            <p>
              Showings are available during our business hours of{" "}
              <strong>Monday – Friday, 9:30am – 4:30pm</strong> (no weekend or holiday
              availability). All showings are conducted as open house style, and we allow
              a 15-minute grace period past the scheduled appointment time.
            </p>
          ),
        },
      ],
    },
    {
      title: "For our Applicants",
      category: "app",
      icon: UserCheck,
      items: [
        {
          q: "How do I apply for a rental?",
          a: (
            <div>
              <p>
                To apply for tenancy with Manito Property Management, please browse
                our{" "}
                <Link
                  href="/available-rentals/"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Available Rentals
                </Link>{" "}
                and complete an online application via QuickLeasePro / AcraNet.
              </p>
              <div className="mt-2">
                <a
                  href="https://manitopm.quickleasepro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#415161] hover:bg-[#32404e] text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  <span>Apply Here</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ),
        },
        {
          q: "How much is the application fee?",
          a: (
            <p>
              The application fee is <strong>$56.00 per adult</strong>, payable
              directly to AcraNet with a credit or debit card during the application
              process. Co-signer applications are <strong>$20.00 per adult</strong>.
            </p>
          ),
        },
        {
          q: "How long will it take to process my application?",
          a: (
            <p>
              The application takes about 20 minutes to fill out. Once submitted,
              the screening process typically takes <strong>3-5 business days</strong> for
              the final report from AcraNet.
            </p>
          ),
        },
        {
          q: "What does it mean to be a lease co-signer?",
          a: (
            <p>
              When you co-sign a lease, you provide your legal guarantee that the rent
              on that property will be paid in full and on time. You are also equally
              responsible for paying any fees for damages on the home beyond normal
              wear and tear.
            </p>
          ),
        },
        {
          q: "Why is my application taking longer than expected?",
          a: (
            <p>
              Incomplete or missing information (such as unresponsive previous landlord
              references or unverified paystubs) can cause delays. If you are experiencing
              this issue, please call our office at{" "}
              <a href="tel:5092428140" className="font-bold text-blue-600 hover:underline">
                (509) 242-8140
              </a>
              .
            </p>
          ),
        },
      ],
    },
    {
      title: "For our Tenants",
      category: "ten",
      icon: Users,
      items: [
        {
          q: "How do I pay my rent?",
          a: (
            <div className="space-y-2">
              <p>You can pay your rent in one of two convenient ways:</p>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>
                  <strong>Online via Tenant Portal:</strong> Log in to your AppFolio
                  account and make a payment with eCheck (ACH), credit card, or debit card.
                </li>
                <li>
                  <strong>Drop Off:</strong> Bring a check or money order, made payable to
                  <em>Manito Property Management</em>, to our office at 2829 S Grand Blvd. Ste 101.
                  Our night drop box is located on the right-hand side of the exterior doors.
                </li>
              </ol>
            </div>
          ),
        },
        {
          q: "Can I drop off my rent payment after hours?",
          a: (
            <p>
              Yes! If you are unable to come during regular business hours, there is a secure
              black drop box located to the right of the front entrance doors at 2829 S Grand Blvd.
            </p>
          ),
        },
        {
          q: "I have a routine maintenance issue, what do I do?",
          a: (
            <p>
              All routine maintenance requests need to be submitted in writing. Please
              log in to your{" "}
              <Link
                href="/tenant-portal/"
                className="font-bold text-blue-600 hover:underline"
              >
                Tenant Portal
              </Link>{" "}
              and follow the maintenance request prompts.
            </p>
          ),
        },
        {
          q: "I have a maintenance emergency, what do I do?",
          a: (
            <p>
              For all maintenance emergencies, please immediately call{" "}
              <a
                href="tel:5092428142"
                className="font-bold text-red-600 hover:underline"
              >
                (509) 242-8142
              </a>
              . During normal business hours, you may also reach the office at{" "}
              <a
                href="tel:5092428140"
                className="font-bold text-[#415161] hover:underline"
              >
                (509) 242-8140
              </a>
              .
            </p>
          ),
        },
      ],
    },
    {
      title: "For our Owners",
      category: "own",
      icon: Home,
      items: [
        {
          q: "What do you charge for management services?",
          a: (
            <p>
              We offer personalized, boutique management services; therefore, fees are
              structured on a property-by-property basis depending on unit count, condition,
              and scope. Please call our office at{" "}
              <a href="tel:5092428140" className="font-bold text-blue-600 hover:underline">
                (509) 242-8140
              </a>{" "}
              for a free evaluation and proposal.
            </p>
          ),
        },
        {
          q: "What expertise do you have managing single family homes?",
          a: (
            <p>
              We specialize in single family homes, duplexes, condominiums, and small-unit
              residential properties throughout Spokane and Spokane County, with over a
              decade of local experience.
            </p>
          ),
        },
        {
          q: "What kind of service do you provide?",
          a: (
            <p>
              We are a full-service property management company. We handle everything:
              professional rental advertising, thorough applicant screening, lease
              execution, rent collection, digital accounting, routine inspections, and
              24/7 maintenance coordination with licensed and bonded contractors.
            </p>
          ),
        },
        {
          q: "How do you determine what my property will rent for?",
          a: (
            <p>
              We evaluate your property using AppFolio’s market comparison engine alongside
              our in-depth knowledge of local Spokane neighborhood micro-markets to maximize
              your rental income while minimizing vacancy time.
            </p>
          ),
        },
        {
          q: "How do I view and access financial documents for my property?",
          a: (
            <p>
              All monthly owner statements, income/expense reports, work order invoices, and
              signed lease documents are available on-demand 24/7 through your secure{" "}
              <Link
                href="/owner-portal/"
                className="font-bold text-blue-600 hover:underline"
              >
                Owner Portal
              </Link>
              .
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {faqSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <div
            key={section.category}
            className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#415161] flex items-center justify-center">
                <SectionIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                {section.title}
              </h2>
            </div>

            <div className="space-y-3">
              {section.items.map((item, idx) => {
                const itemKey = `${section.category}-${idx}`;
                const isOpen = !!openItems[itemKey];

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50 hover:bg-slate-100/80 transition"
                    >
                      <span className="font-serif font-bold text-sm sm:text-base text-gray-900 pr-4">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-[#415161]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-white text-sm text-gray-700 leading-relaxed border-t border-gray-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
