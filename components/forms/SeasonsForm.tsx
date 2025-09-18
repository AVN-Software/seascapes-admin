"use client";
import React from "react";
import { Plus, Save, X } from "lucide-react";

interface Season {
  id: string;
  name: "Festive" | "Holiday Peak" | "Standard";
  date_ranges: Array<{
    start_date: string;
    end_date: string;
  }>;
  minimum_stay: number;
  priority: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface SeasonsFormProps {
  formData: Season;
  setFormData: (data: Season) => void;
  onSave: () => void;
  onCancel: () => void;
  seasonOptions: Season["name"][];
}

export const SeasonForm = ({
  formData,
  setFormData,
  onSave,
  onCancel,
  seasonOptions,
}: SeasonsFormProps) => {
  const addDateRange = () => {
    setFormData({
      ...formData,
      date_ranges: [...formData.date_ranges, { start_date: "", end_date: "" }],
    });
  };

  const removeDateRange = (index: number) => {
    if (formData.date_ranges.length > 1) {
      setFormData({
        ...formData,
        date_ranges: formData.date_ranges.filter((_, i) => i !== index),
      });
    }
  };

  const updateDateRange = (
    index: number,
    field: "start_date" | "end_date",
    value: string
  ) => {
    const updatedRanges = formData.date_ranges.map((range, i) =>
      i === index ? { ...range, [field]: value } : range
    );
    setFormData({ ...formData, date_ranges: updatedRanges });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Season Name
          </label>
          <select
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value as Season["name"],
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {seasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority (lower = higher priority)
          </label>
          <input
            type="number"
            min="1"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: parseInt(e.target.value) || 1,
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Date Ranges */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Ranges
          </label>
          <button
            type="button"
            onClick={addDateRange}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Range
          </button>
        </div>

        <div className="space-y-3">
          {formData.date_ranges.map((range, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded"
            >
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={range.start_date}
                  onChange={(e) =>
                    updateDateRange(index, "start_date", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="date"
                  value={range.end_date}
                  onChange={(e) =>
                    updateDateRange(index, "end_date", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {formData.date_ranges.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDateRange(index)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Stay (nights)
          </label>
          <input
            type="number"
            min="1"
            value={formData.minimum_stay}
            onChange={(e) =>
              setFormData({
                ...formData,
                minimum_stay: parseInt(e.target.value) || 1,
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Season
        </button>
      </div>
    </div>
  );
};
