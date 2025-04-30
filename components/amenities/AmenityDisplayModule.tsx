"use client";

import { useState } from "react";
import AmenitiesList from "./AmenitiesList";
import { Amenity } from "@/types/amenity";

interface AmenityDisplayModuleProps {
  amenities: Amenity[];
  selectedIds: string[];
  editMode: boolean;
  onRefresh: () => void;
  onToggleSelect: (amenityId: string) => void;
}

export default function AmenityDisplayModule({
  amenities,
  selectedIds,
  editMode,
  onRefresh,
  onToggleSelect,
}: AmenityDisplayModuleProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter amenities based on search term locally
  const filteredAmenities = amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Refresh Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg font-semibold transition"
        >
          Refresh
        </button>
      </div>

      {/* Amenities List */}
      <AmenitiesList
        amenities={filteredAmenities}
        editMode={editMode}
        selectedIds={selectedIds}
        onToggleSelect={onToggleSelect}
      />
    </div>
  );
}
