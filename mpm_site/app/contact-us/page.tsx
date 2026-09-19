import React from "react";
import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";
import { Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us - Office Location & Numbers",
  description:
    "Contact Manito Property Management in Spokane, WA. Office phone, emergency maintenance, leasing inquiries, address on Grand Blvd, and contact form.",
};

export default function ContactUsPage() {
  return (
    <div>
      {/* Hero Banner with Background Photo (clean header without tenant/owner logins) */}
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/301876886.jpg"
        title="Contact Us"
        subtitle={
          <div className="space-y-3 pt-2 text-gray-200">
            <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
              If you are a current tenant, owner or vendor please contact us by
              phone Monday-Friday 9am-5pm at{" "}
              <a
                href="tel:5092428140"
                className="font-bold text-white underline hover:text-blue-300"
              >
                (509) 242-8140
              </a>
              . If you are inquiring about a property or have questions about our
              application process please contact directly at{" "}
              <a
                href="tel:5092428144"
                className="font-bold text-white underline hover:text-blue-300"
              >
                (509) 242-8144
              </a>
              .
            </p>
          </div>
        }
      />

      {/* Main Content Area */}
      <div className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Section: Contact Form & Google Map Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Contact Form Column */}
            <div>
              <ContactForm />
            </div>

            {/* Embedded Google Map Column */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#415161]" />
                    <span>Our Spokane Location</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Visit us at 2829 S Grand Blvd. Ste 101, Spokane, WA.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=2829+S+Grand+Blvd+Ste+101,+Spokane,+WA+99203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-medium flex-shrink-0 ml-2 mt-1"
                >
                  Open in Google Maps ↗
                </a>
              </div>
              <div className="w-full flex-grow min-h-[380px] sm:min-h-[440px] rounded-lg overflow-hidden border border-gray-100">
                <iframe
                  title="Manito Property Management Location"
                  src="https://maps.google.com/maps?q=2829%20S%20Grand%20Blvd%20Ste%20101,%20Spokane,%20WA%2099203&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                2829 S Grand Blvd. Ste 101, Spokane, WA 99203
              </p>
            </div>
          </div>

          {/* Tasteful Centered Office Information Under Form & Map */}
          <div className="bg-white/85 rounded-xl p-6 sm:p-8 border border-gray-200/80 shadow-xs max-w-4xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center mb-6">
              Office Information & Hours
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100 text-xs sm:text-sm text-gray-600">
              {/* Location */}
              <div className="space-y-1.5 px-3">
                <MapPin className="w-4 h-4 text-[#415161] mx-auto mb-1" />
                <p className="font-semibold text-gray-800">Office Location</p>
                <p>
                  2829 S Grand Blvd. Ste 101
                  <br />
                  Spokane, WA 99203
                </p>
                <p className="text-[11px] text-gray-400 italic">
                  Visits by appointment only
                </p>
              </div>

              {/* Direct Phone Lines */}
              <div className="space-y-1.5 px-3 pt-4 sm:pt-0">
                <Phone className="w-4 h-4 text-[#415161] mx-auto mb-1" />
                <p className="font-semibold text-gray-800">Direct Lines</p>
                <p>
                  Office:{" "}
                  <a
                    href="tel:5092428140"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    (509) 242-8140
                  </a>
                </p>
                <p>
                  Showings:{" "}
                  <a
                    href="tel:5092428144"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    (509) 242-8144
                  </a>
                </p>
                <p className="text-[11px] text-gray-500">
                  Emergency:{" "}
                  <a
                    href="tel:5092428142"
                    className="text-red-600 font-semibold hover:underline"
                  >
                    (509) 242-8142
                  </a>
                </p>
              </div>

              {/* Hours & Email */}
              <div className="space-y-1.5 px-3 pt-4 sm:pt-0">
                <Clock className="w-4 h-4 text-[#415161] mx-auto mb-1" />
                <p className="font-semibold text-gray-800">Hours & Support</p>
                <p>Monday – Friday: 9am – 5pm</p>
                <p>
                  <a
                    href="mailto:mpropertymanager@windermere.com"
                    className="text-blue-600 hover:underline break-all font-medium"
                  >
                    mpropertymanager@windermere.com
                  </a>
                </p>
                <p className="text-[11px] text-gray-400">
                  Closed major holidays
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
