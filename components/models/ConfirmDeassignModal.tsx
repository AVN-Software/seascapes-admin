"use client";

import { useListingAmenities } from "@/context/ListingAmenitiesContext";
import Modal from "./Modal";

interface ConfirmDeassignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmDeassignModal({
  isOpen,
  onClose,
}: ConfirmDeassignModalProps) {
  const {
    allAmenities,
    selectedForDeassign,
    confirmDeassign,
    clearDeassignSelection,
  } = useListingAmenities();

  const selectedNames = allAmenities
    .filter((a) => selectedForDeassign.includes(a.amenity_id))
    .map((a) => a.name);

  const handleConfirm = () => {
    confirmDeassign();
    onClose();
  };

  const handleCancel = () => {
    clearDeassignSelection();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-800">
          Confirm Deassignment
        </h2>
        <p className="text-sm text-slate-600">
          Are you sure you want to remove the following amenities?
        </p>
        <ul className="text-sm list-disc ml-5 space-y-1 text-slate-700">
          {selectedNames.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="text-sm text-slate-500 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
          >
            Confirm Remove
          </button>
        </div>
      </div>
    </Modal>
  );
}
