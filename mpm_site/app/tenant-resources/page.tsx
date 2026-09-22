import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { MapPin } from "lucide-react";

export const metadata = {
  title: "Tenant Resources & Spokane Utility Providers",
  description:
    "Helpful resources for current and incoming Spokane tenants: Avista electric/gas, City of Spokane water/sewer/garbage, USPS address changes, and office policies.",
};

export default function TenantResourcesPage() {
  const utilities = [
    {
      name: "City of Spokane",
      category: "Water, Sewer, Garbage",
      url: "https://my.spokanecity.org/",
    },
    {
      name: "Avista Utilities",
      category: "Electricity & Natural Gas",
      url: "https://myavista.com/",
    },
    {
      name: "Spokane County Environmental Services",
      category: "Sewer & Water Resources",
      url: "http://www.spokanecounty.org/es",
    },
    {
      name: "City of Spokane Valley",
      category: "Municipal Services",
      url: "https://www.spokanevalley.org/",
    },
    {
      name: "Inland Power & Light",
      category: "Electric Cooperative",
      url: "https://www.inlandpower.com/",
    },
    {
      name: "Vera Water and Power",
      category: "Water & Electric",
      url: "https://verawaterandpower.merchanttransact.com/default.aspx",
    },
    {
      name: "Modern Electric Water Co.",
      category: "Electric & Water Services",
      url: "https://modernelectricwater.com/contact/",
    },
    {
      name: "City of Medical Lake & Cheney",
      category: "West Plains Municipal Services",
      url: "https://medical-lake.org/",
    },
    {
      name: "City of Liberty Lake",
      category: "Municipal Services",
      url: "https://www.libertylakewa.gov/",
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/185086630.jpg"
        title="Tenant Resources"
        subtitle="Important information, office policies, utility providers, and helpful moving resources."
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Office Guidelines & Payment Info */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
              Office Hours & Payment Guidelines
            </h2>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Our office is open to the public. We are available by phone Monday
                through Friday from <strong>9:00 am to 5:00 pm</strong> at{" "}
                <a
                  href="tel:5092428140"
                  className="text-blue-600 font-bold hover:underline"
                >
                  (509) 242-8140
                </a>
                .
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="font-semibold text-gray-800">Rent Payments:</div>
                <p>
                  Payments can be made 24/7 through your <strong>AppFolio account</strong> or
                  brought to our office in the form of <strong>check, cashier’s check, or money order only (no cash accepted)</strong>.
                </p>
                <p>
                  In-person rent payments may be deposited in our secure 24-hour drop box located to the right of the front doors at:
                </p>
                <div className="font-medium text-gray-900 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>2829 S Grand Blvd. Ste 101, Spokane, WA 99203</span>
                </div>
              </div>

              <p>
                <strong>Lease Renewals:</strong> If your lease is coming up for renewal, please contact our office to discuss your options.
              </p>

              <p>
                <strong>Emergency Maintenance:</strong> We provide 24-hour emergency maintenance. Maintenance emergencies should be reported immediately by phone at{" "}
                <a
                  href="tel:5092428142"
                  className="text-blue-600 font-bold hover:underline"
                >
                  (509) 242-8142
                </a>
                .
              </p>
            </div>
          </div>

          {/* Area Utility Providers */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Spokane Area Utility Providers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Contact your respective service provider to set up or transfer utility accounts for your rental home.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {utilities.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:border-[#415161] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#415161] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>

                  <div className="pt-4 text-xs text-blue-600 font-semibold group-hover:underline">
                    Visit Website
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Tenant Rights, Moving & Civic Resources */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Tenant Rights, Moving & Civic Resources
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="https://my.spokanecity.org/housing/tenants-rights-and-resources/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-[#415161] transition group block"
              >
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#415161] transition-colors">
                  City of Spokane Tenant Rights
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Official rights, housing codes & resources
                </p>
              </a>

              <a
                href="https://moversguide.usps.com/mgo/disclaimer?referral=UMOVE"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-[#415161] transition group block"
              >
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#415161] transition-colors">
                  USPS Change of Address
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Official postal address change tool
                </p>
              </a>

              <a
                href="/uploads/6/6/2/9/66293977/vrf_english.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-[#415161] transition group block"
              >
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#415161] transition-colors">
                  Voter Registration Form
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Washington State Voter Form (PDF)
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
