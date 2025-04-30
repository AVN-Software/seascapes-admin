"use client";

import { useListingEdit } from "@/context/ListingFormContext";
import { useEffect, useState } from "react";

const TABS = ["Base Info", "Capacity", "Pricing", "Descriptions"];
const TAB_INTROS: Record<string, string> = {
  "Base Info": "Basic listing details like title, type, and location.",
  Capacity: "Specify the guest capacity and room count for this listing.",
  Pricing: "Set your base rate, extra guest fees, and cleaning costs.",
  Descriptions: "Describe the property for guests in detail.",
};

export default function EditListingForm() {
  const {
    draftListing,
    setDraftListing,

    submitChanges,
  } = useListingEdit();

  const [activeTab, setActiveTab] = useState("Base Info");

  // --- Tab persistence with localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("editListingActiveTab");
    if (savedTab && TABS.includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editListingActiveTab", activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Your Listing</h1>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-teal-700 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Title + Intro */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {activeTab}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {TAB_INTROS[activeTab]}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {activeTab === "Base Info" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    value={draftListing.title}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Property Type
                  </label>
                  <select
                    value={draftListing.property_type}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        property_type: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">-- Select Property Type --</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Cottage">Cottage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Town</label>
                  <select
                    value={draftListing.townname}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        townname: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">-- Select Town --</option>
                    <option value="Pringle Bay">Pringle Bay</option>
                    <option value="Betty's Bay">Betty&apos;s Bay</option>
                    <option value="Rooi-Else">Rooi-Else</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === "Capacity" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    value={draftListing.max_guests}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        max_guests: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={draftListing.num_bedrooms}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        num_bedrooms: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={draftListing.num_baths}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        num_baths: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            )}

            {activeTab === "Pricing" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Base Rate
                  </label>
                  <input
                    type="number"
                    value={draftListing.default_base_price}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        default_base_price: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Extra Guest Fee
                  </label>
                  <input
                    type="number"
                    value={draftListing.default_guest_fee}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        default_guest_fee: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cleaning Fee
                  </label>
                  <input
                    type="number"
                    value={draftListing.cleaning_fee}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        cleaning_fee: +e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            )}

            {activeTab === "Descriptions" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <textarea
                    value={draftListing.listing_desc}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        listing_desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Description
                  </label>
                  <textarea
                    value={draftListing.property_desc}
                    onChange={(e) =>
                      setDraftListing({
                        ...draftListing,
                        property_desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded min-h-[120px]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Submit Changes */}
          <div className="text-right pt-4">
            <button
              onClick={submitChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
            >
              Submit Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
