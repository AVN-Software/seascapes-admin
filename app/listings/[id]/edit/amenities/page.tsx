import EditListingForm from "@/components/listing/EditListingForm";
import ListingChangePanel from "@/components/listing/ListingChangePanel";
import { ListingEditProvider } from "@/context/ListingFormContext";

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EditAmenitiesPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const supabase = await createClient();

  // 1. Fetch listing data
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (listingError || !listing) {
    console.error("Error fetching listing:", listingError);
    return notFound();
  }

  return (
    <ListingEditProvider initialData={listing}>
      <div className="min-h-screen w-full bg-gray-50">
        {/* Header */}
        <div className="px-6 pt-10 pb-4 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Editing: {listing.title}
          </h1>
          <p className="text-sm text-slate-500 mb-2">
            Listing ID: <span className="font-mono">{listing.id}</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            Use the form below to update this property’s details — including its
            name, capacity, pricing, description, and amenities. Changes will
            only be saved once confirmed.
          </p>
        </div>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1">
            <EditListingForm />
          </div>

          {/* Right: Change Panel (Always Visible) */}
          <div className="w-full lg:w-1/3">
            <ListingChangePanel />
          </div>
        </div>
      </div>
    </ListingEditProvider>
  );
}
