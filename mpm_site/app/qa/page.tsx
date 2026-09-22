import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import QAAccordion from "@/components/QAAccordion";

export const metadata = {
  title: "Manito Property Management",
  description:
    "Find answers to frequently asked questions about renting, applications, maintenance, rent payments, and property management services in Spokane.",
};

export default function QAPage() {
  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/686098162.jpg"
        title="Frequently Asked Questions (Q&A)"
        subtitle="Find quick answers to common questions for tenants, applicants, and property owners."
      />

      <div className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <QAAccordion />

          {/* Still have questions banner */}
          <div className="bg-[#415161] text-white rounded-xl p-8 sm:p-10 text-center space-y-4 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold">
              Still have questions?
            </h3>
            <p className="text-sm text-gray-200 max-w-lg mx-auto">
              Our team is happy to assist you by phone Monday – Friday from 9am to 5pm or through our online contact form.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact-us/"
                className="px-6 py-2.5 bg-white text-[#415161] hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider shadow"
              >
                Contact Us
              </Link>
              <a
                href="tel:5092428140"
                className="px-6 py-2.5 border border-white text-white hover:bg-white/10 rounded text-xs font-bold uppercase tracking-wider"
              >
                Call (509) 242-8140
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
