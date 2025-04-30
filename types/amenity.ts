export interface Amenity {
  amenity_id: string;
  category: string | null;
  created_at: string | null;
  name: string;
  updated_at: string | null;
}

export interface ListingAmenity {
  listing_id: string;
  amenity_id: string;
  name: string;
  category: string | null;
}
