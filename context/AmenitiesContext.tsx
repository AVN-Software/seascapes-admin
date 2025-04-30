"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { Amenity } from "@/types/amenity";

// 1. Define the interface for the context values
interface AmenitiesContextProps {
  amenities: Amenity[];
  filteredAmenities: Amenity[];
  groupedAmenities: Record<string, Amenity[]>; // New: grouped by category
  categories: string[]; // New: list of category names
  loading: boolean;
  searchTerm: string;

  editMode: boolean;
  selectedIds: string[];

  modals: {
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
  currentAmenity: Amenity | null;

  fetchAmenities: () => Promise<void>;
  toggleEditMode: () => void;
  searchAmenities: (term: string) => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;

  openModal: (type: "add" | "edit" | "delete", amenity?: Amenity) => void;
  closeModal: (type: "add" | "edit" | "delete") => void;

  addAmenity: (name: string, category: string) => Promise<void>;
  editAmenity: (
    id: string,
    newName: string,
    newCategory: string
  ) => Promise<void>;
  deleteAmenity: (id: string) => Promise<void>;
  bulkDeleteAmenities: (ids: string[]) => Promise<void>;
}

// 2. Create the context
const AmenitiesContext = createContext<AmenitiesContextProps | undefined>(
  undefined
);

// 3. Hook to use the context easily
export function useAmenities() {
  const context = useContext(AmenitiesContext);
  if (!context) {
    throw new Error("useAmenities must be used inside an AmenitiesProvider");
  }
  return context;
}

// 4. Provider component
export function AmenitiesProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();

  // ------------- State -------------
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [filteredAmenities, setFilteredAmenities] = useState<Amenity[]>([]);
  const [groupedAmenities, setGroupedAmenities] = useState<
    Record<string, Amenity[]>
  >({});
  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const [currentAmenity, setCurrentAmenity] = useState<Amenity | null>(null);

  // ------------- Initial fetch -------------
  useEffect(() => {
    fetchAmenities();
  }, []);

  // ------------- Fetch all amenities -------------
  async function fetchAmenities() {
    setLoading(true);
    const { data, error } = await supabase.from("amenities").select("*");

    if (error) {
      console.error("Error fetching amenities:", error);
    } else {
      setAmenities(data || []);
      setFilteredAmenities(data || []);
      groupAndSetCategories(data || []);
    }
    setLoading(false);
  }

  // ------------- Group amenities by category and extract categories -------------
  function groupAndSetCategories(amenitiesList: Amenity[]) {
    const grouped: Record<string, Amenity[]> = {};

    amenitiesList.forEach((amenity) => {
      const category = amenity.category || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(amenity);
    });

    setGroupedAmenities(grouped);
    setCategories(Object.keys(grouped));
  }

  // ------------- Search amenities -------------
  function searchAmenities(term: string) {
    setSearchTerm(term);
    const filtered = amenities.filter((amenity) =>
      amenity.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAmenities(filtered);
  }

  // ------------- Edit mode toggle -------------
  function toggleEditMode() {
    setEditMode(!editMode);
    setSelectedIds([]); // Clear selection when toggling mode
  }

  // ------------- Select/unselect an amenity for bulk actions -------------
  function toggleSelect(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  // ------------- Clear all selections -------------
  function clearSelection() {
    setSelectedIds([]);
  }

  // ------------- Modal management -------------
  function openModal(type: "add" | "edit" | "delete", amenity?: Amenity) {
    setModals((prev) => ({ ...prev, [type]: true }));
    if (amenity) {
      setCurrentAmenity(amenity);
    } else {
      setCurrentAmenity(null);
    }
  }

  function closeModal(type: "add" | "edit" | "delete") {
    setModals((prev) => ({ ...prev, [type]: false }));
    setCurrentAmenity(null);
  }

  // ------------- Add amenity -------------
  async function addAmenity(name: string, category: string) {
    const { error } = await supabase
      .from("amenities")
      .insert([{ name, category }]);

    if (error) {
      console.error("Failed to add amenity:", error);
      alert("Failed to add amenity.");
    } else {
      await fetchAmenities();
      alert("Amenity added successfully!");
    }
  }

  // ------------- Edit amenity -------------
  async function editAmenity(id: string, newName: string, newCategory: string) {
    const { error } = await supabase
      .from("amenities")
      .update({ name: newName, category: newCategory })
      .eq("amenity_id", id);

    if (error) {
      console.error("Failed to edit amenity:", error);
      alert("Failed to update amenity.");
    } else {
      await fetchAmenities();
      alert("Amenity updated successfully!");
    }
  }

  // ------------- Delete single amenity -------------
  async function deleteAmenity(id: string) {
    const { error } = await supabase
      .from("amenities")
      .delete()
      .eq("amenity_id", id);

    if (error) {
      console.error("Failed to delete amenity:", error);
      alert("Failed to delete amenity.");
    } else {
      await fetchAmenities();
      alert("Amenity deleted successfully!");
    }
  }

  // ------------- Bulk delete amenities -------------
  async function bulkDeleteAmenities(ids: string[]) {
    const { error } = await supabase
      .from("amenities")
      .delete()
      .in("amenity_id", ids);

    if (error) {
      console.error("Failed to bulk delete amenities:", error);
      alert("Failed to bulk delete amenities.");
    } else {
      await fetchAmenities();
      alert("Amenities deleted successfully!");
    }
  }

  // ------------- Provide all values -------------
  return (
    <AmenitiesContext.Provider
      value={{
        amenities,
        filteredAmenities,
        groupedAmenities,
        categories,
        loading,
        searchTerm,

        editMode,
        selectedIds,

        modals,
        currentAmenity,

        fetchAmenities,
        toggleEditMode,
        searchAmenities,
        toggleSelect,
        clearSelection,

        openModal,
        closeModal,

        addAmenity,
        editAmenity,
        deleteAmenity,
        bulkDeleteAmenities,
      }}
    >
      {children}
    </AmenitiesContext.Provider>
  );
}
