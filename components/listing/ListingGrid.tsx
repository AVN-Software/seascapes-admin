"use client";

import { ListingCardData } from "@/types/listing";
import React, { useState } from "react";
import ListingCard from "./ListingCard";
import { Plus, Search, Filter, Trash2, Archive } from "lucide-react";

interface ListingSectionProps {
  listingCards: ListingCardData[];
}

const ListingSection = ({ listingCards }: ListingSectionProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = selectedIds.length === listingCards.length;

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : listingCards.map((c) => c.id));
  };

  return (
    <section id="property-section" className="border-none py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header + Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Property Listings
            </h2>
            <p className="text-gray-500 text-sm">
              Manage, review, and add new property listings below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Filter button */}
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-sm text-gray-700">
              {selectedIds.length} selected
            </span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                <Archive className="w-4 h-4" /> Archive
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-lg font-semibold">{listingCards.length}</div>
            <div className="text-sm text-gray-500">Total Listings</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-lg font-semibold">12</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-lg font-semibold">4</div>
            <div className="text-sm text-gray-500">Pending Review</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-lg font-semibold">2</div>
            <div className="text-sm text-gray-500">Archived</div>
          </div>
        </div>

        {/* Select All */}
        {listingCards.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
        )}

        {/* Grid of Listing Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {listingCards.map((card) => (
            <div key={card.id} className="h-full">
              <ListingCard
                listingCardData={card}
                selected={selectedIds.includes(card.id)}
                onSelect={toggleSelect}
              />
            </div>
          ))}

          {/* Ghost Card - Add New Listing */}
          <div className="h-full">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer p-6 h-full">
              <Plus className="w-10 h-10 text-gray-400 mb-3" />
              <span className="text-gray-600 font-medium">Add Listing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
