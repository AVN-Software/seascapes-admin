import React, { ReactNode } from "react";
import { MapPin } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location?: string;
  propertyType?: string;
  id?: string | number;
  className?: string;
  showId?: boolean;
  children?: ReactNode;
  titleClassName?: string;
  locationClassName?: string;
  badgeClassName?: string;
  idClassName?: string;
}

export default function PropertyHeader({
  title,
  location,
  propertyType,
  id,
  className = "",
  showId = true,
  children,
  titleClassName = "text-3xl font-bold text-gray-900 mb-2",
  locationClassName = "text-lg",
  badgeClassName = "bg-blue-100 text-blue-800",
  idClassName = "text-sm text-gray-500 mt-2",
}: PropertyHeaderProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Left side - Title and Location */}
        <div className="flex-1 min-w-0 pr-4">
          <h1 className={titleClassName}>{title}</h1>

          {location && (
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className={locationClassName}>{location}</span>
            </div>
          )}
        </div>

        {/* Right side - Badge and ID */}
        <div className="text-right flex-shrink-0">
          {propertyType && (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClassName}`}
            >
              {propertyType}
            </span>
          )}

          {showId && id && <div className={idClassName}>ID: {id}</div>}
        </div>
      </div>

      {/* Additional content */}
      {children}
    </div>
  );
}
