import React from "react";
import { notFound } from "next/navigation";
import { Edit, Calendar, Star, Settings, DollarSign } from "lucide-react";
import Link from "next/link";

import AmenityDisplayModule from "@/components/amenities/AmenityDisplayModule";
import { createClient } from "@/utils/supabase/client";
import BackButton from "@/components/ui/BackButton";
import DescriptionCard from "@/components/ui/DescriptionCard";
import PropertyStats from "@/components/ui/PropertyStats";
import PropertyHeader from "@/components/ui/PropertyHeader";
import QuickActionsCard from "@/components/ui/QuickActionsCard";
import PricingCard from "@/components/ui/PricingCard";

type Params = Promise<{ id: string }>;

export default async function ViewListingPage(props: { params: Params }) {
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

  // 2. Fetch amenities for the listing
  const { data: amenitiesRaw, error: amenitiesError } = await supabase
    .from("listing_amenities_view")
    .select("*")
    .eq("listing_id", id);
  const amenities = amenitiesRaw ?? [];

  if (amenitiesError) {
    console.error("Error fetching amenities:", amenitiesError);
  }

  function formatCurrency(value: number) {
    return value != null
      ? value.toLocaleString("en-ZA", { style: "currency", currency: "ZAR" })
      : "-";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <BackButton />

          <div className="flex gap-2">
            <Link
              href={`/listings/${listing.id}/edit/basic`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Listing
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <PropertyHeader
              title={listing.title}
              location={listing.townname}
              propertyType={listing.property_type}
              id={listing.id}
            >
              <PropertyStats
                bedrooms={listing.num_bedrooms}
                bathrooms={listing.num_baths}
                maxGuests={listing.max_guests}
                petsAllowed={listing.pets_allowed}
              />
            </PropertyHeader>
            {/* Description Card */}
            <DescriptionCard
              title="About This Property"
              overview={listing.listing_desc}
              fullDescription={listing.property_desc}
            />

            {/* Amenities Card */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Amenities ({amenities.length})
                </h2>

                <AmenityDisplayModule
                  amenities={amenities}
                  editMode={false}
                  selectedIds={[]}
                  onToggleSelect={() => {}}
                  onRefresh={() => {}}
                  compact={false}
                  showRefresh={false}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PricingCard
              basePrice={listing.default_base_price}
              additionalFees={[
                {
                  label: "Cleaning Fee",
                  value: listing.cleaning_fee,
                },
              ]}
              formatCurrency={formatCurrency}
            />

            <QuickActionsCard
              actions={[
                {
                  label: "Edit Basic Info",
                  href: `/listings/${listing.id}/basic`,
                  icon: Edit,
                },
                {
                  label: "Edit Rates", // New action
                  href: `/listings/${listing.id}/rates`,
                  icon: DollarSign,
                  variant: "secondary",
                },
                {
                  label: "Manage Amenities",
                  href: `/listings/${listing.id}/amenities`,
                  icon: Settings,
                },
                {
                  label: "View Calendar",
                  href: `/listings/${listing.id}/calendar`,
                  icon: Calendar,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
