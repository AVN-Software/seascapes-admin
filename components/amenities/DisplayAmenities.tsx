"use client";

import { useState, useEffect } from "react";
import { useAmenities } from "@/context/AmenitiesContext";

import AmenityItem from "./AmenityItem";

export default function DisplayAmenities() {
  const {
    filteredAmenities,
    editMode,
    selectedIds,
    bulkDeleteAmenities,
    categories,
    toggleSelect, // <- Assuming you have this in your context
  } = useAmenities();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const groupedFilteredAmenities = filteredAmenities.reduce((acc, amenity) => {
    const category = amenity.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(amenity);
    return acc;
  }, {} as Record<string, typeof filteredAmenities>);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  if (!filteredAmenities || filteredAmenities.length === 0) {
    return <div className="text-sm text-gray-500">No amenities added yet.</div>;
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
      <div className="border-t border-slate-200"></div>

      {/* Bulk Delete */}
      {editMode && selectedIds.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => bulkDeleteAmenities(selectedIds)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg font-semibold transition"
          >
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )}

      {/* List of amenities */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-700">{activeCategory}</h2>
        <ul className="flex flex-col gap-3">
          {groupedFilteredAmenities[activeCategory!]?.map((amenity) => (
            <AmenityItem
              key={amenity.amenity_id}
              amenity={amenity}
              editMode={editMode}
              isSelected={selectedIds.includes(amenity.amenity_id)}
              onToggle={() => toggleSelect(amenity.amenity_id)}
              // Optional edit/delete functions can go here if needed
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
