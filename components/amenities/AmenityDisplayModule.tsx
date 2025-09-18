"use client";

import { useState, useMemo } from "react";
import { Search, RefreshCw, Filter, X } from "lucide-react";
import AmenitiesList from "./AmenitiesList";

export interface Amenity {
  amenity_id: string;
  category: string | null;
  created_at: string | null;
  name: string;
  updated_at: string | null;
}
interface AmenityDisplayModuleProps {
  amenities: Amenity[];
  selectedIds: string[];
  editMode: boolean;
  onRefresh: () => void;
  onToggleSelect: (amenityId: string) => void;
  showSearch?: boolean;
  showRefresh?: boolean;
  compact?: boolean;
}

export default function AmenityDisplayModule({
  amenities,
  selectedIds,
  editMode,
  onRefresh,
  onToggleSelect,
  showSearch = true,
  showRefresh = true,
  compact = false,
}: AmenityDisplayModuleProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterSelected, setFilterSelected] = useState<
    "all" | "selected" | "unselected"
  >("all");

  // Memoized filtered amenities for better performance
  const filteredAmenities = useMemo(() => {
    let filtered = amenities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((amenity) =>
        amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply selection filter
    if (filterSelected === "selected") {
      filtered = filtered.filter((amenity) =>
        selectedIds.includes(amenity.amenity_id)
      );
    } else if (filterSelected === "unselected") {
      filtered = filtered.filter(
        (amenity) => !selectedIds.includes(amenity.amenity_id)
      );
    }

    return filtered;
  }, [amenities, searchTerm, filterSelected, selectedIds]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const selectedCount = selectedIds.length;
  const totalCount = amenities.length;
  const filteredCount = filteredAmenities.length;

  // Compact view for read-only display (like in listing cards)
  if (compact) {
    return (
      <div className="space-y-2">
        {showSearch && amenities.length > 6 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <AmenitiesList
          amenities={filteredAmenities}
          editMode={editMode}
          selectedIds={selectedIds}
          onToggleSelect={onToggleSelect}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      {editMode && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedCount > 0 ? (
              <span>
                <span className="font-semibold text-blue-600">
                  {selectedCount}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> amenities
                selected
              </span>
            ) : (
              <span>
                <span className="font-medium">{totalCount}</span> amenities
                available
              </span>
            )}
          </div>

          {filteredCount !== totalCount && (
            <div className="text-sm text-gray-500">
              Showing {filteredCount} results
            </div>
          )}
        </div>
      )}

      {/* Search and Filter Controls */}
      {(showSearch || showRefresh || editMode) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search Input */}
          {showSearch && (
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Filter and Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Selection Filter (only in edit mode) */}
            {editMode && selectedCount > 0 && (
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setFilterSelected("all")}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    filterSelected === "all"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterSelected("selected")}
                  className={`px-3 py-2 text-xs font-medium transition-colors border-l border-gray-300 ${
                    filterSelected === "selected"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Selected
                </button>
                <button
                  onClick={() => setFilterSelected("unselected")}
                  className={`px-3 py-2 text-xs font-medium transition-colors border-l border-gray-300 ${
                    filterSelected === "unselected"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Unselected
                </button>
              </div>
            )}

            {/* Refresh Button */}
            {showRefresh && (
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 text-sm rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1.5 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {filteredAmenities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Filter className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-gray-600 font-medium">
            {searchTerm
              ? "No amenities match your search"
              : "No amenities found"}
          </p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="text-blue-500 hover:text-blue-600 text-sm mt-1"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <AmenitiesList
          amenities={filteredAmenities}
          editMode={editMode}
          selectedIds={selectedIds}
          onToggleSelect={onToggleSelect}
        />
      )}
    </div>
  );
}
