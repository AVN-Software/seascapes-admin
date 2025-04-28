// types.ts

// Base listing type

// Amenity type
export interface ListingAmenity {
  amenity_id: number;
  name: string;
}

// Image type
export interface ListingImage {
  image_id: string;
  url: string;
  caption: string | null;
  is_primary: boolean | null;
  created_at?: string;
  listing_id?: string;
  display_order?: number;
}

export interface DatabaseSeason {
  seasonname: string;
  startdate: string;
  enddate: string;
  minstay: number;
}

export interface Season {
  seasonName: string;
  startDate: string;
  endDate: string;
  minStay: number;
}

export interface DatabaseRatePlan {
  baserate: number;
  cleaningfee: number;
  createdat: string | null;
  extraguestfee: number;
  id: string;
  propertyid: string;
  seasonname: string;
  updatedat: string | null;
}

// Rate plan type
export interface RatePlan {
  baserate: number;
  cleaningfee: number;

  extraguestfee: number;
  id: string;
  propertyid: string;
  seasonname: string;
}

export interface RatePlanSeason {
  seasonName: string;
  startDate: string;
  endDate: string;
  minStay: number;
  baserate: number;
  extraguestfee: number;
  maxGuests: number;
  cleaningFee: number;
}

// Out of service period type
export interface OutOfServicePeriod {
  id: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  property_id?: string;
  blocked_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Reservation type
export interface Reservation {
  reservation_id: string;
  property_id: string | null;
  rate_id: string | null;
  status: "confirmed" | "pending" | "cancelled";
  platform: "airbnb" | "booking" | "direct" | "other";
  checkin_date: string;
  checkout_date: string;
  total_nights: number;
  total_guests: number;
  adults: number;
  children: number;
  base_rate_applied: number;
  guest_fee_applied: number;
  cleaning_fee_applied: number;
  total_amount: number;
  payout_amount: number | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  notes: string | null;
  payed_damage_deposit: boolean;
  late_checkout: boolean;
  created_at: string;
  updated_at: string | null;
}

// Table data type for the Table component
export type TableData = (string | number | boolean | null)[][];

// Tab definition type
export interface TabDefinition {
  id: string;
  label: string;
  count?: number;
}

// Props for Table component
export interface TableProps {
  headers: string[];
  data: TableData;
  rowLinkBase?: string;
  className?: string;
}

export interface PropertyCardData {
  id: string;
  title: string;
  coverImg: string;
  num_bedrooms: number;
  max_guests: number;
  num_baths: number;
  base_price: number;
  city?: string;
  link: string;
}

export interface StayPricing {
  seasonName: string;
  numNights: number;
  rate: number;
  extrasGuestFee: number;
}

export interface NightlyRateSummary {
  seasonName: string;
  nightlyPrice: number;
  nights: number;
}

export interface BookingSummary {
  propertyName: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalNights: number;
  numGuests: number;
  pricePerNight: number;
  totalNightPrice: number;
  seasonsBreakdown: StayInSeasonObj[];
  pricingBreakdown: NightlyPriceObj[];

  cleaningFee: number;
  totalPrice: number;
}

export interface StayInSeasonObj {
  startDate: Date;
  endDate: Date;
  numNights: number;
  seasonName: string;
  baseRate: number;
  extraguestfee: number;
}

export interface NightlyPriceObj {
  stayInSeasonObj: StayInSeasonObj;
  nightlyPrice: number;
}

export interface TotalPriceResult {
  nightlyPrice: number;
  cleaningFee: number;
  totalPrice: number;
}
