// @/types/ratePlan.ts

export interface Season {
  id: string;
  name: "Festive" | "Holiday Peak" | "Standard";
  start_date: string;
  end_date: string;
  minimum_stay: number;
  active: boolean;
}

export interface RateAdjustment {
  adjustment_type: "fixed" | "percentage";
  adjustment_value: number;
}

export interface RatePlan {
  id?: string;
  listing_id: string;
  season: Season;
  price: number;
  rateAdjustment: RateAdjustment;
  created_at?: string;
  updated_at?: string;
}
