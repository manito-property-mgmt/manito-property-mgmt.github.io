import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { ShieldCheck, FileSpreadsheet, Lock, Clock, ExternalLink, UserPlus, Server } from "lucide-react";

export const metadata = {
  title: "Owner Portal - Statements & Property Accounting",
  description:
    "Access your owner account online 24/7. Review monthly statements, property performance metrics, and financial documents with Manito Property Management.",
};

export default function OwnerPortalPage() {
  const benefits = [
    {
      title: "Concise Monthly Statements",
      desc: "Detailed statements covering income, expenses, and performance for the previous month.",
      icon: FileSpreadsheet,
    },
    {
      title: "Secure Cloud Storage",
      desc: "All financial data on your property is stored in AppFolio's state-of-the-art secure data centers.",
      icon: Server,
    },
    {
      title: "24/7 On-Demand Access",
      desc: "Access real-time information and historical reporting whenever you need it.",
      icon: Clock,
    },
    {
      title: "Anywhere Access",
      desc: "View statements from any device, tablet, or smartphone with an internet connection.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/185086630.jpg"
        title="Already working with us?"
        subtitle="Did you know that you can now access your owner account online? Fast, easy, and secure financial oversight."
        buttons={[
          {
            label: "Get Started",
            href: "https://spokanearearentals.appfolio.com/connect/users/request_access",
            isExternal: true,
            variant: "primary",
          },
          {
            label: "Login",
            href: "https://spokanearearentals.appfolio.com/oportal/users/log_in",
            isExternal: true,
            variant: "secondary",
          },
        ]}
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Why Owners Choose the Online Portal
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              It’s fast, easy, and secure, so why wait? Below, you’ll find information
              on how to get started and the benefits our property owners enjoy.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#415161] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* How It Works Card */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#415161]" />
              <h3 className="text-xl font-serif font-bold text-gray-900">
                How It Works:
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              In order to keep your financials secure, we use a state-of-the-art portal
              system that requires you to login with an authorized email address and
              secure password. Each time you wish to view your reports, invoices, or
              disbursements, simply visit the portal and enter your credentials.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://spokanearearentals.appfolio.com/oportal/users/log_in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#415161] hover:bg-[#313f4d] text-white text-xs font-bold uppercase tracking-wider rounded transition shadow"
              >
                <span>Owner Portal Login</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://spokanearearentals.appfolio.com/oportal/users/sign_up"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded transition"
              >
                <UserPlus className="w-4 h-4 text-gray-500" />
                <span>Sign Up for Access</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
