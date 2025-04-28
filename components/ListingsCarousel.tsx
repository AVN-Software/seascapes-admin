"use client";

import { Listing } from "@/types/listing";
import ListingCard from "@/components/ListingCard";

interface ListingsCarouselProps {
  listings: Listing[];
}

export default function ListingsCarousel({ listings }: ListingsCarouselProps) {
  return (
    <div className="overflow-x-auto whitespace-nowrap py-6 px-2">
      <div className="flex gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="min-w-[320px] max-w-[400px] flex-shrink-0"
          >
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
}
