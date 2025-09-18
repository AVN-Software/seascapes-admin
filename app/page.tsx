import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import { Listing, ListingCardData, mapListingToCard } from "@/types/listing";
import ListingSection from "@/components/grids/ListingGrid";

export default async function Home() {
  const supabase = await createClient();

  const listingsData: Listing[] = [];

  // 1. Fetch Listings
  const { data: listings, error: listingError } = await supabase
    .from("listings")
    .select("*");

  if (listingError || !listings) {
    console.error("Error fetching listings:", listingError);
    return notFound();
  }

  listingsData.push(...(listings as Listing[]));

  const listingCardsData: ListingCardData[] = listingsData.map((listingData) =>
    mapListingToCard(listingData)
  );

  // 4. Render
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      <ListingSection listingCards={listingCardsData} />
    </main>
  );
}
