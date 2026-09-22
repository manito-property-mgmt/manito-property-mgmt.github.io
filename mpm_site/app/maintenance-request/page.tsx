import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { Wrench, AlertTriangle, Phone, ExternalLink, UserCheck } from "lucide-react";

export const metadata = {
  title: "Tenant Maintenance Requests & Emergency Dispatch",
  description:
    "Submit routine maintenance requests via the tenant portal or contact our 24/7 Spokane emergency maintenance dispatch at (509) 242-8142.",
};

export default function MaintenanceRequestPage() {
  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/1087021670.jpg"
        title="Tenant Maintenance Request"
        subtitle="Prompt, dependable service for your rental home."
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Main Notice Card */}
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 bg-blue-50 text-[#415161] rounded-full mx-auto flex items-center justify-center">
              <Wrench className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Submit Your Maintenance Request
            </h2>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              All maintenance requests need to be submitted in writing. Please login
              to your tenant portal and follow the maintenance request prompts.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://spokanearearentals.appfolio.com/connect/users/sign_in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Login to Tenant Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://spokanearearentals.appfolio.com/connect/users/request_access"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <UserCheck className="w-4 h-4 text-gray-500" />
                <span>Request Portal Access</span>
              </a>
            </div>
          </div>

          {/* Emergency Maintenance Alert Box */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-red-900 font-serif">
                Maintenance Emergencies
              </h3>
            </div>

            <p className="text-sm text-red-800 leading-relaxed">
              If this is an active maintenance emergency (e.g., active flooding, sewer backup, loss of all heat in winter, electrical hazards):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  During Business Hours (Mon-Fri 9am-5pm)
                </span>
                <a
                  href="tel:5092428140"
                  className="mt-1 flex items-center gap-2 text-lg font-bold text-[#415161] hover:text-blue-700"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>(509) 242-8140</span>
                </a>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  After Hours & Weekends Emergency
                </span>
                <a
                  href="tel:5092428142"
                  className="mt-1 flex items-center gap-2 text-lg font-bold text-[#415161] hover:text-blue-700"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>(509) 242-8142</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tips for quick resolution */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 space-y-4">
            <h3 className="text-lg font-serif font-bold text-gray-800">
              Tips for Fast Service:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#415161] mt-2 flex-shrink-0" />
                <span>Include clear, detailed descriptions of the problem.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#415161] mt-2 flex-shrink-0" />
                <span>Upload photos or short videos directly through the AppFolio tenant portal.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#415161] mt-2 flex-shrink-0" />
                <span>Provide accurate contact numbers and note any pet or access instructions.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
