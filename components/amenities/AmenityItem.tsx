"use client";

import { Amenity } from "@/types/amenity";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface AmenityItemProps {
  amenity: Amenity;
  editMode: boolean; // Whether edit/delete UI and checkbox should show
  isSelected: boolean; // Whether checkbox is selected
  onToggle: () => void; // Called when checkbox is clicked
  onEdit?: () => void; // Optional edit button click (only if passed)
  onDelete?: () => void; // Optional delete button click (only if passed)
}

export default function AmenityItem({
  amenity,
  editMode,
  isSelected,
  onToggle,
  onEdit,
  onDelete,
}: AmenityItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 px-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
      <div className="flex items-center gap-2">
        {editMode && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="w-4 h-4"
          />
        )}
        <span className="text-sm font-medium text-slate-700">
          {amenity.name}
        </span>
      </div>

      {editMode && (onEdit || onDelete) && (
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-teal-600 hover:text-teal-800 transition"
            >
              <FiEdit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 transition"
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
