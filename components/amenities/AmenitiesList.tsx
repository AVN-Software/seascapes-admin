"use client";

import { useState, useEffect } from "react";
import { Amenity } from "@/types/amenity";
import AmenityItem from "./AmenityItem";

interface AmenitiesListProps {
  amenities: Amenity[];
  editMode: boolean;
  selectedIds: string[];
  onToggleSelect: (amenityId: string) => void;
}

export default function AmenitiesList({
  amenities,
  editMode,
  selectedIds,
  onToggleSelect,
}: AmenitiesListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  // Sort each group alphabetically
  Object.keys(groupedAmenities).forEach((category) => {
    groupedAmenities[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  const categories = Object.keys(groupedAmenities);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  if (amenities.length === 0) {
    return <div className="text-sm text-gray-500">No amenities found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                activeCategory === category
                  ? "bg-teal-700 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Scrollable Amenity List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-700">{activeCategory}</h2>
        <div className="max-h-80 overflow-y-auto pr-1">
          <ul className="flex flex-col gap-3">
            {groupedAmenities[activeCategory!]?.map((amenity) => (
              <li key={amenity.amenity_id}>
                <AmenityItem
                  amenity={amenity}
                  editMode={editMode}
                  isSelected={selectedIds.includes(amenity.amenity_id)}
                  onToggle={() => onToggleSelect(amenity.amenity_id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
