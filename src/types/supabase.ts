export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          nombre: string
          password_hash: string
          rol: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nombre?: string
          password_hash: string
          rol?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nombre?: string
          password_hash?: string
          rol?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          descripcion: string | null
          id: string
          imagen_url: string | null
          is_active: boolean | null
          nombre: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          id?: string
          imagen_url?: string | null
          is_active?: boolean | null
          nombre: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          id?: string
          imagen_url?: string | null
          is_active?: boolean | null
          nombre?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          notas: string | null
          telefono: string | null
          total_pedidos: number | null
          updated_at: string
          whatsapp_id: string | null
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          notas?: string | null
          telefono?: string | null
          total_pedidos?: number | null
          updated_at?: string
          whatsapp_id?: string | null
        }
        Update: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          notas?: string | null
          telefono?: string | null
          total_pedidos?: number | null
          updated_at?: string
          whatsapp_id?: string | null
        }
        Relationships: []
      }
      config_tienda: {
        Row: {
          clave: string
          created_at: string
          descripcion: string | null
          id: string
          updated_at: string
          valor: Json
        }
        Insert: {
          clave: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          valor?: Json
        }
        Update: {
          clave?: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          valor?: Json
        }
        Relationships: []
      }
      eventos_meta: {
        Row: {
          created_at: string
          datos_evento: Json | null
          id: string
          ip_address: string | null
          nombre_evento: string
          procesado: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          datos_evento?: Json | null
          id?: string
          ip_address?: string | null
          nombre_evento: string
          procesado?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          datos_evento?: Json | null
          id?: string
          ip_address?: string | null
          nombre_evento?: string
          procesado?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          chat_whatsapp_id: string | null
          cliente_id: string | null
          created_at: string
          customer_address: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          direccion_entrega: Json | null
          hora_programada: string | null
          id: string
          metodo_entrega: string | null
          notas_pedido: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          payment_transaction_id: string | null
          product_id: string
          quantity: number
          status: string | null
          talla_seleccionada: string | null
          total_amount: number
          updated_at: string
          wompi_payment_link_id: string | null
          wompi_reference: string | null
          wompi_transaction_id: string | null
        }
        Insert: {
          chat_whatsapp_id?: string | null
          cliente_id?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          direccion_entrega?: Json | null
          hora_programada?: string | null
          id?: string
          metodo_entrega?: string | null
          notas_pedido?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_transaction_id?: string | null
          product_id: string
          quantity?: number
          status?: string | null
          talla_seleccionada?: string | null
          total_amount: number
          updated_at?: string
          wompi_payment_link_id?: string | null
          wompi_reference?: string | null
          wompi_transaction_id?: string | null
        }
        Update: {
          chat_whatsapp_id?: string | null
          cliente_id?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          direccion_entrega?: Json | null
          hora_programada?: string | null
          id?: string
          metodo_entrega?: string | null
          notas_pedido?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_transaction_id?: string | null
          product_id?: string
          quantity?: number
          status?: string | null
          talla_seleccionada?: string | null
          total_amount?: number
          updated_at?: string
          wompi_payment_link_id?: string | null
          wompi_reference?: string | null
          wompi_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          order_id: string
          payment_method: string
          processor: string | null
          processor_payment_link: string | null
          processor_reference: string | null
          processor_response: Json | null
          processor_transaction_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          order_id: string
          payment_method: string
          processor?: string | null
          processor_payment_link?: string | null
          processor_reference?: string | null
          processor_response?: Json | null
          processor_transaction_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          order_id?: string
          payment_method?: string
          processor?: string | null
          processor_payment_link?: string | null
          processor_reference?: string | null
          processor_response?: Json | null
          processor_transaction_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          category_id: string
          created_at: string
          product_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          product_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          alergenos: string[] | null
          created_at: string
          descripcion: string | null
          es_temporal: boolean | null
          id: string
          image_urls: string[] | null
          in_stock: boolean | null
          info_dietetica: Json | null
          ingredientes: string | null
          is_new: boolean | null
          is_on_sale: boolean | null
          likes_count: number
          nombre: string
          opciones_talla: Json | null
          perfil_sabor: string[] | null
          precio: number
          precio_original: number | null
          rating: number | null
          review_count: number | null
          sku: string
          stock_count: number | null
          updated_at: string
        }
        Insert: {
          alergenos?: string[] | null
          created_at?: string
          descripcion?: string | null
          es_temporal?: boolean | null
          id?: string
          image_urls?: string[] | null
          in_stock?: boolean | null
          info_dietetica?: Json | null
          ingredientes?: string | null
          is_new?: boolean | null
          is_on_sale?: boolean | null
          likes_count?: number
          nombre: string
          opciones_talla?: Json | null
          perfil_sabor?: string[] | null
          precio: number
          precio_original?: number | null
          rating?: number | null
          review_count?: number | null
          sku: string
          stock_count?: number | null
          updated_at?: string
        }
        Update: {
          alergenos?: string[] | null
          created_at?: string
          descripcion?: string | null
          es_temporal?: boolean | null
          id?: string
          image_urls?: string[] | null
          in_stock?: boolean | null
          info_dietetica?: Json | null
          ingredientes?: string | null
          is_new?: boolean | null
          is_on_sale?: boolean | null
          likes_count?: number
          nombre?: string
          opciones_talla?: Json | null
          perfil_sabor?: string[] | null
          precio?: number
          precio_original?: number | null
          rating?: number | null
          review_count?: number | null
          sku?: string
          stock_count?: number | null
          updated_at?: string
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
      [_ in never]: never
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
    Enums: {},
  },
} as const

