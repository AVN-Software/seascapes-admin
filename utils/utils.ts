export function getSupabaseImageUrl(
  propertyId: string,
  assetName: string,
  bucket: string = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!baseUrl) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!bucket) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET"
    );
  }

  if (!propertyId || !assetName) {
    throw new Error("Missing propertyId or assetName in getSupabaseImageUrl()");
  }

  return `${baseUrl}/storage/v1/object/public/${bucket}/${propertyId}/main/${assetName}`;
}
