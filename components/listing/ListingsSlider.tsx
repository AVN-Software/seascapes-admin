"use client";

import ListingCard from "@/components/listing/ListingCard";
import { ListingCardData } from "@/types/listing";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface ListingsSliderProps {
  listingCards: ListingCardData[];
  // ✅ Mapping of listing_id to amenity_id
}

export default function ListingsSlider({ listingCards }: ListingsSliderProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 16,
    },
    loop: true,
  });

  return (
    <div className="relative py-6">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {listingCards.map((listingCard) => {
          return (
            <div key={listingCard.id} className="keen-slider__slide px-4">
              <ListingCard listingCardData={listingCard} />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          ‹
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          onClick={() => instanceRef.current?.next()}
          className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </div>
  );
}
