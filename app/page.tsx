// app/page.tsx
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import { Listing } from "@/types/listing"; // Your Listing interface
import React from "react";

import ListingsSlider from "@/components/ListingsSlider";

export const revalidate = 3600; // Revalidate data every hour
export const dynamic = "force-static";

export default async function Home() {
  const supabase = await createClient();

  const { data: listings, error: listingError } = await supabase
    .from("listings")
    .select("*");

  if (listingError || !listings) {
    console.error("Error fetching listings:", listingError);
    return notFound();
  }

  // Type assertion (to help TypeScript know this is Listing[])
  const typedListings = listings as Listing[];

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      <ListingsSlider listings={typedListings} />
    </main>
  );
}
