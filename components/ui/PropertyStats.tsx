import React from "react";
import { Bed, Bath, Users, Heart, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
}

interface PropertyStatsProps {
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  petsAllowed?: boolean;
  customStats?: StatItem[];
  className?: string;
  showBorders?: boolean;
}

export default function PropertyStats({
  bedrooms,
  bathrooms,
  maxGuests,
  petsAllowed,
  customStats = [],
  className = "",
  showBorders = true,
}: PropertyStatsProps) {
  // Build default stats from props
  const defaultStats: StatItem[] = [];

  if (bedrooms !== undefined) {
    defaultStats.push({
      icon: Bed,
      value: bedrooms,
      label: bedrooms === 1 ? "Bedroom" : "Bedrooms",
      iconColor: "text-gray-400",
    });
  }

  if (bathrooms !== undefined) {
    defaultStats.push({
      icon: Bath,
      value: bathrooms,
      label: bathrooms === 1 ? "Bathroom" : "Bathrooms",
      iconColor: "text-gray-400",
    });
  }

  if (maxGuests !== undefined) {
    defaultStats.push({
      icon: Users,
      value: maxGuests,
      label: maxGuests === 1 ? "Guest" : "Max Guests",
      iconColor: "text-gray-400",
    });
  }

  if (petsAllowed !== undefined) {
    defaultStats.push({
      icon: Heart,
      value: petsAllowed ? "Yes" : "No",
      label: "Pets Allowed",
      iconColor: petsAllowed ? "text-green-500" : "text-red-500",
    });
  }

  // Combine default and custom stats
  const allStats = [...defaultStats, ...customStats];

  if (allStats.length === 0) {
    return null;
  }

  // Determine grid columns based on number of stats
  const getGridCols = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count <= 4) return "grid-cols-2 md:grid-cols-4";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    return "grid-cols-2 md:grid-cols-4";
  };

  const borderClasses = showBorders
    ? "py-4 border-t border-b border-gray-100"
    : "";

  return (
    <div
      className={`grid ${getGridCols(
        allStats.length
      )} gap-4 ${borderClasses} ${className}`}
    >
      {allStats.map((stat, index) => {
        const IconComponent = stat.icon;
        const iconColorClass = stat.iconColor || "text-gray-400";

        return (
          <div key={index} className="text-center">
            <IconComponent
              className={`w-6 h-6 ${iconColorClass} mx-auto mb-1`}
            />
            <div className="font-semibold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
