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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      complaints: {
        Row: {
          category: string
          created_at: string | null
          description: string
          email: string | null
          escalated_at: string | null
          escalated_to: string | null
          escalation_status:
            | Database["public"]["Enums"]["escalation_status"]
            | null
          escalation_threshold_hours: number | null
          id: string
          is_anonymous: boolean | null
          name: string | null
          priority: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          email?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_status?:
            | Database["public"]["Enums"]["escalation_status"]
            | null
          escalation_threshold_hours?: number | null
          id?: string
          is_anonymous?: boolean | null
          name?: string | null
          priority: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          email?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_status?:
            | Database["public"]["Enums"]["escalation_status"]
            | null
          escalation_threshold_hours?: number | null
          id?: string
          is_anonymous?: boolean | null
          name?: string | null
          priority?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      escalation_history: {
        Row: {
          complaint_id: string
          escalated_at: string | null
          escalated_from: string | null
          escalated_to: string
          id: string
          notes: string | null
          reason: string | null
        }
        Insert: {
          complaint_id: string
          escalated_at?: string | null
          escalated_from?: string | null
          escalated_to: string
          id?: string
          notes?: string | null
          reason?: string | null
        }
        Update: {
          complaint_id?: string
          escalated_at?: string | null
          escalated_from?: string | null
          escalated_to?: string
          id?: string
          notes?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escalation_history_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_and_escalate_complaints: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin" | "senior_admin"
      escalation_status: "pending" | "escalated" | "resolved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

// All Supabase-related types have been removed.

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "senior_admin"],
      escalation_status: ["pending", "escalated", "resolved"],
    },
  },
} as const
