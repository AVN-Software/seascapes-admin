import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Listing } from "@/types/listing";
import { Amenity, ListingAmenity } from "@/types/amenity";

import ListingsSlider from "@/components/listing/ListingsSlider";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch Listings
  const { data: listings, error: listingError } = await supabase
    .from("listings")
    .select("*");

  if (listingError || !listings) {
    console.error("Error fetching listings:", listingError);
    return notFound();
  }

  const typedListings = listings as Listing[];

  // 2. Fetch All Amenities
  const { data: amenitiesData, error: amenitiesError } = await supabase
    .from("amenities")
    .select("*");

  if (amenitiesError || !amenitiesData) {
    console.error("Error fetching amenities:", amenitiesError);
    return notFound();
  }

  const typedAmenities = amenitiesData as Amenity[];

  // 3. Fetch Amenity Map (listing → amenity links)
  const { data: amenityMapData, error: amenityMapError } = await supabase
    .from("amenity_map")
    .select("*");

  if (amenityMapError || !amenityMapData) {
    console.error("Error fetching amenity_map:", amenityMapError);
    return notFound();
  }

  const typedAmenityMap = amenityMapData as ListingAmenity[];

  // 4. Render
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      <ListingsSlider
        listings={typedListings}
        amenities={typedAmenities}
        amenityMap={typedAmenityMap}
      />
    </main>
  );
}
