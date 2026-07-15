import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Package, Milk, Apple, Flame, Wine, Dumbbell, X } from 'lucide-react';

type Paquete = {
  id: string; sku: string; nombre: string; descripcion?: string;
  precio: number; image_urls?: string[]; is_new?: boolean;
};

type Sabor = {
  id: string; nombre: string; categoria: string;
};

const flavorMeta: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  con_leche: { label: 'Con Leche', icon: Milk, color: 'text-amber-600', bg: 'bg-amber-50' },
  naturales: { label: 'Naturales', icon: Apple, color: 'text-green-600', bg: 'bg-green-50' },
  chamoyados: { label: 'Chamoyados', icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
  con_licor: { label: 'Con Licor', icon: Wine, color: 'text-purple-600', bg: 'bg-purple-50' },
  con_proteina: { label: 'Con Proteína', icon: Dumbbell, color: 'text-blue-600', bg: 'bg-blue-50' },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<Paquete | null>(null);
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => setPkg(data));
    supabase.from('sabores').select('id,nombre,categoria').eq('disponible', true).order('sort_order')
      .then(({ data }) => setSabores(data || []));
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, [id]);

  const toggleFlavor = (nombre: string) => {
    setSelectedFlavors(prev => prev.includes(nombre) ? prev.filter(f => f !== nombre) : [...prev, nombre]);
  };

  const handleAddToCart = () => {
    if (!pkg) return;
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existing.push({
      id: pkg.id,
      nombre: pkg.nombre,
      precio: pkg.precio,
      sabores: selectedFlavors,
      image: pkg.image_urls?.[0] || '',
      quantity: 1,
    });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartCount + 1));
    toast({ title: 'Agregado al carrito', description: `${pkg.nombre} con ${selectedFlavors.length} sabores` });
  };

  const filteredSabores = activeCategory
    ? sabores.filter(s => s.categoria === activeCategory)
    : sabores;

  if (!pkg) {
    return <div className="min-h-screen bg-background"><Header /><div className="container mx-auto px-4 py-20 text-center"><p>Cargando...</p></div><Footer /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border aspect-square">
            <img src={pkg.image_urls?.[0] || '/placeholder.svg'} alt={pkg.nombre} className="w-full h-full object-cover" />
          </div>

          {/* Package info */}
          <div>
            {pkg.is_new && <span className="bg-sorbe-mint text-sorbe-chocolate text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block">Popular</span>}
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{pkg.nombre}</h1>
            <p className="text-muted-foreground mb-4">{pkg.descripcion}</p>
            <p className="text-3xl font-bold text-primary mb-6">${pkg.precio.toFixed(2)}</p>

            {/* Selected flavors summary */}
            <div className="mb-6">
              <p className="font-medium mb-2">Sabores seleccionados ({selectedFlavors.length}):</p>
              {selectedFlavors.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedFlavors.map(f => (
                    <span key={f} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      {f}
                      <button onClick={() => toggleFlavor(f)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Selecciona sabores abajo</p>
              )}
            </div>

            <button onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Agregar al Carrito
            </button>
          </div>
        </div>

        {/* Flavor selection */}
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Package className="w-6 h-6 text-sorbe-strawberry" /> Elige tus sabores</h2>
        <p className="text-muted-foreground mb-6">Tu pedido puede incluir varios sabores. Selecciona los que quieras.</p>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>Todos</button>
          {Object.entries(flavorMeta).map(([key, meta]) => (
            <button key={key} onClick={() => setActiveCategory(key === activeCategory ? null : key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === key ? 'bg-primary text-primary-foreground' : `${meta.bg} ${meta.color}`}`}>
              <meta.icon className="w-4 h-4" /> {meta.label}
            </button>
          ))}
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSabores.map(s => {
            const meta = flavorMeta[s.categoria];
            const isSelected = selectedFlavors.includes(s.nombre);
            const Icon = meta.icon;
            return (
              <button key={s.id} onClick={() => toggleFlavor(s.nombre)}
                className={`rounded-xl p-3 text-center transition-all border-2 hover:shadow-md ${isSelected ? 'border-primary bg-primary/10' : `border-transparent ${meta.bg}`}`}>
                <Icon className={`w-5 h-5 mx-auto mb-1 ${meta.color}`} />
                <p className="font-medium text-sm">{s.nombre}</p>
                <p className="text-xs opacity-70">{meta.label}</p>
              </button>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
