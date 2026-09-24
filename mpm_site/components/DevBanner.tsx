"use client";

import { useEffect, useState } from "react";

export default function DevBanner() {
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      // Show on dev subdomain, localhost, or preview domains
      if (
        host.startsWith("dev.") ||
        host === "localhost" ||
        host.includes("127.0.0.1") ||
        host.includes("workers.dev") ||
        host.includes("pages.dev")
      ) {
        setIsDev(true);
      }
    }
  }, []);

  if (!isDev) return null;

  return (
    <div
      role="region"
      aria-label="Development environment preview banner"
      className="w-full bg-[#f59e0b] text-[#0f172a] border-t border-[#d97706] py-2 px-4 text-center text-xs font-semibold flex flex-wrap items-center justify-center gap-2 select-none"
    >
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-bold tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Dev Environment
      </span>
      <span className="font-bold text-slate-900">
        dev.manitopropertymgmt.com
      </span>
      <span className="text-slate-800 font-medium">
        &mdash; Staging Build for Testing Only
      </span>
    </div>
  );
}
