"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";

import { useListingAmenities } from "@/context/ListingAmenitiesContext";
import AmenityDisplayModule from "../amenities/AmenityDisplayModule";

interface AssignAmenityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignAmenityModal({
  isOpen,
  onClose,
}: AssignAmenityModalProps) {
  const { allAmenities, selectedAmenities, setSelectedAmenities } =
    useListingAmenities();

  const [localSelection, setLocalSelection] = useState<string[]>([]);

  const unassignedAmenities = allAmenities.filter(
    (a) => !selectedAmenities.includes(a.amenity_id)
  );

  useEffect(() => {
    if (isOpen) {
      setLocalSelection([]);
    }
  }, [isOpen]);

  const toggleLocalSelect = (id: string) => {
    setLocalSelection((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    setSelectedAmenities([...selectedAmenities, ...localSelection]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-800">Assign Amenities</h2>

        {unassignedAmenities.length === 0 ? (
          <p className="text-sm text-slate-500">
            All amenities are already linked.
          </p>
        ) : (
          <AmenityDisplayModule
            amenities={unassignedAmenities}
            selectedIds={localSelection}
            editMode={true}
            onToggleSelect={toggleLocalSelect}
            onRefresh={() => {}}
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={localSelection.length === 0}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            Assign {localSelection.length > 0 && `(${localSelection.length})`}
          </button>
        </div>
      </div>
    </Modal>
  );
}
