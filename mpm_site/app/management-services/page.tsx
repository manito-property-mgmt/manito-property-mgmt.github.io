import React from "react";
import HeroBanner from "@/components/HeroBanner";

export const metadata = {
  title: "Property Management Services - Full-Service Management in Spokane",
  description:
    "Discover full-service residential property management in Spokane, WA. AppFolio technology, tenant screening, marketing, digital accounting, and 24/7 maintenance.",
};

export default function ManagementServicesPage() {
  const techAdvantages = [
    {
      title: "More effectively market your properties and fill vacancies sooner",
      description:
        "AppFolio allows us to quickly advertise vacancies online, posting to our website, and hundreds of other listing sites. Applicants can also apply right from their smartphones.",
    },
    {
      title: "Price rentals right for your market and reduce vacancies",
      description:
        "AppFolio’s built-in rental comparison tool provides actual rental rates for units similar to yours in the same geographic location. This insight allows us to maximize your revenue and fill vacancies faster.",
    },
    {
      title: "Screen for the best residents",
      description:
        "Our application and screening standards are very high. We screen for income verification, financial history, criminal background check, eviction history, and previous rental history. The application is found online on our website for the convenience of our applicants.",
    },
    {
      title: "You will be paid faster and more securely",
      description:
        "New functionality provides our team the ability to deposit funds directly into your bank account via automated ACH. No more waiting for a check in the mail.",
    },
    {
      title: "Collect rent faster with online payment options",
      description:
        "Modern residents expect easy, online payment options. AppFolio gives residents convenient ways to pay electronically (E-check, credit/debit card, or electronic cash).",
    },
    {
      title: "On-demand access to your statements",
      description:
        "Owner statements are securely posted to an online Owners Portal, saving time and paper. These simple statements provide you with a quick snapshot of your property details for the past month. We can also include maintenance invoices and additional reports you request.",
    },
    {
      title: "Handle property maintenance issues faster",
      description:
        "We use AppFolio for electronic work-orders and communication with vendors so we can quickly resolve issues. At your request, we can email you a copy of the work order and relevant information giving you real-time updates.",
    },
  ];

  return (
    <div>
      <HeroBanner
        backgroundImage="/uploads/6/6/2/9/66293977/background-images/547924678.jpg"
        title="Property Management Services"
        subtitle="Our goal is to provide you with the best service and manage your properties efficiently and effectively. Our team has invested in a complete and modern software solution, AppFolio Property Manager."
        buttons={[
          {
            label: "Contact us today!",
            href: "/contact-us/",
            variant: "primary",
          },
        ]}
      />

      <div className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Philosophy Card */}
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-5">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Peace of Mind for Property Owners
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                Choosing our management company means having the peace of mind that
                comes from knowing things are working properly.
              </p>
              <p>
                We take pride in our ability to manage our portfolio efficiently and
                with top-tier results. We handle your property and rental income like
                we would handle our own. From careful accounting, to obtaining fair
                market pricing for maintenance and repairs, we offer all of our
                clients care and skill beyond other management companies. With live
                support and trained staff, you can reach us anytime. Emergencies are
                always handled promptly and the owner is always kept informed.
              </p>
              <p className="font-semibold text-gray-900">
                Let us earn your business and tell you why our service sets us apart
                from the rest.
              </p>
            </div>
          </div>

          {/* Technology Advantage Section */}
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                Our Technology Advantage
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Powered by AppFolio Property Manager, industry-leading software designed for maximum efficiency, speed, and transparency.
              </p>
            </div>

            <ul className="space-y-4 pt-2">
              {techAdvantages.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#415161] flex-shrink-0 mt-2" />
                  <div>
                    <strong className="font-semibold text-gray-900 block">
                      {item.title}
                    </strong>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
