// app/listings/[id]/rates/page.tsx
import RatesForm from "@/components/rates/RatesForm";
import { createClient } from "@/utils/supabase/server";

type Params = Promise<{ id: string }>;

export default async function EditRatesPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch listing data on the server
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Listing not found</p>
      </div>
    );
  }

  // Pass data into client form
  return (
    <RatesForm
      id={id}
      initialData={{
        default_price: listing.default_price || 0,
        cleaning_fee: listing.cleaning_fee || 0,
        minStay: listing.minStay || 1,
      }}
      listingTitle={listing.title || "Listing"}
    />
  );
}
