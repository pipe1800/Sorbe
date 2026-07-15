import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Package } from 'lucide-react';

type Sabor = {
  id: string; nombre: string; categoria: string; descripcion?: string; image_url?: string;
};

type Paquete = {
  id: string; nombre: string; precio: number; descripcion?: string;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sabor, setSabor] = useState<Sabor | null>(null);
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    supabase.from('sabores').select('*').eq('id', id).single().then(({ data }) => setSabor(data));
    supabase.from('products').select('id, nombre, precio, descripcion').order('precio').then(({ data }) => {
      setPaquetes(data || []);
      if (data?.length) setSelectedPackage(data[0].id);
    });
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, [id]);

  const selectedPkg = paquetes.find(p => p.id === selectedPackage);

  const handleAddToCart = () => {
    if (!sabor || !selectedPkg) return;
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existing.push({
      id: sabor.id,
      nombre: sabor.nombre,
      precio: selectedPkg.precio,
      paquete: selectedPkg.nombre,
      paqueteId: selectedPkg.id,
      image: sabor.image_url,
      quantity: 1,
    });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartCount + 1));
    toast({ title: 'Agregado al carrito', description: `${sabor.nombre} — ${selectedPkg.nombre}` });
  };

  if (!sabor) {
    return <div className="min-h-screen bg-background"><Header /><div className="container mx-auto px-4 py-20 text-center"><p>Cargando...</p></div><Footer /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border aspect-square">
            <img src={sabor.image_url || '/placeholder.svg'} alt={sabor.nombre}
              className="w-full h-full object-cover" />
          </div>

          {/* Info + package picker */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{sabor.nombre}</h1>
            <p className="text-muted-foreground mb-6">{sabor.descripcion || 'Sorbete artesanal Sorbe'}</p>

            {/* Package selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-sorbe-primary" /> Tamaño del paquete
              </h3>
              <div className="space-y-2">
                {paquetes.map(pkg => (
                  <button key={pkg.id} onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{pkg.nombre}</span>
                      <span className="text-xl font-bold text-primary">${pkg.precio.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.descripcion}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Agregar al Carrito{selectedPkg ? ` — $${selectedPkg.precio.toFixed(2)}` : ''}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Tu pedido puede incluir varios sabores. Agrega todos los que quieras antes de finalizar.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
