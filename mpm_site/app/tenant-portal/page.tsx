import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { CheckCircle2, Clock, Lock } from "lucide-react";

export const metadata = {
  title: "Manito Property Management",
  description:
    "Pay rent online 24/7, submit maintenance requests, and manage your tenancy securely through the Manito Property Management Tenant Portal.",
};

export default function TenantPortalPage() {
  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/houseD.jpg"
        title="Did you know that you can now pay your rent online?"
        subtitle="It’s fast, easy, and secure, so why wait? Below, you’ll find some information on how to get started and a few reasons why so many others have already made the switch!"
        buttons={[
          {
            label: "Get Started",
            href: "https://spokanearearentals.appfolio.com/connect/users/request_access",
            isExternal: true,
            variant: "primary",
          },
          {
            label: "Login",
            href: "https://spokanearearentals.appfolio.com/connect/users/sign_in",
            isExternal: true,
            variant: "secondary",
          },
        ]}
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Benefits Section */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Tenant Portal Benefits
            </h2>

            <p className="text-gray-700 text-sm sm:text-base">
              Once you’ve signed up, you can:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                "View and pay your bills anytime (24/7)",
                "View and pay bills from anywhere (any computer or smartphone)",
                "Set up automatic recurring payments",
                "Sign up for automatic payment reminder emails",
                "Review your full payment history and receipts",
                "Submit and track routine maintenance requests",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Convenience & Security Two-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#415161]">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  Convenience
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Have you ever looked at a calendar and suddenly realized that your
                rent was due that day? Or worse yet, that it was due a few days ago
                and that it was now late?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                With online rent payments, these concerns are a thing of the past.
                Simply hop on your computer and in just a few minutes, your rent is
                paid! Or remove all doubt and schedule a payment in advance so your
                rent is paid automatically. And this is in addition to not having to
                write checks, address envelopes, or find/buy stamps…
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#415161]">
                <Lock className="w-6 h-6" />
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  Security
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                In a world where online financial predators seem more and more common,
                we understand if you have reservations about entering your bank account
                information online.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                But fear not! Your information is password protected and all
                transactions are both encrypted and securely transmitted using
                industry-standard bank-level security protocols provided by AppFolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
