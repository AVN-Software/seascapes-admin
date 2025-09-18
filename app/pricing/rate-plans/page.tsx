"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  DollarSign,
  Calendar,
  Home,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// ---------- Types ----------
export interface Listing {
  id: string;
  title: string;
  townname: string;
  property_type: string;
  num_bedrooms: number;
  num_baths: number;
  max_guests: number;
  pets_allowed: boolean;
  cleaning_fee: number;
  cover_img: string;
  default_price: number;
  minStay: number;
  listing_desc: string;
  property_desc: string;
  created_at?: string;
  updated_at?: string;
}

export interface Season {
  id: string;
  name: "Festive" | "Holiday Peak" | "Standard";
  start_date: string;
  end_date: string;
  minimum_stay: number;
  priority: number;
  active: boolean;
}

export interface RateAdjustment {
  adjustment_type: "fixed" | "percentage";
  adjustment_value: number;
}

export interface RatePlan {
  id?: string;
  listing_id: string;
  season: Season;
  price: number;
  rateAdjustment: RateAdjustment;
  created_at?: string;
  updated_at?: string;
}

// ---------- Component ----------
const RatePlansManagement = () => {
  const supabase = createClient();

  const [availableListings, setAvailableListings] = useState<Listing[]>([]);
  const [availableSeasons, setAvailableSeasons] = useState<Season[]>([]);
  const [ratePlans, setRatePlans] = useState<RatePlan[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<RatePlan, "id" | "listing_id">>(
    {
      season: {} as Season,
      price: 0,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    }
  );

  // ---------- Fetch data ----------
  useEffect(() => {
    const fetchData = async () => {
      const { data: listings, error: listingErr } = await supabase
        .from("listings")
        .select("*");
      if (listingErr) console.error(listingErr);
      else {
        setAvailableListings(listings as Listing[]);
        if (listings.length > 0) setSelectedListing(listings[0]);
      }

      const { data: seasons, error: seasonErr } = await supabase
        .from("seasons")
        .select("*")
        .order("priority", { ascending: true });
      if (seasonErr) console.error(seasonErr);
      else setAvailableSeasons(seasons as Season[]);

      const { data: plans, error: plansErr } = await supabase
        .from("rate_plans")
        .select("*, season:seasons(*)"); // join seasons
      if (plansErr) console.error(plansErr);
      else setRatePlans(plans as unknown as RatePlan[]);
    };

    fetchData();
  }, []);

  // ---------- Derived ----------
  const currentRatePlans = selectedListing
    ? ratePlans.filter((plan) => plan.listing_id === selectedListing.id)
    : [];
  const usedSeasonIds = new Set(currentRatePlans.map((plan) => plan.season.id));
  const availableSeasonsForCreation = availableSeasons.filter(
    (season) => !usedSeasonIds.has(season.id)
  );

  // ---------- Helpers ----------
  const calculateFinalPrice = (
    basePrice: number,
    adjustment: RateAdjustment
  ): number => {
    return adjustment.adjustment_type === "fixed"
      ? basePrice + adjustment.adjustment_value
      : basePrice + (basePrice * adjustment.adjustment_value) / 100;
  };

  // ---------- Handlers ----------
  const handleEdit = (ratePlan: RatePlan) => {
    setEditingId(ratePlan.id!);
    setFormData({
      season: ratePlan.season,
      price: ratePlan.price,
      rateAdjustment: ratePlan.rateAdjustment,
    });
  };

  const handleSave = async () => {
    if (!selectedListing) return;

    if (editingId) {
      // Update
      const { data, error } = await supabase
        .from("rate_plans")
        .update({
          price: formData.price,
          rateAdjustment: formData.rateAdjustment,
          season_id: formData.season.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId)
        .select("*, season:seasons(*)")
        .single();

      if (error) console.error(error);
      else {
        setRatePlans(
          ratePlans.map((plan) =>
            plan.id === editingId ? (data as RatePlan) : plan
          )
        );
      }
      setEditingId(null);
    } else {
      // Create
      const { data, error } = await supabase
        .from("rate_plans")
        .insert({
          listing_id: selectedListing.id,
          season_id: formData.season.id,
          price: formData.price,
          rateAdjustment: formData.rateAdjustment,
          created_at: new Date().toISOString(),
        })
        .select("*, season:seasons(*)")
        .single();

      if (error) console.error(error);
      else setRatePlans([...ratePlans, data as RatePlan]);

      setIsCreating(false);
    }

    // Reset
    setFormData({
      season: availableSeasonsForCreation[0] || availableSeasons[0],
      price: selectedListing.default_price,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this rate plan?")) {
      const { error } = await supabase.from("rate_plans").delete().eq("id", id);
      if (error) console.error(error);
      else setRatePlans(ratePlans.filter((plan) => plan.id !== id));
    }
  };

  const handleListingChange = (listingId: string) => {
    const listing = availableListings.find((l) => l.id === listingId);
    if (listing) setSelectedListing(listing);
  };

  // ---------- JSX ----------
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Rate Plans Management
              </h1>
              <p className="text-gray-600 mt-1">
                Set seasonal pricing for your listings
              </p>
            </div>
          </div>

          {/* Listing Selector */}
          {availableListings.length > 0 && selectedListing && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Select Listing:
                </span>
              </div>
              <select
                value={selectedListing.id}
                onChange={(e) => handleListingChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {availableListings.map((listing) => (
                  <option key={listing.id} value={listing.id}>
                    {listing.title} - {listing.townname}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Listing Info */}
        {selectedListing && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              {selectedListing.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Location:</span>
                <br />
                {selectedListing.townname}
              </div>
              <div>
                <span className="font-medium">Property Type:</span>
                <br />
                {selectedListing.property_type}
              </div>
              <div>
                <span className="font-medium">Default Price:</span>
                <br />R{selectedListing.default_price.toLocaleString()}/night
              </div>
              <div>
                <span className="font-medium">Default Min Stay:</span>
                <br />
                {selectedListing.minStay} nights
              </div>
            </div>
          </div>
        )}

        {/* Rate Plans List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Rate Plans ({currentRatePlans.length})
            </h2>
            <button
              onClick={() => setIsCreating(true)}
              disabled={availableSeasonsForCreation.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Rate Plan
            </button>
          </div>

          {/* TODO: Keep your RatePlanForm and map currentRatePlans as in your original code */}
        </div>
      </div>
    </div>
  );
};

export default RatePlansManagement;
