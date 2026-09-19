import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { CheckCircle2, Quote } from "lucide-react";

export const metadata = {
  title: "Real Estate Agent Services - Broker Partnerships",
  description:
    "Partner with Manito Property Management. We protect your client relationships by managing their properties until they are ready to sell—guaranteeing you get them back.",
};

export default function RealEstateAgentServicesPage() {
  const services = [
    "Professional, live, local support for you and your clients.",
    "Our competitive management fee is completely all-inclusive with no hidden add-ons.",
    "We keep properties maintained by licensed and bonded contractors, keeping budget in mind.",
    "Our management agreement does NOT lock clients in to sell with us—we refer them back to you!",
  ];

  const propertyTypes = [
    "Single Family Homes",
    "Apartments",
    "Multi-Family Dwellings",
    "Condominiums",
    "Duplexes",
    "Townhomes",
    "Executive & Estate Properties",
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/185086630.jpg"
        title="Real Estate Agent Services"
        subtitle="We are a unique management company that caters to the needs of Real Estate professionals. Our services provide your client the opportunity to utilize their property as a rental until they are ready to sell. This option guarantees that you will get your clients back when they are ready to market."
        buttons={[
          {
            label: "Contact us today!",
            href: "/contact-us/",
            variant: "primary",
          },
        ]}
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Intro statement */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              A Trusted Partner for Spokane Realtors & Brokers
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              With our long-standing experience and exceptional service, your clients
              will feel at ease that their property will be well cared for. We want to
              be a positive extension of the service you are providing to your client.
            </p>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-8 sm:p-10 shadow-md relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-20 h-20 text-white/10" />
            <div className="relative z-10 space-y-4">
              <p className="text-base sm:text-lg italic text-slate-100 leading-relaxed font-serif">
                &ldquo;Every time I send a potential tenant or landlord to you I am
                impressed with the positive feedback. This is not surprising since I am
                a client myself, but it’s nice to know you are providing the same level
                of service to everyone.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-700">
                <div className="font-bold text-white tracking-wide">
                  Mike Bass, Broker
                </div>
                <div className="text-xs text-blue-300">
                  Century 21 Beutler & Associates
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered Card */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
              Our Services for Real Estate Professionals
            </h2>

            <div className="space-y-4">
              {services.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Types */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
              Property Types We Manage
            </h2>

            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-3 pt-2">
              <ul className="space-y-3">
                {propertyTypes.slice(0, 4).map((type, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#415161] flex-shrink-0 mt-2" />
                    <span className="font-medium">{type}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {propertyTypes.slice(4).map((type, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#415161] flex-shrink-0 mt-2" />
                    <span className="font-medium">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
