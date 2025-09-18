import { getSupabaseImageUrl } from "@/utils/utils";

// types/listing.ts
export interface Listing {
  id: string;
  title: string;
  townname: string;
  property_type: string;
  num_bedrooms: number;
  num_baths: number;
  max_guests: number;
  pets_allowed: boolean;
  cleaning_fee: number;
  cover_img: string;
  default_price: number;
  minStay: number;
  listing_desc: string;
  property_desc: string;
  created_at?: string;
  updated_at?: string;
}

export interface ListingCardData {
  id: string;
  title: string;
  cover_img: string;
  default_base_price: number;
  num_bedrooms: number;
  num_baths: number;
  max_guests: number;
  townname: string;
}

// Mapper utility
export const mapListingToCard = (listing: Listing): ListingCardData => {
  return {
    id: listing.id,
    title: listing.title,
    cover_img: listing.cover_img
      ? getSupabaseImageUrl(listing.id, listing.cover_img)
      : "/placeholder-image.jpg",
    default_base_price: listing.default_price,
    num_bedrooms: listing.num_bedrooms,
    num_baths: listing.num_baths,
    max_guests: listing.max_guests,
    townname: listing.townname,
  };
};
