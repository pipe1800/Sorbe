-- ============================================================================
-- Sorbe — Sabores + Paquetes (real business model)
-- Sorbetes artesanales vendidos por volumen con barquillos y miel
-- ============================================================================

-- 1. SABORES — Catálogo de sabores disponibles
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sabores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  categoria text NOT NULL CHECK (categoria IN ('con_leche', 'naturales', 'chamoyados', 'con_licor')),
  descripcion text,
  disponible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sabores_pkey PRIMARY KEY (id),
  CONSTRAINT sabores_nombre_categoria_unique UNIQUE (nombre, categoria)
);

ALTER TABLE public.sabores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sabores_public_read" ON public.sabores FOR SELECT USING (true);
CREATE POLICY "sabores_admin_write" ON public.sabores FOR ALL USING (auth.role() = 'authenticated');

-- 2. CLEAN UP old seed data (safe — only removes what we seeded)
-- ============================================================================
DELETE FROM public.product_categories WHERE product_id IN (SELECT id FROM public.products WHERE sku LIKE 'SOR-%');
DELETE FROM public.products WHERE sku LIKE 'SOR-%';
DELETE FROM public.categories WHERE slug IN ('paletas', 'conos', 'vasitos', 'granizados', 'postres', 'frutal', 'cremoso', 'chocolate');
DELETE FROM public.config_tienda;

-- 3. CATEGORIES — Familias de sabor (replaces old categories)
-- ============================================================================
INSERT INTO public.categories (nombre, slug, descripcion, sort_order) VALUES
  ('Con Leche', 'con-leche', 'Sabores cremosos a base de leche', 1),
  ('Naturales', 'naturales', 'Sabores frutales a base de agua', 2),
  ('Chamoyados', 'chamoyados', 'Sabores con toque de chamoy', 3),
  ('Con Licor', 'con-licor', 'Sabores con un toque de licor', 4);

-- 4. PRODUCTS — Paquetes de sorbete (volume-based)
-- ============================================================================
INSERT INTO public.products (sku, nombre, descripcion, precio, in_stock, stock_count, image_urls, is_new)
VALUES
  ('SOR-MEDIO-GALON', 'Medio Galón', '17 sorbetes de 3 bolitas • Incluye 5 barquillos y 2 oz de miel', 10.00, true, 999, ARRAY['https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop'], false),
  ('SOR-GALON', 'Un Galón', '33 sorbetes de 3 bolitas • Incluye 10 barquillos y 4 oz de miel', 19.50, true, 999, ARRAY['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop'], false),
  ('SOR-DOS-GALONES', 'Dos Galones (Cubeta)', '70 sorbetes de 3 bolitas • Incluye 20 barquillos y 8 oz de miel', 35.00, true, 999, ARRAY['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop'], true),
  ('SOR-DOS-CUBETAS', 'Dos Cubetas', '2 cubetas • Incluye 40 barquillos y 16 oz de miel', 69.50, true, 999, ARRAY['https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop'], false);

-- Link paquetes to all categories (they contain all flavor types)
INSERT INTO public.product_categories (product_id, category_id)
SELECT p.id, c.id FROM public.products p, public.categories c
WHERE p.sku IN ('SOR-MEDIO-GALON', 'SOR-GALON', 'SOR-DOS-GALONES', 'SOR-DOS-CUBETAS');

-- 5. SABORES seed data — All real Sorbe flavors
-- ============================================================================
INSERT INTO public.sabores (nombre, categoria, descripcion, sort_order) VALUES
  -- Con Leche
  ('Vainilla', 'con_leche', 'Clásico sabor a vainilla', 1),
  ('Fresa con Crema', 'con_leche', 'Fresa con crema batida', 2),
  ('Chicle', 'con_leche', 'Sabor a chicle nostálgico', 3),
  ('Pistacho', 'con_leche', 'Pistacho cremoso', 4),
  ('Guineo', 'con_leche', 'Guineo maduro natural', 5),
  ('Galleta Orio', 'con_leche', 'Galleta Orio triturada', 6),
  ('Ron con Pasas', 'con_leche', 'Ron con pasas maceradas', 7),
  -- Naturales
  ('Coco', 'naturales', 'Coco fresco natural', 8),
  ('Tamarindo', 'naturales', 'Tamarindo ácido y dulce', 9),
  ('Piña', 'naturales', 'Piña tropical refrescante', 10),
  ('Maracuyá', 'naturales', 'Maracuyá intenso', 11),
  ('Mamey', 'naturales', 'Mamey salvadoreño', 12),
  ('Fresa', 'naturales', 'Fresa frutal natural', 13),
  ('Arrayán', 'naturales', 'Arrayán tradicional', 14),
  ('Melón', 'naturales', 'Melón dulce refrescante', 15),
  ('Jocote', 'naturales', 'Jocote de temporada', 16),
  ('Mango Sazón', 'naturales', 'Mango sazón con sal', 17),
  ('Mango Verde', 'naturales', 'Mango verde ácido', 18),
  ('Sandía', 'naturales', 'Sandía fresca', 19),
  ('Carambola', 'naturales', 'Carambola exótica', 20),
  -- Chamoyados
  ('Piña Chamoy', 'chamoyados', 'Piña con chamoy', 21),
  ('Arrayán Chamoy', 'chamoyados', 'Arrayán con chamoy', 22),
  ('Tamarindo Chamoy', 'chamoyados', 'Tamarindo con chamoy', 23),
  ('Sandía Chamoy', 'chamoyados', 'Sandía con chamoy', 24),
  ('Fresa Chamoy', 'chamoyados', 'Fresa con chamoy', 25),
  ('Mango Chamoy', 'chamoyados', 'Mango con chamoy', 26),
  -- Con Licor
  ('Tamarindo Gran Malo', 'con_licor', 'Tamarindo con Gran Malo', 27),
  ('Piña Colada', 'con_licor', 'Piña colada tropical', 28),
  ('Mojito', 'con_licor', 'Mojito refrescante', 29);

-- 6. CONFIG_TIENDA — Real store info
-- ============================================================================
INSERT INTO public.config_tienda (clave, valor, descripcion) VALUES
  ('info', '{"nombre": "Sorbe", "tagline": "Tu felicidad, nuestra pasión", "desde": 2013, "tipo": "Sorbete Artesanal"}', 'Información de la marca'),
  ('whatsapp', '{"numero": "50379383084", "mensaje_default": "Hola Sorbe, quiero hacer un pedido"}', 'WhatsApp Business'),
  ('direccion', '{"calle": "Avenida Dario Gonzales 731", "colonia": "Barrio San Jacinto", "ciudad": "San Salvador", "referencia": "A 25 mt del costado sur del Mercado San Jacinto"}', 'Dirección física'),
  ('delivery', '{"san_jacinto": {"minimo": 10.00, "costo": 1.00}, "san_salvador": {"minimo": 35.00, "costo": 3.00}}', 'Zonas y costos de delivery'),
  ('extras', '{"barquillo": 0.15, "onza_miel": 1.00}', 'Precios de extras');
