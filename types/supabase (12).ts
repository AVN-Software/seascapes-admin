export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      amenities: {
        Row: {
          amenity_id: string
          category: string | null
          created_at: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          amenity_id?: string
          category?: string | null
          created_at?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          amenity_id?: string
          category?: string | null
          created_at?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      amenity_map: {
        Row: {
          amenity_id: string
          created_at: string
          id: number
          listing_id: string
        }
        Insert: {
          amenity_id?: string
          created_at?: string
          id?: number
          listing_id?: string
        }
        Update: {
          amenity_id?: string
          created_at?: string
          id?: number
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amenity_map_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      image_tasks: {
        Row: {
          created_at: string | null
          id: string
          image_id: string
          is_publishable: boolean | null
          processed_at: string | null
          published_at: string | null
          requires_processing: boolean | null
          requires_review: boolean | null
          reviewed_at: string | null
          task_stage: Database["public"]["Enums"]["image_task_stage"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_id: string
          is_publishable?: boolean | null
          processed_at?: string | null
          published_at?: string | null
          requires_processing?: boolean | null
          requires_review?: boolean | null
          reviewed_at?: string | null
          task_stage?: Database["public"]["Enums"]["image_task_stage"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_id?: string
          is_publishable?: boolean | null
          processed_at?: string | null
          published_at?: string | null
          requires_processing?: boolean | null
          requires_review?: boolean | null
          reviewed_at?: string | null
          task_stage?: Database["public"]["Enums"]["image_task_stage"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_tasks_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "property_images"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          caption: string
          created_at: string
          display_order: number
          image_id: string
          is_primary: boolean
          listing_id: string
          url: string
        }
        Insert: {
          caption: string
          created_at: string
          display_order: number
          image_id: string
          is_primary: boolean
          listing_id: string
          url: string
        }
        Update: {
          caption?: string
          created_at?: string
          display_order?: number
          image_id?: string
          is_primary?: boolean
          listing_id?: string
          url?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          cleaning_fee: number
          cover_img: string
          default_base_price: number
          default_guest_fee: number
          id: string
          listing_desc: string
          max_guests: number
          num_baths: number
          num_bedrooms: number
          pets_allowed: boolean
          property_desc: string
          property_type: string
          title: string
          townname: string
        }
        Insert: {
          cleaning_fee: number
          cover_img: string
          default_base_price: number
          default_guest_fee: number
          id: string
          listing_desc: string
          max_guests: number
          num_baths: number
          num_bedrooms: number
          pets_allowed: boolean
          property_desc: string
          property_type: string
          title: string
          townname: string
        }
        Update: {
          cleaning_fee?: number
          cover_img?: string
          default_base_price?: number
          default_guest_fee?: number
          id?: string
          listing_desc?: string
          max_guests?: number
          num_baths?: number
          num_bedrooms?: number
          pets_allowed?: boolean
          property_desc?: string
          property_type?: string
          title?: string
          townname?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          aspect_ratio: number | null
          blurhash: string | null
          caption: string | null
          colors: string[] | null
          content_type: string | null
          deleted: boolean | null
          file_size_kb: number | null
          height: number | null
          id: string
          image_url: string
          is_featured: boolean | null
          is_public: boolean | null
          listing_id: string
          original_filename: string | null
          sort_order: number | null
          thumbnail_url: string | null
          uploaded_at: string | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: number | null
          blurhash?: string | null
          caption?: string | null
          colors?: string[] | null
          content_type?: string | null
          deleted?: boolean | null
          file_size_kb?: number | null
          height?: number | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          is_public?: boolean | null
          listing_id: string
          original_filename?: string | null
          sort_order?: number | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: number | null
          blurhash?: string | null
          caption?: string | null
          colors?: string[] | null
          content_type?: string | null
          deleted?: boolean | null
          file_size_kb?: number | null
          height?: number | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          listing_id?: string
          original_filename?: string | null
          sort_order?: number | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_plan_guest_pricing: {
        Row: {
          created_at: string | null
          guest_count: number
          id: string
          price_per_guest: number
          rate_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          guest_count: number
          id?: string
          price_per_guest: number
          rate_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          guest_count?: number
          id?: string
          price_per_guest?: number
          rate_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_plan_guest_pricing_rate_id_fkey"
            columns: ["rate_id"]
            isOneToOne: false
            referencedRelation: "rate_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_plans: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_default: boolean | null
          listing_id: string
          per_unit_price: number | null
          rate_type: string
          season_id: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_default?: boolean | null
          listing_id: string
          per_unit_price?: number | null
          rate_type: string
          season_id: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_default?: boolean | null
          listing_id?: string
          per_unit_price?: number | null
          rate_type?: string
          season_id?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_plans_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_plans_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_default: boolean | null
          minStay: number
          name: string
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_default?: boolean | null
          minStay?: number
          name: string
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_default?: boolean | null
          minStay?: number
          name?: string
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      image_task_stage: "uploaded" | "processing" | "captioning" | "ready"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      image_task_stage: ["uploaded", "processing", "captioning", "ready"],
    },
  },
} as const
