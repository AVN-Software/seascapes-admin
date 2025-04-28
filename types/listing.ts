export interface Listing {
  id: string;
  title: string;
  townname: string;
  property_type: string;
  num_bedrooms: number;
  num_baths: number;
  max_guests: number;
  pets_allowed: boolean;
  default_base_price: number;
  default_guest_fee: number;
  cleaning_fee: number;
  cover_img: string;
  listing_desc: string;
  property_desc: string;
}
