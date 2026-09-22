import React from "react";
import AvailableRentalsClient from "@/components/AvailableRentalsClient";

export const metadata = {
  title: "Available Rentals - Spokane Area Rentals & Houses for Rent",
  description:
    "Browse available Spokane area rentals, single-family homes, and apartments. Schedule showings and submit online applications with Manito Property Management.",
};

export default function AvailableRentalsPage() {
  return <AvailableRentalsClient />;
}
