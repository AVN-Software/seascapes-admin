"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { Listing } from "@/types/listing";
import { Amenity } from "@/types/amenity";

interface ListingAmenitiesContextProps {
  listing: Listing | null;
  selectedListingId: string | null;
  setSelectedListingId: (id: string) => void;

  allAmenities: Amenity[];
  selectedAmenities: string[];
  setSelectedAmenities: (ids: string[]) => void;
  selectedForDeassign: string[];
  setSelectedForDeassign: (ids: string[]) => void;
  toggleDeassignAmenity: (id: string) => void;
  clearDeassignSelection: () => void;
  confirmDeassign: () => void;

  loading: boolean;
  saving: boolean;

  fetchAmenitiesData: (listingId: string) => Promise<void>;
  handleToggleAmenity: (amenityId: string) => void;
  handleSave: () => Promise<void>;
}

const ListingAmenitiesContext = createContext<
  ListingAmenitiesContextProps | undefined
>(undefined);

export function useListingAmenities() {
  const context = useContext(ListingAmenitiesContext);
  if (!context) {
    throw new Error(
      "useListingAmenities must be used inside a ListingAmenitiesProvider"
    );
  }
  return context;
}

export function ListingAmenitiesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [listing, setListing] = useState<Listing | null>(null);
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Extra state for multi-deassign
  const [selectedForDeassign, setSelectedForDeassign] = useState<string[]>([]);

  // Toggle amenity in selection list
  function toggleDeassignAmenity(id: string) {
    setSelectedForDeassign((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Clear all selections
  function clearDeassignSelection() {
    setSelectedForDeassign([]);
  }

  // Confirm removal (soft delete from context)
  function confirmDeassign() {
    setSelectedAmenities((prev) =>
      prev.filter((id) => !selectedForDeassign.includes(id))
    );
    clearDeassignSelection();
  }

  useEffect(() => {
    if (selectedListingId) {
      fetchAmenitiesData(selectedListingId);
    }
  }, [selectedListingId]);

  /**
   * Fetch listing and related amenities
   */
  async function fetchAmenitiesData(listingId: string) {
    setLoading(true);

    // Fetch listing
    const { data: listingData } = await supabase
      .from("listings")
      .select("*")
      .eq("id", listingId)
      .single();

    setListing(listingData);

    // Fetch all available amenities
    const { data: amenitiesData } = await supabase
      .from("amenities")
      .select("*");
    setAllAmenities(amenitiesData || []);

    // Fetch linked amenities (using property_id!)
    const { data: mapData } = await supabase
      .from("amenity_map")
      .select("*")
      .eq("listing_id", listingId);

    const linked = mapData?.map((m) => m.amenity_id) || [];
    setSelectedAmenities(linked);

    setLoading(false);
  }

  /**
   * Toggle an amenity in or out of the selected list
   */
  function handleToggleAmenity(amenityId: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  }

  /**
   * Save amenity assignments to `amenity_map`
   */
  async function handleSave() {
    if (!selectedListingId || !listing) return;
    setSaving(true);

    // Delete old links
    await supabase
      .from("amenity_map")
      .delete()
      .eq("listing_id", selectedListingId);

    // Insert new links
    const insertData = selectedAmenities.map((id) => ({
      listing_id: selectedListingId, // ✅ use updated column name
      amenity_id: id,
    }));

    const { error } = await supabase.from("amenity_map").insert(insertData);
    setSaving(false);

    if (error) {
      console.error("Failed to update amenities:", error);
      alert("Failed to update amenities. " + (error.message || ""));
    } else {
      alert("Amenities updated!");
    }
  }

  return (
    <ListingAmenitiesContext.Provider
      value={{
        listing,
        selectedListingId,
        setSelectedListingId,
        allAmenities,
        selectedAmenities,
        setSelectedAmenities,
        loading,
        saving,
        fetchAmenitiesData,
        handleToggleAmenity,
        handleSave,
        // New
        selectedForDeassign,
        setSelectedForDeassign,
        toggleDeassignAmenity,
        clearDeassignSelection,
        confirmDeassign,
      }}
    >
      {children}
    </ListingAmenitiesContext.Provider>
  );
}
