"use client";

import { useListingEdit } from "@/context/ListingFormContext";
import { Listing } from "@/types/listing";

export default function ListingChangePanel() {
  const {
    initialListing,

    submittedChanges,
    confirmChanges,
    resetChanges,
    saving,
  } = useListingEdit();

  const changedKeys = Object.keys(submittedChanges) as (keyof Listing)[];

  return (
    <div className="w-full lg:w-[360px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-3">Change Summary</h2>

      {changedKeys.length === 0 ? (
        <p className="text-sm text-slate-500">No changes submitted yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto text-sm">
          {changedKeys.map((key) => (
            <li key={key} className="py-3">
              <div className="text-slate-700 font-medium capitalize mb-1">
                {key.replace(/_/g, " ")}
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-red-500 line-through">
                  {String(initialListing[key])}
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-teal-700 font-semibold">
                  {String(submittedChanges[key])}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pt-6 mt-4 border-t border-slate-200 flex justify-end gap-2">
        <button
          onClick={resetChanges}
          disabled={saving || changedKeys.length === 0}
          className="px-4 py-2 text-sm rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium disabled:opacity-50"
        >
          Clear
        </button>
        <button
          onClick={confirmChanges}
          disabled={saving || changedKeys.length === 0}
          className="px-4 py-2 text-sm rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
