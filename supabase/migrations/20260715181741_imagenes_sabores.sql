-- Add image_url column to sabores
ALTER TABLE public.sabores ADD COLUMN IF NOT EXISTS image_url text;

-- Seed images for each flavor using Unsplash food photos
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop' WHERE nombre = 'Vainilla';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop' WHERE nombre = 'Fresa con Crema';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' WHERE nombre = 'Chicle';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' WHERE nombre = 'Pistacho';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace98e?w=400&h=400&fit=crop' WHERE nombre = 'Guineo';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop' WHERE nombre = 'Galleta Orio';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=400&fit=crop' WHERE nombre = 'Ron con Pasas';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop' WHERE nombre = 'Coco';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop' WHERE nombre = 'Tamarindo';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace98e?w=400&h=400&fit=crop' WHERE nombre = 'Piña';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' WHERE nombre = 'Maracuyá';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' WHERE nombre = 'Mamey';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop' WHERE nombre = 'Fresa';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop' WHERE nombre = 'Arrayán';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace98e?w=400&h=400&fit=crop' WHERE nombre = 'Melón';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' WHERE nombre = 'Jocote';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop' WHERE nombre = 'Mango Sazón';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' WHERE nombre = 'Mango Verde';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop' WHERE nombre = 'Sandía';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop' WHERE nombre = 'Carambola';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=400&fit=crop' WHERE nombre = 'Piña Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace98e?w=400&h=400&fit=crop' WHERE nombre = 'Arrayán Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop' WHERE nombre = 'Tamarindo Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' WHERE nombre = 'Sandía Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' WHERE nombre = 'Fresa Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop' WHERE nombre = 'Mango Chamoy';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop' WHERE nombre = 'Tamarindo Gran Malo';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace98e?w=400&h=400&fit=crop' WHERE nombre = 'Piña Colada';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' WHERE nombre = 'Mojito';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1629385700961-0b0ee6fc2b22?w=400&h=400&fit=crop' WHERE nombre = 'Chocolate Proteína';
UPDATE public.sabores SET image_url = 'https://images.unsplash.com/photo-1570197788417-0e82375c318f?w=400&h=400&fit=crop' WHERE nombre = 'Vainilla Proteína';
