import React, { ReactNode } from "react";
import { DollarSign, LucideIcon } from "lucide-react";
import Link from "next/link";

interface PriceItem {
  label: string;
  value: number | string;
  formatted?: string;
}

interface PricingCardProps {
  title?: string;
  icon?: LucideIcon;
  basePrice?: number;
  basePriceLabel?: string;
  additionalFees?: PriceItem[];
  disclaimer?: string;
  ctaText?: string;
  ctaLink?: string;
  formatCurrency?: (value: number) => string;
  className?: string;
  sticky?: boolean;
  children?: ReactNode;
}

export default function PricingCard({
  title = "Pricing",
  icon: Icon = DollarSign,
  basePrice,
  basePriceLabel = "Base Price per Night",
  additionalFees = [],
  disclaimer = "* Prices may vary based on season and booking duration",
  ctaText = "Check Availability",
  ctaLink,
  formatCurrency = (value: number) =>
    value.toLocaleString("en-ZA", { style: "currency", currency: "ZAR" }),
  className = "",
  sticky = true,
  children,
}: PricingCardProps) {
  const stickyClass = sticky ? "sticky top-6" : "";

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${stickyClass} ${className}`}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-2" />
        {title}
      </h2>

      <div className="space-y-4">
        {/* Base Price Display */}
        {basePrice !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900 mb-1">
              {typeof basePrice === "number"
                ? formatCurrency(basePrice)
                : basePrice}
            </div>
            <div className="text-blue-700">{basePriceLabel}</div>
          </div>
        )}

        {/* Additional Fees */}
        {additionalFees.length > 0 && (
          <div className="space-y-3 text-sm">
            {additionalFees.map((fee, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-gray-600">{fee.label}:</span>
                <span className="font-medium">
                  {fee.formatted ||
                    (typeof fee.value === "number"
                      ? formatCurrency(fee.value)
                      : fee.value)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Custom Content */}
        {children}

        {/* CTA Section */}
        {(disclaimer || ctaLink) && (
          <div className="pt-4 border-t border-gray-200">
            {disclaimer && (
              <div className="text-xs text-gray-500 mb-3">{disclaimer}</div>
            )}

            {ctaLink && (
              <Link
                href={ctaLink}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors"
              >
                {ctaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
