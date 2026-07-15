import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FlavorBadge from '@/components/IndicadorSabor';
import DietaryIcons from '@/components/IconosDieta';
import SizeSelector from '@/components/SelectorTalla';
import ProductSection from '@/components/ProductSection';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Star, Heart, AlertTriangle } from 'lucide-react';

type Product = {
  id: string;
  sku: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_original?: number;
  perfil_sabor?: string[];
  info_dietetica?: Record<string, boolean>;
  opciones_talla?: { nombre: string; modificador_precio: number }[];
  es_temporal?: boolean;
  alergenos?: string[];
  ingredientes?: string;
  image_urls?: string[];
  rating?: number;
  review_count?: number;
  is_new?: boolean;
  is_on_sale?: boolean;
  in_stock?: boolean;
  stock_count?: number;
  likes_count?: number;
};

type SizeOption = { nombre: string; modificador_precio: number };

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    if (data) {
      const p = data as Product;
      setProduct(p);
      if (p.opciones_talla?.length) setSelectedSize(p.opciones_talla[0]);

      // Fetch similar products by flavor
      if (p.perfil_sabor?.length) {
        const { data: similar } = await supabase.from('products').select('*')
          .neq('id', id).limit(4).order('rating', { ascending: false });
        setSimilarProducts((similar || []) as Product[]);
      }
    }
    setLoading(false);
  };

  const currentPrice = selectedSize
    ? product!.precio + selectedSize.modificador_precio
    : product?.precio || 0;

  const handleAddToCart = () => {
    if (!product?.in_stock) {
      toast({ title: 'Producto agotado', variant: 'destructive' });
      return;
    }
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existing.push({
      id: product.id,
      nombre: product.nombre,
      precio: currentPrice,
      talla: selectedSize?.nombre,
      image: product.image_urls?.[0] || '',
      quantity: 1,
    });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartCount + 1));
    toast({ title: 'Agregado al carrito', description: `${product.nombre}${selectedSize ? ` (${selectedSize.nombre})` : ''}` });
  };

  const discount = product?.precio_original
    ? Math.round((1 - product.precio / product.precio_original) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
          <button onClick={() => navigate('/products')} className="text-primary hover:underline">Ver todos los productos</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />

      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-card rounded-2xl overflow-hidden border border-border aspect-square">
              <img src={product.image_urls?.[selectedImage] || '/placeholder.svg'} alt={product.nombre}
                className="w-full h-full object-cover" />
            </div>
            {product.image_urls && product.image_urls.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.image_urls.map((url, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'}`}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 flex-wrap mb-3">
              {product.es_temporal && <span className="bg-sorbe-strawberry text-white text-xs px-2 py-0.5 rounded-full font-medium">Temporal</span>}
              {product.is_new && <span className="bg-sorbe-mint text-sorbe-chocolate text-xs px-2 py-0.5 rounded-full font-medium">Nuevo</span>}
              {product.is_on_sale && <span className="bg-sorbe-raspberry text-white text-xs px-2 py-0.5 rounded-full font-medium">Oferta</span>}
            </div>

            {/* Flavor badges */}
            {product.perfil_sabor && (
              <div className="flex gap-1 flex-wrap mb-3">
                {product.perfil_sabor.map(f => <FlavorBadge key={f} flavor={f} />)}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.nombre}</h1>

            {/* Rating */}
            {product.rating && product.rating > 0 && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating!) ? 'text-sorbe-lemon fill-current' : 'text-muted'}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-1">({product.review_count || 0})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</span>
              {product.precio_original && (
                <span className="text-lg text-muted-foreground line-through">${product.precio_original.toFixed(2)}</span>
              )}
              {discount > 0 && <span className="text-sm font-medium text-sorbe-raspberry">-{discount}%</span>}
            </div>

            {/* Dietary info */}
            {product.info_dietetica && <div className="mb-4"><DietaryIcons info={product.info_dietetica} /></div>}

            {/* Allergens */}
            {product.alergenos && product.alergenos.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-600 mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Alérgenos: {product.alergenos.join(', ')}</span>
              </div>
            )}

            {/* Size selector */}
            {product.opciones_talla?.length ? (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Talla:</p>
                <SizeSelector sizes={product.opciones_talla} selected={selectedSize?.nombre || null} onSelect={setSelectedSize} />
              </div>
            ) : null}

            {/* Add to cart */}
            <button onClick={handleAddToCart} disabled={!product.in_stock}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg transition-all ${
                product.in_stock
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}>
              <ShoppingCart className="w-5 h-5" />
              {product.in_stock ? 'Agregar al Carrito' : 'Agotado'}
            </button>

            {/* Description */}
            {product.descripcion && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">{product.descripcion}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredientes && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">Ingredientes</h3>
                <p className="text-muted-foreground text-sm">{product.ingredientes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Similar products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <ProductSection title="También te puede gustar" products={similarProducts} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
