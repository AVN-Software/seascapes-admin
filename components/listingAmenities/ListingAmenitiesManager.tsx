"use client";

import { useEffect, useState } from "react";
import { useListingAmenities } from "@/context/ListingAmenitiesContext";
import { createClient } from "@/utils/supabase/client";
import AssignAmenityModal from "../models/AssignAmenityModel";
import ConfirmDeassignModal from "../models/ConfirmDeassignModal"; // ← include this
import { FiTrash2 } from "react-icons/fi";

export default function ListingAmenitiesManager() {
  const supabase = createClient();
  const [listings, setListings] = useState<{ id: string; title: string }[]>([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [deassignModalOpen, setDeassignModalOpen] = useState(false);

  const {
    selectedListingId,
    setSelectedListingId,
    allAmenities,
    selectedAmenities,
    selectedForDeassign,
    toggleDeassignAmenity,
    clearDeassignSelection,
    handleSave,
  } = useListingAmenities();

  useEffect(() => {
    async function fetchListings() {
      const { data } = await supabase.from("listings").select("id, title");
      setListings(data || []);
    }
    fetchListings();
  }, []);

  const assigned = allAmenities.filter((a) =>
    selectedAmenities.includes(a.amenity_id)
  );

  return (
    <div className="space-y-6">
      {/* Listing dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700">
          Select Listing
        </label>
        <select
          value={selectedListingId || ""}
          onChange={(e) => {
            setSelectedListingId(e.target.value);
            clearDeassignSelection();
          }}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="" disabled>
            -- Choose a listing --
          </option>
          {listings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>
      </div>

      {/* Assigned amenities */}
      {selectedListingId && (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-slate-800">
            Assigned Amenities
          </h2>

          {assigned.length === 0 ? (
            <p className="text-sm text-slate-500">
              No amenities linked to this listing.
            </p>
          ) : (
            <ul className="space-y-2">
              {assigned.map((a) => (
                <li
                  key={a.amenity_id}
                  className="flex items-center justify-between bg-slate-100 px-3 py-2 rounded"
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedForDeassign.includes(a.amenity_id)}
                      onChange={() => toggleDeassignAmenity(a.amenity_id)}
                    />
                    <span className="text-sm text-slate-700">{a.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {selectedForDeassign.length > 0 && (
              <button
                onClick={() => setDeassignModalOpen(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <FiTrash2 className="inline-block mr-1" />
                Deassign Selected ({selectedForDeassign.length})
              </button>
            )}

            <button
              onClick={() => setAssignModalOpen(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              + Assign Amenities
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      <AssignAmenityModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
      />

      {/* Confirm Deassign Modal */}
      <ConfirmDeassignModal
        isOpen={deassignModalOpen}
        onClose={() => setDeassignModalOpen(false)}
      />
    </div>
  );
}
