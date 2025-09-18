"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  DollarSign,
  Calendar,
  Home,
} from "lucide-react";
import { Listing } from "@/types/listing";

const RatePlansManagement = () => {
  // Mock data - in real app, these would come from props/API
  const [selectedListing, setSelectedListing] = useState<Listing>({
    id: "1",
    title: "Ocean View Villa",
    townname: "Hermanus",
    property_type: "Villa",
    default_price: 2500,
    minStay: 2,
  });

  const availableListings: Listing[] = [
    {
      id: "1",
      title: "Ocean View Villa",
      townname: "Hermanus",
      property_type: "Villa",
      default_price: 2500,
      minStay: 2,
    },
    {
      id: "2",
      title: "Mountain Retreat",
      townname: "Stellenbosch",
      property_type: "House",
      default_price: 1800,
      minStay: 3,
    },
    {
      id: "3",
      title: "City Apartment",
      townname: "Cape Town",
      property_type: "Apartment",
      default_price: 1200,
      minStay: 1,
    },
  ];

  const availableSeasons: Season[] = [
    {
      id: "1",
      name: "Holiday Peak",
      start_date: "2024-12-15",
      end_date: "2025-01-15",
      minimum_stay: 7,
      priority: 1,
      active: true,
    },
    {
      id: "2",
      name: "Festive",
      start_date: "2024-12-20",
      end_date: "2025-01-05",
      minimum_stay: 5,
      priority: 2,
      active: true,
    },
    {
      id: "3",
      name: "Standard",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
      minimum_stay: 2,
      priority: 3,
      active: true,
    },
  ];

  const [ratePlans, setRatePlans] = useState<RatePlan[]>([
    {
      id: "1",
      listing_id: "1",
      season: availableSeasons[0], // Holiday Peak
      price: 3000,
      rateAdjustment: { adjustment_type: "percentage", adjustment_value: 20 },
    },
    {
      id: "2",
      listing_id: "1",
      season: availableSeasons[2], // Standard
      price: 2500,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<RatePlan, "id" | "listing_id">>(
    {
      season: availableSeasons[0],
      price: selectedListing.default_price,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    }
  );

  const currentRatePlans = ratePlans.filter(
    (plan) => plan.listing_id === selectedListing.id
  );
  const usedSeasonIds = new Set(currentRatePlans.map((plan) => plan.season.id));
  const availableSeasonsForCreation = availableSeasons.filter(
    (season) => !usedSeasonIds.has(season.id)
  );

  const calculateFinalPrice = (
    basePrice: number,
    adjustment: RateAdjustment
  ): number => {
    if (adjustment.adjustment_type === "fixed") {
      return basePrice + adjustment.adjustment_value;
    } else {
      return basePrice + (basePrice * adjustment.adjustment_value) / 100;
    }
  };

  const handleEdit = (ratePlan: RatePlan) => {
    setEditingId(ratePlan.id!);
    setFormData({
      season: ratePlan.season,
      price: ratePlan.price,
      rateAdjustment: ratePlan.rateAdjustment,
    });
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing rate plan
      setRatePlans(
        ratePlans.map((plan) =>
          plan.id === editingId
            ? { ...plan, ...formData, updated_at: new Date().toISOString() }
            : plan
        )
      );
      setEditingId(null);
    } else {
      // Create new rate plan
      const newRatePlan: RatePlan = {
        ...formData,
        id: Date.now().toString(),
        listing_id: selectedListing.id,
        created_at: new Date().toISOString(),
      };
      setRatePlans([...ratePlans, newRatePlan]);
      setIsCreating(false);
    }

    // Reset form
    setFormData({
      season: availableSeasonsForCreation[0] || availableSeasons[0],
      price: selectedListing.default_price,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      season: availableSeasonsForCreation[0] || availableSeasons[0],
      price: selectedListing.default_price,
      rateAdjustment: { adjustment_type: "fixed", adjustment_value: 0 },
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this rate plan?")) {
      setRatePlans(ratePlans.filter((plan) => plan.id !== id));
    }
  };

  const handleListingChange = (listingId: string) => {
    const listing = availableListings.find((l) => l.id === listingId);
    if (listing) {
      setSelectedListing(listing);
      setIsCreating(false);
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Rate Plans Management
              </h1>
              <p className="text-gray-600 mt-1">
                Set seasonal pricing for your listings
              </p>
            </div>
          </div>

          {/* Listing Selector */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Select Listing:
              </span>
            </div>
            <select
              value={selectedListing.id}
              onChange={(e) => handleListingChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableListings.map((listing) => (
                <option key={listing.id} value={listing.id}>
                  {listing.title} - {listing.townname}
                </option>
              ))}
            </select>
          </div>

          {/* Current Listing Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              {selectedListing.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Location:</span>
                <br />
                {selectedListing.townname}
              </div>
              <div>
                <span className="font-medium">Property Type:</span>
                <br />
                {selectedListing.property_type}
              </div>
              <div>
                <span className="font-medium">Default Price:</span>
                <br />R{selectedListing.default_price.toLocaleString()}/night
              </div>
              <div>
                <span className="font-medium">Default Min Stay:</span>
                <br />
                {selectedListing.minStay} night
                {selectedListing.minStay !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Rate Plans ({currentRatePlans.length})
            </h2>
            <button
              onClick={() => setIsCreating(true)}
              disabled={availableSeasonsForCreation.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Rate Plan
            </button>
          </div>

          {isCreating && availableSeasonsForCreation.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-medium mb-4">Create New Rate Plan</h3>
              <RatePlanForm
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onCancel={handleCancel}
                availableSeasons={availableSeasonsForCreation}
                defaultPrice={selectedListing.default_price}
              />
            </div>
          )}

          <div className="space-y-4">
            {currentRatePlans.map((ratePlan) => (
              <div
                key={ratePlan.id}
                className="border border-gray-200 rounded-lg"
              >
                {editingId === ratePlan.id ? (
                  <div className="p-4 bg-blue-50">
                    <h3 className="text-lg font-medium mb-4">Edit Rate Plan</h3>
                    <RatePlanForm
                      formData={formData}
                      setFormData={setFormData}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      availableSeasons={[ratePlan.season]}
                      defaultPrice={selectedListing.default_price}
                      isEditing={true}
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {ratePlan.season.name}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Priority {ratePlan.season.priority}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Season Period:</span>
                            <br />
                            {new Date(
                              ratePlan.season.start_date
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              ratePlan.season.end_date
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Base Price:</span>
                            <br />R{ratePlan.price.toLocaleString()}/night
                          </div>
                          <div>
                            <span className="font-medium">Adjustment:</span>
                            <br />
                            {ratePlan.rateAdjustment.adjustment_type === "fixed"
                              ? `R${ratePlan.rateAdjustment.adjustment_value}`
                              : `${ratePlan.rateAdjustment.adjustment_value}%`}
                          </div>
                          <div>
                            <span className="font-medium">Minimum Stay:</span>
                            <br />
                            {ratePlan.season.minimum_stay} night
                            {ratePlan.season.minimum_stay !== 1 ? "s" : ""}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800">
                              Final Price: R
                              {calculateFinalPrice(
                                ratePlan.price,
                                ratePlan.rateAdjustment
                              ).toLocaleString()}
                              /night
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {Math.ceil(
                                (new Date(ratePlan.season.end_date).getTime() -
                                  new Date(
                                    ratePlan.season.start_date
                                  ).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(ratePlan)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ratePlan.id!)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {currentRatePlans.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <DollarSign className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No rate plans defined
              </h3>
              <p className="text-gray-600 mb-4">
                This listing will use the default price of R
                {selectedListing.default_price.toLocaleString()}/night
              </p>
              {availableSeasonsForCreation.length > 0 && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create Rate Plan
                </button>
              )}
            </div>
          )}

          {availableSeasonsForCreation.length === 0 &&
            currentRatePlans.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-blue-800 text-sm">
                  All available seasons have rate plans. You&apos;ve configured
                  pricing for all seasonal periods.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const RatePlanForm = ({
  formData,
  setFormData,
  onSave,
  onCancel,
  availableSeasons,
  defaultPrice,
  isEditing = false,
}) => {
  const calculateFinalPrice = (
    basePrice: number,
    adjustment: RateAdjustment
  ): number => {
    if (adjustment.adjustment_type === "fixed") {
      return basePrice + adjustment.adjustment_value;
    } else {
      return basePrice + (basePrice * adjustment.adjustment_value) / 100;
    }
  };

  const finalPrice = calculateFinalPrice(
    formData.price,
    formData.rateAdjustment
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <select
            value={formData.season.id}
            onChange={(e) => {
              const season = availableSeasons.find(
                (s) => s.id === e.target.value
              );
              if (season) setFormData({ ...formData, season });
            }}
            disabled={isEditing}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            {availableSeasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.name} (
                {new Date(season.start_date).toLocaleDateString()} -{" "}
                {new Date(season.end_date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Price (R/night)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adjustment Type
          </label>
          <select
            value={formData.rateAdjustment.adjustment_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                rateAdjustment: {
                  ...formData.rateAdjustment,
                  adjustment_type: e.target.value as "fixed" | "percentage",
                },
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="fixed">Fixed Amount (R)</option>
            <option value="percentage">Percentage (%)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adjustment Value
          </label>
          <div className="relative">
            <input
              type="number"
              step={
                formData.rateAdjustment.adjustment_type === "percentage"
                  ? "1"
                  : "50"
              }
              value={formData.rateAdjustment.adjustment_value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rateAdjustment: {
                    ...formData.rateAdjustment,
                    adjustment_value: parseFloat(e.target.value) || 0,
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-500">
              {formData.rateAdjustment.adjustment_type === "percentage"
                ? "%"
                : "R"}
            </span>
          </div>
        </div>
      </div>

      {/* Price Preview */}
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-green-800">
              Final Price Preview
            </h4>
            <p className="text-xs text-green-600">
              Base R{formData.price.toLocaleString()} +{" "}
              {formData.rateAdjustment.adjustment_type === "fixed"
                ? `R${formData.rateAdjustment.adjustment_value}`
                : `${formData.rateAdjustment.adjustment_value}%`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-800">
              R{finalPrice.toLocaleString()}
            </div>
            <div className="text-xs text-green-600">per night</div>
          </div>
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
          Save Rate Plan
        </button>
      </div>
    </div>
  );
};

export default RatePlansManagement;
