import React from "react";
import Link from "next/link";

interface ButtonConfig {
  label: React.ReactNode;
  href: string;
  isExternal?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

interface HeroBannerProps {
  backgroundImage: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttons?: ButtonConfig[];
  minHeight?: string;
  align?: "center" | "left";
  overlayOpacity?: string;
  maxWidth?: string;
  children?: React.ReactNode;
  className?: string;
  backgroundPosition?: string;
}

export default function HeroBanner({
  backgroundImage,
  title,
  subtitle,
  buttons,
  minHeight = "min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]",
  align = "center",
  overlayOpacity = "bg-slate-900/65",
  maxWidth = "max-w-5xl",
  children,
  className = "",
  backgroundPosition = "bg-center",
}: HeroBannerProps) {
  return (
    <div
      className={`relative w-full ${minHeight} flex flex-col items-center justify-center bg-cover ${backgroundPosition} bg-no-repeat overflow-hidden ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark tint overlay for text contrast */}
      <div className={`absolute inset-0 ${overlayOpacity} backdrop-brightness-95`} />

      <div className={`relative z-10 ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center w-full`}>
        <div
          className={`space-y-3 sm:space-y-4 ${
            align === "left" ? "text-left" : "text-center"
          }`}
        >
          {title && (
            <div className="text-white font-serif font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase drop-shadow-md leading-tight">
              {title}
            </div>
          )}

          {subtitle && (
            <div className="text-gray-100 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed drop-shadow">
              {subtitle}
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-4">
              {buttons.map((btn, idx) => {
                const isPrimary = btn.variant === "primary" || !btn.variant;
                const baseClass =
                  "inline-flex items-center justify-center px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md border-2 border-white";
                const variantClass = isPrimary
                  ? "bg-[#415161] hover:bg-[#32404e] text-white"
                  : btn.variant === "secondary"
                  ? "bg-white hover:bg-gray-100 text-[#415161]"
                  : "bg-transparent hover:bg-white/20 text-white";

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

        {children && <div className="mt-8 sm:mt-10 w-full">{children}</div>}
      </div>
    </div>
  );
}
