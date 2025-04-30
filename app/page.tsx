import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Listing } from "@/types/listing";

import React from "react";
import ListingsSlider from "@/components/ListingsSlider";
import { ListingAmenity } from "@/types/amenity";

export default async function Home() {
  const supabase = await createClient();

  const { data: listings, error: listingError } = await supabase
    .from("listings")
    .select("*");

  if (listingError || !listings) {
    console.error("Error fetching listings:", listingError);
    return notFound();
  }

  const typedListings = listings as Listing[];

  // 2. Fetch All Amenities (master list)
  const { data: amenitiesData, error: amenitiesError } = await supabase
    .from("amenities")
    .select("*");

  if (amenitiesError) {
    console.error("Error fetching amenities:", amenitiesError);
  }

  // 3. Fetch Amenity Map (links)
  const { data: amenityMapData, error: amenityMapError } = await supabase
    .from("amenity_map")
    .select("*");

  if (amenityMapError) {
    console.error("Error fetching amenity_map:", amenityMapError);
  }

  // 4. Build listing_amenities array
  const listingAmenities: ListingAmenity[] = [];

  if (amenitiesData && amenityMapData) {
    for (const mapItem of amenityMapData) {
      const matchedAmenity = amenitiesData.find(
        (a) => a.amenity_id === mapItem.amenity_id
      );

      if (matchedAmenity) {
        listingAmenities.push({
          listing_id: mapItem.listing_id,
          amenity_id: matchedAmenity.amenity_id,
          name: matchedAmenity.name,
          category: matchedAmenity.category,
        });
      }
    }
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      <ListingsSlider listings={typedListings} amenities={listingAmenities} />
    </main>
  );
}
