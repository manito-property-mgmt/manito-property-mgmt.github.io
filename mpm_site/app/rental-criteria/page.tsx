import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { ExternalLink } from "lucide-react";

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
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/houseA.jpg"
        title="Rental Criteria"
        buttons={[
          {
            label: (
              <span className="inline-flex items-center gap-1.5">
                <span>Apply Online Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            ),
            href: "https://manitopm.quickleasepro.com/",
            isExternal: true,
            variant: "primary",
          },
          {
            label: "View Available Rentals",
            href: "/available-rentals/",
            variant: "secondary",
          },
        ]}
      />

      <div className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* 1. Application Process & Fees */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Application Process & Fees
            </h2>
          </div>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              To apply for tenancy with Manito Property Management, please complete
              an online application. Typical processing time for an application is{" "}
              <strong>3-5 business days</strong>. Once the screening report is
              completed by AcraNet, we will contact you on the phone number provided
              on your application.
            </p>
            <p>
              The application fee is $56.00 per adult, payable directly to AcraNet with a debit or credit card. If a co-signer or guarantor is required, the co-signer application fee is $20.00 per adult.
            </p>
            <div className="text-xs text-gray-600 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed">
              <strong className="text-gray-800">Screening & Occupancy Notice:</strong> Manito Property Management does not accept
              comprehensive portable reusable tenant screening reports. If approved,
              a $150 administration/document processing fee is due prior to taking
              occupancy. Security deposit is equivalent to one month’s rent.
            </div>
          </div>
        </div>

        {/* 2. Standard Approval Criteria */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Standard Approval Criteria
            </h2>
          </div>

          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p>
              A credit score below 650 will require a qualified co-signer.
            </p>
            <p>
              Gross verified monthly household income must equal at least 2.5 times the monthly rent.
            </p>
          </div>

          {/* Causes for Denial */}
          <div className="pt-2 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              Conditions That May Result in Denial
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {denialCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-gray-400 font-bold select-none mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditional Approval Conditions */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              Conditional Approvals
            </h3>
            <p className="text-xs text-gray-600">
              Any application that does not result in a direct denial or straight approval may be conditionally approved under terms including:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pt-1">
              {conditionalApprovals.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-gray-400 font-bold select-none mt-0.5">•</span>
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

        {/* 3. Resident Benefits Package (RBP) */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Resident Benefits Package (RBP)
            </h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md border border-slate-200">
              $19.50 / Month
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            The Manito Property Management Resident Benefits Package (RBP) delivers
            savings and convenient, professional services that make taking care of
            your home second nature. By applying, Applicant agrees to be automatically
            enrolled into the required program payable monthly with rent.
          </p>

          <ul className="space-y-2 text-sm text-gray-700 pt-1">
            {rbpFeatures.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-gray-400 font-bold select-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-500 pt-3 border-t border-gray-100 leading-relaxed">
            <strong>Consent to Receive SMS Messages:</strong> Resident consents to receive
            transactional, account, and maintenance SMS communications from Landlord and RBP
            providers. Standard message and data rates may apply.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
