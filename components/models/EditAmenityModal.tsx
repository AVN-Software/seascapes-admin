"use client";

import { useState, useEffect } from "react";

import { Amenity } from "@/types/amenity";
import Modal from "./Modal";

interface EditAmenityModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenity: Amenity | null;
  existingCategories: string[];
  onSave: (updatedName: string, updatedCategory: string) => void;
}

export default function EditAmenityModal({
  isOpen,
  onClose,
  amenity,
  existingCategories,
  onSave,
}: EditAmenityModalProps) {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (amenity) {
      setName(amenity.name);
      setSelectedCategory(amenity.category || "");
    }
  }, [amenity]);

  function handleSubmit() {
    const finalCategory =
      selectedCategory === "NEW" ? newCategory : selectedCategory;
    if (!name || !finalCategory) {
      alert("Please enter both a name and category.");
      return;
    }
    onSave(name.trim(), finalCategory.trim());
    setName("");
    setSelectedCategory("");
    setNewCategory("");
    onClose();
  }

  if (!amenity) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-700 mb-6">Edit Amenity</h2>

      <div className="space-y-4">
        {/* Amenity Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Amenity Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Wifi"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select a category</option>
            {existingCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="NEW">➕ Add New Category</option>
          </select>
        </div>

        {/* New Category Input */}
        {selectedCategory === "NEW" && (
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              New Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Safety Equipment"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg font-semibold transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
