-- Sorbetes con Proteína — nueva categoría

-- Allow new category in sabores
ALTER TABLE public.sabores DROP CONSTRAINT IF EXISTS sabores_categoria_check;
ALTER TABLE public.sabores ADD CONSTRAINT sabores_categoria_check
  CHECK (categoria IN ('con_leche', 'naturales', 'chamoyados', 'con_licor', 'con_proteina'));

-- Add category
INSERT INTO public.categories (nombre, slug, descripcion, sort_order)
VALUES ('Con Proteína', 'con-proteina', 'Sorbetes enriquecidos con proteína', 5);

-- Add flavors
INSERT INTO public.sabores (nombre, categoria, descripcion, sort_order)
VALUES
  ('Chocolate Proteína', 'con_proteina', 'Chocolate con proteína añadida', 30),
  ('Vainilla Proteína', 'con_proteina', 'Vainilla con proteína añadida', 31);
