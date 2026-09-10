import React from "react";
import Link from "next/link";

interface ButtonConfig {
  label: string;
  href: string;
  isExternal?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

interface HeroBannerProps {
  backgroundImage: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  buttons?: ButtonConfig[];
  minHeight?: string;
  align?: "center" | "left";
  overlayOpacity?: string;
}

export default function HeroBanner({
  backgroundImage,
  title,
  subtitle,
  buttons,
  minHeight = "min-h-[380px] lg:min-h-[440px]",
  align = "center",
  overlayOpacity = "bg-slate-900/65",
}: HeroBannerProps) {
  return (
    <div
      className={`relative w-full ${minHeight} flex items-center justify-center bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark tint overlay for text contrast */}
      <div className={`absolute inset-0 ${overlayOpacity} backdrop-brightness-95`} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div
          className={`space-y-4 ${
            align === "left" ? "text-left" : "text-center"
          }`}
        >
          <div className="text-white font-serif font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase drop-shadow-md leading-tight">
            {title}
          </div>

          {subtitle && (
            <div className="text-gray-100 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed drop-shadow">
              {subtitle}
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {buttons.map((btn, idx) => {
                const isPrimary = btn.variant === "primary" || !btn.variant;
                const baseClass =
                  "inline-flex items-center justify-center px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md";
                const variantClass = isPrimary
                  ? "bg-[#415161] hover:bg-[#32404e] text-white border border-[#415161]"
                  : btn.variant === "secondary"
                  ? "bg-white hover:bg-gray-100 text-[#415161] border border-white"
                  : "bg-transparent hover:bg-white/20 text-white border border-white";

                if (btn.isExternal) {
                  return (
                    <a
                      key={idx}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} ${variantClass}`}
                    >
                      {btn.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={btn.href}
                    className={`${baseClass} ${variantClass}`}
                  >
                    {btn.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
