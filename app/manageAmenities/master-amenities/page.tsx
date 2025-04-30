"use client";

import AmenitiesManager from "@/components/amenities/AmenitiesManger";
import { AmenitiesProvider } from "@/context/AmenitiesContext";

export default function MasterAmenitiesPage() {
  return (
    <AmenitiesProvider>
      <AmenitiesManager />
    </AmenitiesProvider>
  );
}
