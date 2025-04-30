import ListingAmenitiesManager from "@/components/listingAmenities/ListingAmenitiesManager";
import { ListingAmenitiesProvider } from "@/context/ListingAmenitiesContext";

export default function EditAmenitiesPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ListingAmenitiesProvider listingId={params.id}>
      <ListingAmenitiesManager />
    </ListingAmenitiesProvider>
  );
}
