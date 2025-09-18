"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaClock } from "react-icons/fa";

import Link from "next/link";

export interface PropertyCard_ {
  id: string;
  title: string;
  description?: string;
  coverImg: string;

  // Core info
  base_price: number; // You may keep this or alias it below as `price`
  price: number; // For filtering logic (optional: alias of base_price)
  max_guests: number;
  num_bedrooms: number;
  num_baths: number;

  // Location info

  city?: string;

  // Filterable attributes
  propertyType: "Entire House" | "Apartment" | "Cottage" | "Studio" | "Other";
  petFriendly: boolean;
}

export interface PropertyCardProps {
  title: string;
  image: string;
  rooms: number;
  town: string;
  price: number;
  guests: number;
  bathrooms: number;
  link: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  image,
  rooms,
  price,
  guests,
  bathrooms,
  link,
}) => {
  return (
    <Link href={link}>
      <div className="group relative w-full flex flex-col  overflow-hidden border border-[#e5e7eb] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image - ~60% of card height */}
        <div className="relative h-60 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 flex items-start justify-between p-4 text-white">
            <FaHeart className="text-md opacity-90" />
            <div className="flex items-center gap-1 text-xs bg-black/40 rounded-full px-2 py-1">
              <FaClock className="text-[10px]" />
              <span>R{price}</span>
            </div>
          </div>
        </div>

        {/* Content - ~40% of card height */}
        <div className="flex flex-col justify-between flex-1 px-5 py-4 bg-[#f8f9fa]">
          <h4 className="text-[0.95rem] uppercase tracking-[0.1875rem] text-[#5b626b] mb-2">
            Pringle Bay
          </h4>
          <h3 className="text-[#2c3e50] text-2xl leading-snug mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-[#6b7280] mb-4">
            {rooms} rooms • {guests} guests • {bathrooms} baths
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
