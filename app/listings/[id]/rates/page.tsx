"use client";

import React, { useState, useEffect } from "react";

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

interface EditRatesPageProps {
  params: { id: string };
}

export default function EditRatesPage({ params }: EditRatesPageProps) {
  const { id } = params;

  const supabase = createClient();

  const [formData, setFormData] = useState<RatesFormData>({
    default_price: 0,
    cleaning_fee: 0,
    minStay: 1,
  });

  const [originalData, setOriginalData] = useState<RatesFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [listingTitle, setListingTitle] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchListingRates();
    }
  }, [id]);

  const fetchListingRates = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch listing data from Supabase
      const { data: listing, error: listingError } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (listingError || !listing) {
        console.error("Error fetching listing:", listingError);
        setError("Listing not found");
        return;
      }

      const rates = {
        default_price: listing.default_price || 0,
        cleaning_fee: listing.cleaning_fee || 0,
        minStay: listing.minStay || 1,
      };

      setFormData(rates);
      setOriginalData(rates);
      setListingTitle(listing.title || "Listing");
    } catch (err) {
      console.error("Error fetching listing rates:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load listing rates"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof RatesFormData,
    value: string | number
  ) => {
    const numericValue =
      typeof value === "string" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }));

    // Clear success message when user starts editing
    if (success) {
      setSuccess(false);
    }
  };

  const hasChanges =
    originalData &&
    (formData.default_price !== originalData.default_price ||
      formData.cleaning_fee !== originalData.cleaning_fee ||
      formData.minStay !== originalData.minStay);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasChanges) {
      setError("No changes detected");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Update listing rates in Supabase
      const { error: updateError } = await supabase
        .from("listings")
        .update({
          default_price: formData.default_price,
          cleaning_fee: formData.cleaning_fee,
          minStay: formData.minStay,
        })
        .eq("id", id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setOriginalData(formData);
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving rates:", err);
      setError(err instanceof Error ? err.message : "Failed to save rates");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setError(null);
      setSuccess(false);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-ZA", {
      style: "currency",
      currency: "ZAR",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading rates...</span>
        </div>
      </div>
    );
  }

  if (error && !listingTitle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/listings"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

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
        <form className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <DollarSign className="w-5 h-5 mr-2 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">
                Pricing Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Pricing Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Default Price */}
                <div>
                  <label
                    htmlFor="default_price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Default Price per Night
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      R
                    </span>
                    <input
                      type="number"
                      id="default_price"
                      min="0"
                      step="50"
                      value={formData.default_price}
                      onChange={(e) =>
                        handleInputChange("default_price", e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {formatCurrency(originalData?.default_price || 0)}
                  </p>
                </div>

                {/* Cleaning Fee */}
                <div>
                  <label
                    htmlFor="cleaning_fee"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cleaning Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      R
                    </span>
                    <input
                      type="number"
                      id="cleaning_fee"
                      min="0"
                      step="50"
                      value={formData.cleaning_fee}
                      onChange={(e) =>
                        handleInputChange("cleaning_fee", e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    One-time fee charged per booking
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Current: {formatCurrency(originalData?.cleaning_fee || 0)}
                  </p>
                </div>

                {/* Minimum Stay */}
                <div>
                  <label
                    htmlFor="minStay"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Minimum Stay (nights)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="minStay"
                    min="1"
                    value={formData.minStay}
                    onChange={(e) =>
                      handleInputChange("minStay", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default minimum stay requirement
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Current: {originalData?.minStay || 1} night
                    {originalData?.minStay !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Pricing Examples */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Pricing Examples
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Example 1: Single night */}
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium text-gray-800">
                      Example: 1 Night Stay
                    </h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Nightly Rate (1x):</span>
                        <span className="font-medium">
                          {formatCurrency(formData.default_price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning Fee:</span>
                        <span className="font-medium">
                          {formatCurrency(formData.cleaning_fee)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-blue-600 border-t pt-1">
                        <span>Total:</span>
                        <span>
                          {formatCurrency(
                            formData.default_price + formData.cleaning_fee
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Example 2: Multi-night */}
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium text-gray-800">
                      Example: 3 Nights Stay
                    </h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Nightly Rate (3x):</span>
                        <span className="font-medium">
                          {formatCurrency(formData.default_price * 3)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning Fee:</span>
                        <span className="font-medium">
                          {formatCurrency(formData.cleaning_fee)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-blue-600 border-t pt-1">
                        <span>Total:</span>
                        <span>
                          {formatCurrency(
                            formData.default_price * 3 + formData.cleaning_fee
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Per Night Average:</span>
                        <span>
                          {formatCurrency(
                            (formData.default_price * 3 +
                              formData.cleaning_fee) /
                              3
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Model Explanation */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Pricing Model:</strong> Fixed nightly rate with
                    one-time cleaning fee. Longer stays have a lower average
                    per-night cost due to the cleaning fee being spread across
                    more nights.
                  </p>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mt-6 flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-6 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-green-700">
                  Rates updated successfully!
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges || saving}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Reset Changes
              </button>

              <div className="flex space-x-3">
                <Link
                  href={`/listings/${id}/view`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!hasChanges || saving}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
