import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { Download, MapPin } from "lucide-react";

export const metadata = {
  title: "Manito Property Management",
  description:
    "Safety and emergency evacuation diagrams and floor plans for multi-family residential properties managed by Manito Property Management.",
};

export default function EvacuationPlansPage() {
  const plans = [
    {
      address: "320 S Cannon St",
      description: "Main Floor Emergency Fire Evacuation Plan",
      pdfUrl: "/uploads/6/6/2/9/66293977/320_s_cannon_main_floor_evac_plan__2___2_.pdf",
      hasPdf: true,
    },
    {
      address: "1730 W Riverside",
      description: "Multi-Family Residential Evacuation Guidelines",
      pdfUrl: null,
      hasPdf: false,
    },
    {
      address: "1721 W Riverside",
      description: "Emergency Evacuation & Route Plan",
      pdfUrl: "/uploads/6/6/2/9/66293977/evac_plan_1721_riverside__3_.pdf",
      hasPdf: true,
    },
    {
      address: "605 S Bernard",
      description: "Multi-Family Residential Evacuation Guidelines",
      pdfUrl: null,
      hasPdf: false,
    },
    {
      address: "6 S Oak St",
      description: "Fire Evacuation Main Floor Plan",
      pdfUrl: "/uploads/6/6/2/9/66293977/6_s_oak_fire_evac_main_floor_plan__1_.pdf",
      hasPdf: true,
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/301876886.jpg"
        title="Tenant Evacuation Plans"
        subtitle="Review emergency routes, exits, and safety protocols for multi-family dwellings."
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Building Evacuation Routes
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              In accordance with Washington State and Spokane Municipal fire safety
              codes, evacuation maps for designated multi-family residences are
              provided below. Please review the specific diagrams for your building
              and ensure all household occupants understand the primary and secondary
              exits.
            </p>

            <div className="space-y-3 pt-2">
              {plans.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg gap-3 hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#415161] flex-shrink-0" />
                    <div>
                      <h3 className="font-serif font-bold text-gray-900 text-base">
                        {item.address}
                      </h3>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>

                  {item.hasPdf && item.pdfUrl ? (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#415161] hover:bg-[#313f4d] text-white text-xs font-bold uppercase tracking-wider rounded transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium italic sm:text-right">
                      Contact Office for Map
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
