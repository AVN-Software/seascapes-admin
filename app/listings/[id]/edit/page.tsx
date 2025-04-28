"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Listing } from "@/types/listing";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setListing(data);
      }
      setLoading(false);
    }

    if (id) {
      fetchListing();
    }
  }, [id]);

  async function handleSave() {
    if (!listing) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("listings")
      .update(listing)
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Failed to save changes.");
    } else {
      alert("Listing updated!");
      router.push("/");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!listing) return <div className="p-6">Listing not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border rounded-2xl overflow-hidden shadow-md flex flex-col p-6 bg-white space-y-6">
        {/* Title and Town */}
        <div>
          <input
            type="text"
            value={listing.title}
            onChange={(e) => setListing({ ...listing, title: e.target.value })}
            placeholder="Title"
            className="text-2xl font-bold w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            value={listing.townname}
            onChange={(e) =>
              setListing({ ...listing, townname: e.target.value })
            }
            placeholder="Town"
            className="text-sm text-gray-600 w-full border p-2 rounded"
          />
        </div>

        {/* Property Type */}
        <div className="text-sm text-gray-500">
          <label className="block text-xs font-medium mb-1">
            Property Type:
          </label>
          <input
            type="text"
            value={listing.property_type}
            onChange={(e) =>
              setListing({ ...listing, property_type: e.target.value })
            }
            placeholder="Property Type"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Capacity Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Bedrooms</label>
            <input
              type="number"
              value={listing.num_bedrooms}
              onChange={(e) =>
                setListing({ ...listing, num_bedrooms: +e.target.value })
              }
              placeholder="Bedrooms"
              className="border p-2 rounded w-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Bathrooms</label>
            <input
              type="number"
              value={listing.num_baths}
              onChange={(e) =>
                setListing({ ...listing, num_baths: +e.target.value })
              }
              placeholder="Bathrooms"
              className="border p-2 rounded w-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Max Guests</label>
            <input
              type="number"
              value={listing.max_guests}
              onChange={(e) =>
                setListing({ ...listing, max_guests: +e.target.value })
              }
              placeholder="Guests"
              className="border p-2 rounded w-32"
            />
          </div>
        </div>

        {/* Pets Allowed */}
        <div className="flex items-center gap-2 mt-4">
          <label className="text-sm font-medium">Pet Friendly?</label>
          <input
            type="checkbox"
            checked={listing.pets_allowed}
            onChange={(e) =>
              setListing({ ...listing, pets_allowed: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* Pricing Info */}
        <div className="space-y-2 mt-4">
          <p className="text-md font-semibold text-gray-700">Pricing:</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <input
              type="number"
              value={listing.default_base_price}
              onChange={(e) =>
                setListing({ ...listing, default_base_price: +e.target.value })
              }
              placeholder="Base Price"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={listing.default_guest_fee}
              onChange={(e) =>
                setListing({ ...listing, default_guest_fee: +e.target.value })
              }
              placeholder="Guest Fee"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={listing.cleaning_fee}
              onChange={(e) =>
                setListing({ ...listing, cleaning_fee: +e.target.value })
              }
              placeholder="Cleaning Fee"
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col mt-6">
          <p className="text-md font-semibold text-gray-700 mb-1">
            Listing Overview:
          </p>
          <textarea
            value={listing.listing_desc}
            onChange={(e) =>
              setListing({ ...listing, listing_desc: e.target.value })
            }
            className="border p-2 rounded min-h-[80px]"
            placeholder="Short overview description"
          />
        </div>

        {/* Full Property Description */}
        <div className="flex flex-col mt-4">
          <p className="text-md font-semibold text-gray-700 mb-1">
            Full Property Description:
          </p>
          <textarea
            value={listing.property_desc}
            onChange={(e) =>
              setListing({ ...listing, property_desc: e.target.value })
            }
            className="border p-2 rounded min-h-[120px]"
            placeholder="Full property description"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
