"use client";

import { useAmenities } from "@/context/AmenitiesContext";

import AddAmenityModal from "../models/AddAmenitiesModal";
import EditAmenityModal from "../models/EditAmenityModal";
import ConfirmDeleteModal from "../models/ConfirmDeleteModal";
import ToggleSwitch from "../ToggleSwitch";
import AmenityDisplayModule from "./AmenityDisplayModule";

export default function AmenitiesManager() {
  const {
    categories,

    loading,
    editMode,
    modals,
    currentAmenity,
    filteredAmenities,
    selectedIds,

    toggleEditMode,
    openModal,
    closeModal,
    addAmenity,
    editAmenity,
    deleteAmenity,
    fetchAmenities,
    toggleSelect, // updated from toggleSelect
  } = useAmenities();

  if (loading) {
    return <div className="p-6">Loading amenities...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Modals */}
      <AddAmenityModal
        isOpen={modals.add}
        onClose={() => closeModal("add")}
        existingCategories={categories}
        onSave={addAmenity}
      />
      <EditAmenityModal
        isOpen={modals.edit}
        onClose={() => closeModal("edit")}
        amenity={currentAmenity}
        existingCategories={categories}
        onSave={(name: string, category: string) => {
          if (currentAmenity) {
            editAmenity(currentAmenity.amenity_id, name, category);
          }
        }}
      />
      <ConfirmDeleteModal
        isOpen={modals.delete}
        onClose={() => closeModal("delete")}
        amenityName={currentAmenity?.name || ""}
        onConfirm={() => {
          if (currentAmenity) {
            deleteAmenity(currentAmenity.amenity_id);
          }
        }}
      />

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Master Amenities List
        </h1>
        <p className="text-sm text-slate-500">
          Manage or view all available amenities grouped by category.
        </p>
      </div>

      {/* Add Button + Edit Mode */}
      <div className="flex flex-wrap gap-3 items-center justify-end">
        <button
          type="button"
          onClick={() => openModal("add")}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg font-semibold transition"
        >
          + Add Amenity
        </button>

        <ToggleSwitch
          checked={editMode}
          onChange={toggleEditMode}
          label="Edit Mode"
        />
      </div>

      {/* Amenity Display Block */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <AmenityDisplayModule
          amenities={filteredAmenities}
          selectedIds={selectedIds}
          editMode={editMode}
          onRefresh={fetchAmenities}
          onToggleSelect={toggleSelect} // ✅ fixed
        />
      </div>
    </div>
  );
}
