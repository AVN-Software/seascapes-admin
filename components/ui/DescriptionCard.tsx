import React from "react";
import { Info } from "lucide-react";

interface DescriptionCardProps {
  title?: string;
  overview?: string;
  fullDescription?: string;
  className?: string;
}

export default function DescriptionCard({
  title = "About This Property",
  overview,
  fullDescription,
  className = "",
}: DescriptionCardProps) {
  // Don't render if no content provided
  if (!overview && !fullDescription) {
    return null;
  }

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Info className="w-5 h-5 mr-2" />
        {title}
      </h2>

      <div className="space-y-4">
        {overview && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {overview}
            </p>
          </div>
        )}

        {fullDescription && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Full Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {fullDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
