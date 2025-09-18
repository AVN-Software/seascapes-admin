"use client";

import { Listing } from "@/types/listing";
import { Amenity } from "@/types/amenity";
import Link from "next/link";
import { MapPin, Users, Bed, Bath, Heart, Edit3 } from "lucide-react";
import AmenityDisplayModule from "../amenities/AmenityDisplayModule";

interface ListingCardProps {
  listing: Listing;
  amenities: Amenity[];
  variant?: "default" | "compact";
}

export default function ListingCard({
  listing,
  amenities,
  variant = "default",
}: ListingCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {listing.title}
            </h2>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{listing.townname}</span>
            </div>
          </div>

          {/* Property Type Badge */}
          <div className="ml-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {listing.property_type}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{listing.num_bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{listing.num_baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{listing.max_guests} guests</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Pet Policy */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Pet Policy:</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              listing.pets_allowed
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <Heart className="w-3 h-3 mr-1" />
            {listing.pets_allowed ? "Pet Friendly" : "No Pets"}
          </span>
        </div>

        {/* Pricing Summary */}
        <div className="mt-4">
          <p className="text-md font-semibold text-gray-700 mb-2">Pricing:</p>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              Base Price:{" "}
              <span className="font-medium">
                {formatCurrency(listing.default_base_price)}
              </span>
            </div>
            <div>
              Guest Fee:{" "}
              <span className="font-medium">
                {formatCurrency(listing.default_guest_fee)}
              </span>
            </div>
            <div>
              Cleaning Fee:{" "}
              <span className="font-medium">
                {formatCurrency(listing.cleaning_fee)}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {variant === "default" && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {truncateText(listing.listing_desc)}
            </p>
          </div>
        )}

        {/* Property Description (collapsed by default) */}
        {variant === "default" && listing.property_desc && (
          <details className="group/details">
            <summary className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
              Full Description
              <span className="ml-1 text-xs text-gray-500 group-expanded/details:hidden">
                (Click to expand)
              </span>
            </summary>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {listing.property_desc}
            </p>
          </details>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Amenities ({amenities.length})
            </h3>
            <AmenityDisplayModule
              amenities={amenities}
              editMode={false}
              selectedIds={[]}
              onToggleSelect={() => {}}
              onRefresh={() => {}}
            />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">ID: {listing.id}</div>

          <div className="flex gap-2">
            <Link
              href={`/listings/${listing.id}/view`}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/listings/${listing.id}/edit/basic`}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
