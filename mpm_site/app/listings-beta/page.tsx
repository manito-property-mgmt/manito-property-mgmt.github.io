import React from "react";
import ListingsBetaClient from "@/components/ListingsBetaClient";

export const metadata = {
  title: "Listings (Beta) - Spokane Area Rentals & Vacancies",
  description:
    "Explore current vacancies and rental properties across Spokane, Spokane Valley, Cheney, and Liberty Lake with interactive map search, filters, and high-res photo galleries.",
};

export default function ListingsBetaPage() {
  return <ListingsBetaClient />;
}
