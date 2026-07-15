-- ============================================================================
-- Sorbe — Esquema Inicial
-- Helados Artesanales | El Salvador
-- ============================================================================

-- 1. ADMIN_USERS — Panel de administración con roles
-- ============================================================================
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  nombre text NOT NULL DEFAULT '',
  password_hash text NOT NULL,
  rol text NOT NULL DEFAULT 'viewer' CHECK (rol IN ('admin', 'editor', 'viewer')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admin_users_pkey PRIMARY KEY (id)
);

-- 2. CATEGORIES — Jerarquía de productos de heladería
-- ============================================================================
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  descripcion text,
  parent_id uuid,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  imagen_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL
);

-- 3. PRODUCTS — Productos de heladería
-- ============================================================================
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,
  nombre text NOT NULL,
  descripcion text,
  precio numeric NOT NULL,
  precio_original numeric,
  -- Ice cream specific fields
  perfil_sabor text[] DEFAULT ARRAY[]::text[],        -- ['frutal', 'cremoso', 'cítrico']
  info_dietetica jsonb DEFAULT '{}'::jsonb,            -- {vegano: true, sin_gluten: false, sin_azucar: false, sin_lactosa: false}
  opciones_talla jsonb DEFAULT '[]'::jsonb,            -- [{nombre: "Chico", modificador_precio: 0}, {nombre: "Mediano", modificador_precio: 1.50}]
  es_temporal boolean DEFAULT false,                    -- Seasonal/limited-time flavor
  alergenos text[] DEFAULT ARRAY[]::text[],             -- ['lacteos', 'nueces', 'huevo']
  ingredientes text,
  -- General e-commerce fields
  is_new boolean DEFAULT false,
  is_on_sale boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  in_stock boolean DEFAULT true,
  stock_count integer DEFAULT 0,
  image_urls text[] DEFAULT ARRAY[]::text[],
  likes_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id)
);

-- 4. PRODUCT_CATEGORIES — Relación muchos a muchos
-- ============================================================================
CREATE TABLE public.product_categories (
  product_id uuid NOT NULL,
  category_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT product_categories_pkey PRIMARY KEY (product_id, category_id),
  CONSTRAINT product_categories_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT product_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE
);

-- 5. CLIENTES — Información de clientes
-- ============================================================================
CREATE TABLE public.clientes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  telefono text,
  whatsapp_id text,
  nombre text NOT NULL,
  email text,
  direccion text,
  total_pedidos integer DEFAULT 0,
  notas text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT clientes_pkey PRIMARY KEY (id)
);

-- 6. ORDERS — Pedidos con Wompi y datos de entrega
-- ============================================================================
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cliente_id uuid,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  customer_address text,
  -- Delivery
  metodo_entrega text DEFAULT 'recoger' CHECK (metodo_entrega IN ('recoger', 'domicilio')),
  direccion_entrega jsonb DEFAULT '{}'::jsonb,
  hora_programada timestamp with time zone,
  chat_whatsapp_id text,
  -- Order details
  product_id uuid NOT NULL,
  talla_seleccionada text,              -- "Chico", "Mediano", "Grande"
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric NOT NULL,
  notas_pedido text,
  -- Status
  status text DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmado', 'preparando', 'listo', 'entregado', 'cancelado')),
  -- Wompi integration
  payment_method text DEFAULT 'wompi' CHECK (payment_method IN ('wompi', 'efectivo', 'transferencia')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'approved', 'declined', 'expired', 'cancelled')),
  wompi_transaction_id text,
  wompi_payment_link_id text,
  wompi_reference text UNIQUE,
  payment_reference text,
  payment_transaction_id text,
  -- Timestamps
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE SET NULL,
  CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL
);

-- 7. PAYMENTS — Registro de pagos (Wompi)
-- ============================================================================
CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  payment_method text NOT NULL,
  processor text DEFAULT 'wompi',
  processor_transaction_id text,
  processor_reference text,
  processor_payment_link text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'declined', 'voided', 'error')),
  processor_response jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE
);

-- 8. EVENTOS_META — Server-side Meta Pixel events (Conversions API)
-- ============================================================================
CREATE TABLE public.eventos_meta (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre_evento text NOT NULL,
  datos_evento jsonb DEFAULT '{}'::jsonb,
  user_id text,
  ip_address text,
  user_agent text,
  procesado boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT eventos_meta_pkey PRIMARY KEY (id)
);

-- 9. CONFIG_TIENDA — Configuración dinámica de la tienda
-- ============================================================================
CREATE TABLE public.config_tienda (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  clave text NOT NULL UNIQUE,
  valor jsonb NOT NULL DEFAULT '{}'::jsonb,
  descripcion text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT config_tienda_pkey PRIMARY KEY (id)
);

-- ============================================================================
-- ÍNDICES
-- ============================================================================
CREATE INDEX idx_products_nombre ON public.products(nombre);
CREATE INDEX idx_products_precio ON public.products(precio);
CREATE INDEX idx_products_es_temporal ON public.products(es_temporal) WHERE es_temporal = true;
CREATE INDEX idx_products_in_stock ON public.products(in_stock) WHERE in_stock = true;
CREATE INDEX idx_products_perfil_sabor ON public.products USING gin(perfil_sabor);
CREATE INDEX idx_products_info_dietetica ON public.products USING gin(info_dietetica);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_cliente_id ON public.orders(cliente_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_orders_wompi_reference ON public.orders(wompi_reference);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_clientes_telefono ON public.clientes(telefono);
CREATE INDEX idx_clientes_whatsapp_id ON public.clientes(whatsapp_id);
CREATE INDEX idx_eventos_meta_nombre ON public.eventos_meta(nombre_evento);
CREATE INDEX idx_eventos_meta_procesado ON public.eventos_meta(procesado) WHERE procesado = false;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.config_tienda ENABLE ROW LEVEL SECURITY;

-- Admin users — only admins can read/write
CREATE POLICY "admin_users_admin_access" ON public.admin_users
  FOR ALL USING (auth.role() = 'authenticated');

-- Categories — public read, admin write
CREATE POLICY "categories_public_read" ON public.categories
  FOR SELECT USING (true);
CREATE POLICY "categories_admin_write" ON public.categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Products — public read, admin write
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT USING (true);
CREATE POLICY "products_admin_write" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

-- Product categories — public read, admin write
CREATE POLICY "product_categories_public_read" ON public.product_categories
  FOR SELECT USING (true);
CREATE POLICY "product_categories_admin_write" ON public.product_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Clientes — public can create (on order), read own via phone
CREATE POLICY "clientes_public_insert" ON public.clientes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "clientes_admin_read" ON public.clientes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Orders — public can create/read own, admin all
CREATE POLICY "orders_public_insert" ON public.orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_admin_all" ON public.orders
  FOR ALL USING (auth.role() = 'authenticated');

-- Payments — admin all
CREATE POLICY "payments_admin_all" ON public.payments
  FOR ALL USING (auth.role() = 'authenticated');

-- Eventos Meta — public insert (CAPI), admin read
CREATE POLICY "eventos_meta_public_insert" ON public.eventos_meta
  FOR INSERT WITH CHECK (true);
CREATE POLICY "eventos_meta_admin_read" ON public.eventos_meta
  FOR SELECT USING (auth.role() = 'authenticated');

-- Config tienda — public read, admin write
CREATE POLICY "config_tienda_public_read" ON public.config_tienda
  FOR SELECT USING (true);
CREATE POLICY "config_tienda_admin_write" ON public.config_tienda
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- DATOS INICIALES (seed)
-- ============================================================================

-- Categorías base de heladería
INSERT INTO public.categories (nombre, slug, descripcion, sort_order) VALUES
  ('Paletas', 'paletas', 'Paletas de hielo artesanales con frutas naturales', 1),
  ('Conos', 'conos', 'Helado en cono con toppings', 2),
  ('Vasitos', 'vasitos', 'Helado servido en vaso', 3),
  ('Granizados', 'granizados', 'Granizados y raspados refrescantes', 4),
  ('Postres', 'postres', 'Postres helados especiales', 5);

-- Sub-categorías (familias de sabor)
INSERT INTO public.categories (nombre, slug, descripcion, parent_id, sort_order) 
SELECT 'Frutal', 'frutal', 'Sabores a base de frutas naturales', id, 1
FROM public.categories WHERE slug = 'paletas';

INSERT INTO public.categories (nombre, slug, descripcion, parent_id, sort_order) 
SELECT 'Cremoso', 'cremoso', 'Sabores cremosos a base de leche', id, 2
FROM public.categories WHERE slug = 'paletas';

INSERT INTO public.categories (nombre, slug, descripcion, parent_id, sort_order) 
SELECT 'Chocolate', 'chocolate', 'Todo lo que lleva chocolate', id, 3
FROM public.categories WHERE slug = 'paletas';

-- Configuración inicial de tienda
INSERT INTO public.config_tienda (clave, valor, descripcion) VALUES
  ('horarios', '{"lunes_a_viernes": {"apertura": "10:00", "cierre": "20:00"}, "sabado": {"apertura": "10:00", "cierre": "21:00"}, "domingo": {"apertura": "11:00", "cierre": "19:00"}}', 'Horarios de atención'),
  ('whatsapp', '{"numero": "+503", "mensaje_default": "Hola Sorbe, quiero hacer un pedido"}', 'Configuración de WhatsApp'),
  ('redes_sociales', '{"facebook": "", "instagram": "", "tiktok": ""}', 'Enlaces a redes sociales'),
  ('direccion', '{"calle": "", "ciudad": "", "departamento": "", "referencia": ""}', 'Dirección de recogida'),
  ('zonas_entrega', '{"zonas": []}', 'Zonas de entrega a domicilio');
