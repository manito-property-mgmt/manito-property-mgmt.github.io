import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { ExternalLink, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Owner Resources - Mortgage & Tax Information",
  description:
    "Helpful financial and government resources for property owners, including Spokane County property taxes, IRS guidance, and mortgage options.",
};

export default function OwnerResourcesPage() {
  const resourceLinks = [
    {
      title: "Spokane County Property Tax Info",
      description: "Official Spokane County treasurer property tax deadlines and online payment system.",
      url: "https://www.spokanecounty.org/4600/2020-First-Half-Property-Tax-Deadline-Up",
      source: "Spokane County",
    },
    {
      title: "Internal Revenue Service (IRS)",
      description: "Federal tax payment deadlines, real estate tax provisions, and reporting information.",
      url: "https://www.irs.gov/",
      source: "IRS.gov",
    },
    {
      title: "CFPB: Mortgage Payment Options",
      description: "Consumer Financial Protection Bureau guidance on mortgage loan repayment options and protections.",
      url: "https://www.consumerfinance.gov/ask-cfpb/if-i-cant-pay-my-mortgage-loan-what-are-my-options-en-268/",
      source: "Consumer Finance",
    },
    {
      title: "American Bankers Association",
      description: "Banking industry consumer programs, assistance resources, and financial guidance.",
      url: "https://www.aba.com/",
      source: "ABA",
    },
    {
      title: "America’s Credit Unions",
      description: "Member credit union lending assistance, loan modifications, and owner resources.",
      url: "https://www.americascreditunions.org/",
      source: "Credit Unions",
    },
    {
      title: "Federal Trade Commission (FTC)",
      description: "FTC alerts on avoiding mortgage relief scams and protecting your real estate assets.",
      url: "https://www.consumer.ftc.gov/features/coronavirus-scams-what-ftc-doing",
      source: "FTC.gov",
    },
    {
      title: "FTC: Mortgage Payment Assistance Advice",
      description: "Trusted advice on how to proceed when struggling to make mortgage payments.",
      url: "https://www.consumer.ftc.gov/articles/0187-when-paying-mortgage-struggle",
      source: "FTC.gov",
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/185086630.jpg"
        title="Owner Resources"
        subtitle="Helpful guidance, mortgage payment resources, tax deadlines, and property owner support."
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Mortgage & Financial Assistance Information
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We understand times can be unpredictable and market conditions evolve.
              Below are verified civic and federal resources that provide assistance
              with property taxes, mortgage payments, and asset protection.
            </p>
            <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 text-blue-900 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>
                The information on this page is deemed reliable at the time of posting
                but not guaranteed. Please contact the providers directly for specific
                verification and assistance.
              </span>
            </div>
          </div>

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#415161] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {item.source}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#415161] transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 text-base group-hover:text-[#415161] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 text-xs font-semibold text-[#415161] group-hover:underline">
                  Visit Provider Site →
                </div>
              </a>
            ))}
          </div>

          {/* Need help advice card */}
          <div className="bg-[#415161] text-white rounded-xl p-8 text-center space-y-3">
            <h3 className="text-xl font-serif font-bold">
              Have Questions About Your Management Agreement?
            </h3>
            <p className="text-sm text-gray-200 max-w-xl mx-auto">
              Our property management team is always here to help you review monthly disbursements, repair authorizations, or market rental rates.
            </p>
            <div className="pt-2">
              <a
                href="tel:5092428140"
                className="inline-block px-6 py-2.5 bg-white text-[#415161] hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider shadow"
              >
                Call Office: (509) 242-8140
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
