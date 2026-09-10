import React from "react";
import AvailableRentalsClient from "@/components/AvailableRentalsClient";

export const metadata = {
  title: "Available Rentals - Houses and Apartments for Rent in Spokane",
  description:
    "View our available rental homes, apartments, and duplexes in Spokane, WA. Schedule showings and submit applications online with Manito Property Management.",
};

export default function AvailableRentalsPage() {
  return <AvailableRentalsClient />;
}
