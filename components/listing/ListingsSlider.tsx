import { Listing } from "@/types/listing";
import ListingCard from "@/components/listing/ListingCard";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ListingAmenity, Amenity } from "@/types/amenity";

interface ListingsSliderProps {
  listings: Listing[];
  amenities: Amenity[]; // ✅ Now expects full Amenity objects
  amenityMap: ListingAmenity[]; // ✅ Mapping of listing_id to amenity_id
}

export default function ListingsSlider({
  listings,
  amenities,
  amenityMap,
}: ListingsSliderProps) {
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
        {listings.map((listing) => {
          const amenityIds = amenityMap
            .filter((a) => a.listing_id === listing.id)
            .map((a) => a.amenity_id);

          const listingAmenities = amenities.filter((a) =>
            amenityIds.includes(a.amenity_id)
          );

          return (
            <div key={listing.id} className="keen-slider__slide px-4">
              <ListingCard listing={listing} amenities={listingAmenities} />
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
