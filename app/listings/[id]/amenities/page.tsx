// app/manageListings/listing-manager/page.tsx
"use client";

import ListingAmenitiesManager from "@/components/listingAmenities/ListingAmenitiesManager";
import { ListingAmenitiesProvider } from "@/context/ListingAmenitiesContext";

export default function ListingManagerPage() {
  return (
    <ListingAmenitiesProvider>
      <div className="p-6">
        <ListingAmenitiesManager />
      </div>
    </ListingAmenitiesProvider>
  );
}
