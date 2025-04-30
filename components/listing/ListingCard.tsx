"use client";

import { Listing } from "@/types/listing";
import { Amenity } from "@/types/amenity";
import Link from "next/link";
import AmenityDisplayModule from "../amenities/AmenityDisplayModule";

interface ListingCardProps {
  listing: Listing;
  amenities: Amenity[];
}

export default function ListingCard({ listing, amenities }: ListingCardProps) {
  return (
    <div className="border rounded-2xl overflow-hidden shadow-md flex flex-col hover:scale-105 transition-transform p-6 bg-white">
      <div className="flex flex-col gap-2">
        {/* Title and Town */}
        <div>
          <h2 className="text-xl font-bold">{listing.title}</h2>
          <p className="text-sm text-gray-600">{listing.townname}</p>
        </div>

        {/* Property Type */}
        <div className="text-sm text-gray-500">
          Property Type:{" "}
          <span className="font-medium">{listing.property_type}</span>
        </div>

        {/* Capacity Info */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
          <span>{listing.num_bedrooms} Bedrooms</span>
          <span>• {listing.num_baths} Bathrooms</span>
          <span>• Max {listing.max_guests} Guests</span>
        </div>

        {/* Pets Allowed */}
        <div className="text-sm mt-2">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs ${
              listing.pets_allowed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {listing.pets_allowed ? "Pet Friendly" : "No Pets Allowed"}
          </span>
        </div>

        {/* Pricing Info */}
        <div className="mt-4">
          <p className="text-md font-semibold text-gray-700">Pricing:</p>
          <ul className="text-sm text-gray-600 ml-4 list-disc">
            <li>Base Price: R{listing.default_base_price}</li>
            <li>Guest Fee: R{listing.default_guest_fee}</li>
            <li>Cleaning Fee: R{listing.cleaning_fee}</li>
          </ul>
        </div>

        {/* Listing Overview */}
        <div className="mt-4">
          <p className="text-md font-semibold text-gray-700">
            Listing Overview:
          </p>
          <p className="text-sm text-gray-600 mt-1">{listing.listing_desc}</p>
        </div>

        {/* Full Property Description */}
        <div className="mt-4">
          <p className="text-md font-semibold text-gray-700">
            Full Property Description:
          </p>
          <p className="text-sm text-gray-600 mt-1">{listing.property_desc}</p>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mt-4">
            <p className="text-md font-semibold text-gray-700 mb-2">
              Amenities:
            </p>
            <AmenityDisplayModule
              amenities={amenities}
              editMode={false}
              selectedIds={[]} // no selections in view-only
              onToggleSelect={() => {}} // no-op
              onRefresh={() => {}} // no-op
            />
          </div>
        )}

        {/* Edit Button */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={`/listings/${listing.id}/edit/basic`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap"
          >
            Edit Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
