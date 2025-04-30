"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Listing } from "@/types/listing";
import { createClient } from "@/utils/supabase/client";

interface ListingEditContextProps {
  initialListing: Listing;
  draftListing: Listing;
  submittedChanges: Partial<Listing>;
  saving: boolean;
  hasChanges: boolean;
  sidePanelOpen: boolean;

  setDraftListing: (updated: Listing) => void;
  setSubmittedChanges: (changes: Partial<Listing>) => void;

  submitChanges: () => void;
  confirmChanges: () => Promise<boolean>;
  resetChanges: () => void;
  closePanel: () => void;
}

const ListingEditContext = createContext<ListingEditContextProps | undefined>(
  undefined
);

export function useListingEdit() {
  const context = useContext(ListingEditContext);
  if (!context) {
    throw new Error("useListingEdit must be used within a ListingEditProvider");
  }
  return context;
}

export function ListingEditProvider({
  initialData,
  children,
}: {
  initialData: Listing;
  children: ReactNode;
}) {
  const [initialListing, setInitialListing] = useState<Listing>(initialData);
  const [draftListing, setDraftListing] = useState<Listing>(initialData);
  const [submittedChanges, setSubmittedChanges] = useState<Partial<Listing>>(
    {}
  );
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const hasChanges =
    JSON.stringify(initialListing) !== JSON.stringify(draftListing);

  function submitChanges() {
    const changes = Object.entries(draftListing).reduce<Partial<Listing>>(
      (acc, [key, value]) => {
        const typedKey = key as keyof Listing;
        if (!Object.is(value, initialListing[typedKey])) {
          acc[typedKey] = value;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(changes).length === 0) {
      alert("No changes detected.");
      return;
    }

    setSubmittedChanges(changes);
    setSidePanelOpen(true);
  }

  async function confirmChanges(): Promise<boolean> {
    if (Object.keys(submittedChanges).length === 0) return false;

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("listings")
      .update(submittedChanges)
      .eq("id", initialListing.id);

    setSaving(false);

    if (error) {
      console.error("Error saving listing:", error);
      alert("Failed to save changes.");
      return false;
    }

    const updatedListing = { ...initialListing, ...submittedChanges };
    setInitialListing(updatedListing);
    setDraftListing(updatedListing);
    setSubmittedChanges({});
    setSidePanelOpen(false);
    return true;
  }

  function resetChanges() {
    setDraftListing(initialListing);
    setSubmittedChanges({});
    setSidePanelOpen(false);
  }

  function closePanel() {
    setSidePanelOpen(false);
  }

  return (
    <ListingEditContext.Provider
      value={{
        initialListing,
        draftListing,
        submittedChanges,
        saving,
        hasChanges,
        sidePanelOpen,
        setDraftListing,
        setSubmittedChanges,
        submitChanges,
        confirmChanges,
        resetChanges,
        closePanel,
      }}
    >
      {children}
    </ListingEditContext.Provider>
  );
}
