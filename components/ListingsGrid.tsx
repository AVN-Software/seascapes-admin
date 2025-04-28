"use client";

import { Listing } from "@/types/listing"; // Adjust path as needed
import ListingCard from "./ListingCard";

interface ListingsGridProps {
  listings: Listing[];
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
