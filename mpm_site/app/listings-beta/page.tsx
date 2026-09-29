"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListingsBetaPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/available-rentals/");
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-xl font-bold text-slate-800 mb-2">Redirecting to Available Rentals...</h1>
      <p className="text-sm text-gray-600">
        If you are not redirected automatically,{" "}
        <a href="/available-rentals/" className="text-[#415161] hover:underline font-semibold">
          click here to view Available Rentals
        </a>
        .
      </p>
    </div>
  );
}
