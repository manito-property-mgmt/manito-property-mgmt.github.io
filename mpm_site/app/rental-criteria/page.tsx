import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Gift,
} from "lucide-react";

export const metadata = {
  title: "Rental Criteria & Tenancy Application",
  description:
    "Review Manito Property Management's tenant screening criteria, credit requirements, Resident Benefits Package (RBP), and submit an online application.",
};

export default function RentalCriteriaPage() {
  const rbpFeatures = [
    "Move-in concierge service: one-call setup for utility services, cable, and internet",
    "Resident rewards program: earn rewards and perks for paying rent on time",
    "Credit building: boost your credit score with timely verified rent payments",
    "$1M Identity Fraud Protection for all adult leaseholders",
    "Group Rate Internet access with no hidden fees (for applicable properties)",
  ];

  const denialCriteria = [
    "Delinquent accounts on the credit report (2 or more accounts delinquent)",
    "Collections and/or charge-offs on the credit report (2 or more accounts in collection or charged off)",
    "Bankruptcy listed on the credit report filed in the last three years",
    "Registered sex offender classification",
    "Any formal eviction record or unlawful detainer filing",
    "Negative rental history such as excessive noise complaints, outstanding debts, payment problems, or extensive property damages",
    "Mortgage history with more than 6 late payments within the last two years",
    "Falsification or omission of information provided on the rental application",
    "Criminal convictions for crimes against persons or property (evaluated individually based on age at conduct, time elapsed, rehabilitation, and nature of offense; no automatic exclusion solely on criminal history)",
  ];

  const conditionalApprovals = [
    "Approval with first and last month’s rent required prior to occupancy",
    "Approval with an increased security deposit",
    "Approval with a qualified guarantor or co-signer",
    "Approval with a qualified additional roommate",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 uppercase tracking-wide">
            Rental Criteria & Application
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please review our complete tenancy criteria and requirements before
            submitting an application through AcraNet.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded bg-[#415161] hover:bg-[#32404e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Apply Online Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/available-rentals/"
              className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View Available Rentals
            </Link>
          </div>
        </div>

        {/* Processing & Fee Breakdown */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
            Application Process & Fees
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              To apply for tenancy with Manito Property Management, please complete
              an online application. Typical processing time for an application is{" "}
              <strong>3-5 business days</strong>. Once the screening report is
              completed by AcraNet, we will contact you on the phone number provided
              on your application.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Adult Applicant Fee
                </span>
                <span className="text-2xl font-bold text-gray-900">$56.00</span>
                <span className="text-xs text-gray-500 block mt-1">
                  Per adult, payable directly to AcraNet with debit/credit card.
                </span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Co-Signer Application Fee
                </span>
                <span className="text-2xl font-bold text-gray-900">$20.00</span>
                <span className="text-xs text-gray-500 block mt-1">
                  Per adult co-signer / guarantor.
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded border border-amber-200">
              <strong>Notice:</strong> Manito Property Management does not accept
              comprehensive portable reusable tenant screening reports. If approved,
              a $150 administration/document processing fee is due prior to taking
              occupancy. Security deposit is equivalent to one month’s rent.
            </p>
          </div>
        </div>

        {/* Resident Benefits Package (RBP) */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 text-[#415161]">
              <Gift className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-serif font-bold text-gray-900">
                Resident Benefits Package (RBP)
              </h2>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
              $19.50 / Month
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            The Manito Property Management Resident Benefits Package (RBP) delivers
            savings and convenient, professional services that make taking care of
            your home second nature. By applying, Applicant agrees to be automatically
            enrolled into the required program payable monthly with rent.
          </p>

          <div className="space-y-2.5 pt-1">
            {rbpFeatures.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
            <strong>Consent to Receive SMS Messages:</strong> Resident consents to receive
            transactional, account, and maintenance SMS communications from Landlord and RBP
            providers. Standard message and data rates may apply.
          </p>
        </div>

        {/* Primary Rental Criteria */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
            Standard Approval Criteria
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                1. Minimum Credit Score
              </span>
              <div className="text-2xl font-bold text-emerald-950">650+ Score</div>
              <p className="text-xs text-emerald-800">
                A credit score below 650 will require a qualified co-signer.
              </p>
            </div>

            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                2. Monthly Income Ratio
              </span>
              <div className="text-2xl font-bold text-emerald-950">2.5x the Rent</div>
              <p className="text-xs text-emerald-800">
                Gross verified monthly household income must equal at least 2.5 times the monthly rent.
              </p>
            </div>
          </div>

          {/* Causes for Denial */}
          <div className="pt-4 space-y-3">
            <h3 className="text-base font-serif font-bold text-gray-900 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>The Following Conditions May Result in a Denial:</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {denialCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditional Approval Conditions */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h3 className="text-base font-serif font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Conditional Approvals:</span>
            </h3>
            <p className="text-xs text-gray-600">
              Any application that does not result in a direct denial or straight approval may be conditionally approved under terms including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              {conditionalApprovals.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consumer Rights & AcraNet Dispute */}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
            In the event of a denial or other adverse action, you have the legal right under the Fair Credit Reporting Act to obtain a free copy of the consumer report and dispute the accuracy of any information appearing within it. To request a copy or dispute findings, contact <strong>AcraNet at (509) 324-1249</strong>.
          </div>
        </div>

        {/* Bottom Apply Card */}
        <div className="bg-[#415161] text-white rounded-xl p-8 text-center space-y-4 shadow">
          <h2 className="text-2xl font-serif font-bold">
            Ready to Submit Your Application?
          </h2>
          <p className="text-sm text-gray-200 max-w-lg mx-auto">
            Applications are submitted through QuickLeasePro and screened securely via AcraNet.
          </p>
          <div className="pt-2">
            <a
              href="https://manitopm.quickleasepro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded bg-white text-[#415161] hover:bg-gray-100 text-xs font-bold uppercase tracking-wider shadow"
            >
              <span>Proceed to Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
