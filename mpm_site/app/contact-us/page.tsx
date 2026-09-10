import React from "react";
import ContactForm from "@/components/ContactForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  User,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Contact Us - Office Location & Numbers",
  description:
    "Contact Manito Property Management in Spokane, WA. Office phone, emergency maintenance, leasing inquiries, address on Grand Blvd, and contact form.",
};

export default function ContactUsPage() {
  return (
    <div>
      {/* Top Banner with Quick Login Actions */}
      <div
        className="relative bg-cover bg-center py-16 text-white"
        style={{
          backgroundImage:
            "url('/uploads/6/6/2/9/66293977/background-images/301876886.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70 backdrop-brightness-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-600">
            {/* Tenants Column */}
            <div className="space-y-3 pt-4 md:pt-0">
              <h2 className="text-2xl font-serif font-bold tracking-wide">
                Tenants
              </h2>
              <p className="text-gray-200 text-sm">
                Are you a current tenant? Login to your account here.
              </p>
              <div>
                <a
                  href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <User className="w-4 h-4" />
                  <span>Tenant Login</span>
                </a>
              </div>
            </div>

            {/* Owners Column */}
            <div className="space-y-3 pt-6 md:pt-0 md:pl-8">
              <h2 className="text-2xl font-serif font-bold tracking-wide">
                Owners
              </h2>
              <p className="text-gray-200 text-sm">
                Are you a current owner? Log into your account here.
              </p>
              <div>
                <a
                  href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Owner Login</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 uppercase tracking-wide">
              Contact Us Today!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              For all general inquiries please contact us by phone or fill out our
              contact form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Contact Details & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-5">
                <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Spokane Office Information
                </h2>

                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Office Location:
                      </span>
                      <span>2829 S Grand Blvd. Ste 101</span>
                      <br />
                      <span>Spokane, WA 99203</span>
                      <p className="text-xs text-gray-500 mt-1 italic">
                        (Office visits by scheduled appointment only)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Office Phone:
                      </span>
                      <a
                        href="tel:5092428140"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        (509) 242-8140
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Showings & Inquiries:
                      </span>
                      <a
                        href="tel:5092428144"
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        (509) 242-8144
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-red-700">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Emergency Maintenance:
                      </span>
                      <a
                        href="tel:5092428142"
                        className="text-red-700 font-semibold hover:underline"
                      >
                        (509) 242-8142
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Business Hours:
                      </span>
                      <span>Monday – Friday: 9:00am – 5:00pm</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Closed on all major holidays, including Native American Heritage Day.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-gray-900">
                        Email Address:
                      </span>
                      <a
                        href="mailto:mpropertymanager@windermere.com"
                        className="text-blue-600 hover:underline break-all"
                      >
                        mpropertymanager@windermere.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Manito Property Management Location"
                  src="https://maps.google.com/maps?q=2829%20S%20Grand%20Blvd%20Ste%20101,%20Spokane,%20WA%2099203&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
