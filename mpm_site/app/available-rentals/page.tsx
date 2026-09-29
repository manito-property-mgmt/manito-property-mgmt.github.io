import React from "react";
import AvailableRentalsClient from "@/components/AvailableRentalsClient";

export const metadata = {
  title: "Available Rentals - Spokane Area Rentals & Houses for Rent",
  description:
    "Explore current vacancies and rental properties across Spokane, Spokane Valley, Cheney, and Liberty Lake with interactive map search, filters, and high-res photo galleries.",
};

export default function AvailableRentalsPage() {
  return <AvailableRentalsClient />;
}
