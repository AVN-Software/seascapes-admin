"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaClock } from "react-icons/fa";
import Link from "next/link";
import { ListingCardData } from "@/types/listing";

// DB-backed ListingCard type

interface ListingCardProps {
  listingCardData: ListingCardData;
}

const ListingCard: React.FC<ListingCardProps> = ({ listingCardData }) => {
  return (
    <Link href={`/listings/${listingCardData.id}/view`}>
      <div className="group relative w-full flex flex-col overflow-hidden border border-[#e5e7eb] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-60 w-full">
          <Image
            src={listingCardData.cover_img}
            alt={listingCardData.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 flex items-start justify-between p-4 text-white">
            <FaHeart className="text-md opacity-90" />
            <div className="flex items-center gap-1 text-xs bg-black/40 rounded-full px-2 py-1">
              <FaClock className="text-[10px]" />
              <span>R{listingCardData.default_base_price}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 px-5 py-4 bg-[#f8f9fa]">
          <h4 className="text-[0.95rem] uppercase tracking-[0.1875rem] text-[#5b626b] mb-2">
            {listingCardData.townname}
          </h4>
          <h3 className="text-[#2c3e50] text-2xl leading-snug mb-2 line-clamp-2">
            {listingCardData.title}
          </h3>
          <p className="text-sm text-[#6b7280] mb-4">
            {listingCardData.num_bedrooms} rooms • {listingCardData.max_guests}{" "}
            guests • {listingCardData.num_baths} baths
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
