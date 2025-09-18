export interface Listing {
  id: string;
  title: string;
  townname: string;
  property_type: string;
  num_bedrooms: number;
  num_baths: number;
  max_guests: number;
  pets_allowed: boolean;
  cleaning_fee: number; // Only cleaning fee remains in listing
  cover_img: string;
  default_price: number;
  minStay: number;
  listing_desc: string;
  property_desc: string;
  created_at?: string;
  updated_at?: string;
}
