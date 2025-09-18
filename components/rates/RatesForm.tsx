"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface RatesFormData {
  default_price: number;
  cleaning_fee: number;
  minStay: number;
}

interface RatesFormProps {
  id: string;
  initialData: RatesFormData;
  listingTitle: string;
}

export default function RatesForm({
  id,
  initialData,
  listingTitle,
}: RatesFormProps) {
  const supabase = createClient();

  const [formData, setFormData] = useState<RatesFormData>(initialData);
  const [originalData, setOriginalData] = useState<RatesFormData>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    field: keyof RatesFormData,
    value: string | number
  ) => {
    const numericValue =
      typeof value === "string" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [field]: numericValue }));
    if (success) setSuccess(false);
  };

  const hasChanges =
    formData.default_price !== originalData.default_price ||
    formData.cleaning_fee !== originalData.cleaning_fee ||
    formData.minStay !== originalData.minStay;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) {
      setError("No changes detected");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from("listings")
        .update({
          default_price: formData.default_price,
          cleaning_fee: formData.cleaning_fee,
          minStay: formData.minStay,
        })
        .eq("id", id);

      if (updateError) throw new Error(updateError.message);

      setOriginalData(formData);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save rates");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    setError(null);
    setSuccess(false);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-ZA", { style: "currency", currency: "ZAR" });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href={`/listings/${id}/view`}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Listing
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Rates</h1>
          </div>
        </div>

        {/* Listing Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Editing rates for:{" "}
            <span className="font-semibold text-gray-900">{listingTitle}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <DollarSign className="w-5 h-5 mr-2 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">
                Pricing Information
              </h2>
            </div>

            {/* Inputs (shortened for brevity — same as your current ones) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Default Price */}
              <div>
                <label
                  htmlFor="default_price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Default Price per Night{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R
                  </span>
                  <input
                    type="number"
                    id="default_price"
                    value={formData.default_price}
                    onChange={(e) =>
                      handleInputChange("default_price", e.target.value)
                    }
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current: {formatCurrency(originalData.default_price)}
                </p>
              </div>
              {/* Cleaning Fee + Min Stay inputs go here (similar to above) */}
            </div>

            {/* Messages */}
            {error && (
              <div className="mt-6 flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
            {success && (
              <div className="mt-6 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700">
                  Rates updated successfully!
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges || saving}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
              >
                Reset Changes
              </button>
              <div className="flex space-x-3">
                <Link
                  href={`/listings/${id}/view`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!hasChanges || saving}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
