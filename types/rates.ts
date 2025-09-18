// @/types/ratePlan.ts

export interface Season {
  id: string;
  name: "Festive" | "Holiday Peak" | "Standard";
  start_date: string;
  end_date: string;
  minimum_stay: number;
  priority: number;
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

// Rate adjustment types

// Base rate rule interface

// Discount types
export type DiscountType =
  | "early_bird"
  | "last_minute"
  | "length_of_stay"
  | "basic";

// Discount interface extending RateRule
export interface Discount extends RateRule {
  discount_type: DiscountType;
  rate_adjustment_type: "discount"; // Always discount for this type

  // Conditions specific to discount types
  conditions?: {
    // Early bird: book X days in advance
    advance_booking_days?: number;

    // Last minute: book within X days of arrival
    last_minute_days?: number;

    // Length of stay: max nights
    max_nights?: number;
  };
}

// Global season definitions (admin-managed)
export interface Season {
  id: string;
  name: "Festive" | "Holiday Peak";
  date_ranges: Array<{
    start_date: string;
    end_date: string;
  }>;
  priority: number;
}

// Updated Listing interface (removing old pricing fields)

// Calculation interfaces
export interface RatePlanCalculation {
  listing_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  breakdown: {
    base_rate: number;
    seasonal_adjustments: number;
    discounts_applied: number;
    subtotal: number;
    cleaning_fee: number;
    total: number;
  };
  applied_rates: {
    standard_rate: StandardRatePlan;
    seasonal_rates_used?: SeasonalRatePlan[];
    discounts_used?: Discount[];
  };
  nights: number;
}

// Form data interfaces for editing
export interface RateRuleFormData {
  name: string;
  adjustment_type: "fixed" | "percentage";
  adjustment_value: number;
  minimum_stay?: number;
  start_date?: string; // Optional for standard rates
  end_date?: string; // Optional for standard rates
}

export interface SeasonalRateFormData extends RateRuleFormData {
  season: "Festive" | "Holiday Peak";
  start_date: string; // Required for seasonal rates
  end_date: string; // Required for seasonal rates
}

export interface DiscountFormData extends RateRuleFormData {
  discount_type: DiscountType;
  conditions?: {
    advance_booking_days?: number;
    last_minute_days?: number;
    max_nights?: number;
  };
}

// API interfaces
export interface CreateRatePlanRequest {
  listing_id: string;
  standard: Omit<StandardRatePlan, "id" | "created_at" | "updated_at">;
  seasonalRates?: Omit<SeasonalRatePlan, "id" | "created_at" | "updated_at">[];
  discounts?: Omit<Discount, "id" | "created_at" | "updated_at">[];
}

export interface UpdateRatePlanRequest {
  id: string;
  updates: Partial<
    Omit<RatePlan, "id" | "listing_id" | "created_at" | "updated_at">
  >;
}

// Utility functions
export function calculateNightlyRate(
  ratePlan: RatePlan,
  bookingDate: string,
  standardRate: number
): number {
  // Check if date falls within any seasonal rate
  const applicableSeasonalRate = ratePlan.seasonalRates.find(
    (rate) =>
      rate.active &&
      bookingDate >= rate.start_date &&
      bookingDate <= rate.end_date
  );

  if (applicableSeasonalRate) {
    if (applicableSeasonalRate.adjustment_type === "percentage") {
      return (
        standardRate +
        (standardRate * applicableSeasonalRate.adjustment_value) / 100
      );
    } else {
      return standardRate + applicableSeasonalRate.adjustment_value;
    }
  }

  // Use standard rate
  if (ratePlan.standard.adjustment_type === "fixed") {
    return ratePlan.standard.adjustment_value;
  } else {
    // For percentage standard rates, apply to a base (this might need adjustment based on your logic)
    return standardRate * (1 + ratePlan.standard.adjustment_value / 100);
  }
}

export function getApplicableDiscounts(
  discounts: Discount[],
  bookingDetails: {
    check_in: string;
    check_out: string;
    nights: number;
    booking_date: string;
  }
): Discount[] {
  return discounts.filter((discount) => {
    if (!discount.active) return false;

    // Check date ranges if specified
    if (discount.start_date && discount.end_date) {
      if (
        bookingDetails.check_in < discount.start_date ||
        bookingDetails.check_out > discount.end_date
      ) {
        return false;
      }
    }

    // Check minimum stay
    if (
      discount.minimum_stay &&
      bookingDetails.nights < discount.minimum_stay
    ) {
      return false;
    }

    // Check discount-specific conditions
    if (discount.conditions) {
      const { advance_booking_days, last_minute_days, max_nights } =
        discount.conditions;

      if (max_nights && bookingDetails.nights > max_nights) {
        return false;
      }

      // Add more condition checks here as needed
    }

    return true;
  });
}

// Type guards
export function isStandardRatePlan(rate: RateRule): rate is StandardRatePlan {
  return (
    typeof rate === "object" &&
    rate !== null &&
    "name" in rate &&
    "adjustment_type" in rate &&
    "adjustment_value" in rate &&
    !("season" in rate) &&
    !("start_date" in rate) &&
    !("end_date" in rate)
  );
}

export function isSeasonalRatePlan(rate: RateRule): rate is SeasonalRatePlan {
  return (
    typeof rate === "object" &&
    rate !== null &&
    "season" in rate &&
    "start_date" in rate &&
    "end_date" in rate &&
    typeof rate.season === "string" &&
    (rate.season === "Festive" || rate.season === "Holiday Peak")
  );
}

export function isDiscount(item: RateRule): item is Discount {
  return (
    typeof item === "object" &&
    item !== null &&
    "discount_type" in item &&
    typeof (item as Discount).discount_type === "string" &&
    ["early_bird", "last_minute", "length_of_stay", "basic"].includes(
      (item as Discount).discount_type
    )
  );
}

export function isValidRatePlan(
  ratePlan: Partial<RatePlan>
): ratePlan is RatePlan {
  return (
    typeof ratePlan === "object" &&
    ratePlan !== null &&
    typeof ratePlan.listing_id === "string" &&
    ratePlan.standard !== undefined &&
    isStandardRatePlan(ratePlan.standard) &&
    Array.isArray(ratePlan.seasonalRates) &&
    Array.isArray(ratePlan.discounts)
  );
}

// Constants
export const DISCOUNT_TYPES = {
  EARLY_BIRD: "early_bird" as const,
  LAST_MINUTE: "last_minute" as const,
  LENGTH_OF_STAY: "length_of_stay" as const,
  BASIC: "basic" as const,
} as const;

export const SEASONS = {
  FESTIVE: "Festive" as const,
  HOLIDAY_PEAK: "Holiday Peak" as const,
} as const;

export const ADJUSTMENT_TYPES = {
  FIXED: "fixed" as const,
  PERCENTAGE: "percentage" as const,
} as const;
