import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Milk, Apple, Flame, Wine } from 'lucide-react';

type Sabor = { id: string; nombre: string; categoria: string; descripcion?: string };

const categories = [
  { key: 'con_leche', label: 'Sabores con Leche', icon: Milk, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { key: 'naturales', label: 'Sabores Naturales', icon: Apple, color: 'text-green-700 bg-green-50 border-green-200' },
  { key: 'chamoyados', label: 'Sabores Chamoyados', icon: Flame, color: 'text-red-700 bg-red-50 border-red-200' },
  { key: 'con_licor', label: 'Sabores con Licor', icon: Wine, color: 'text-purple-700 bg-purple-50 border-purple-200' },
];

const Sabores = () => {
  const [sabores, setSabores] = useState<Record<string, Sabor[]>>({});

  useEffect(() => {
    supabase.from('sabores').select('*').eq('disponible', true).order('sort_order').then(({ data }) => {
      const grouped: Record<string, Sabor[]> = {};
      (data || []).forEach((s: any) => {
        if (!grouped[s.categoria]) grouped[s.categoria] = [];
        grouped[s.categoria].push(s);
      });
      setSabores(grouped);
    });
  }, []);

  const total = Object.values(sabores).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 bg-gradient-to-b from-sorbe-chocolate to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-2">{total} Sabores</h1>
          <p className="text-xl text-sorbe-cream/70">Todos nuestros sorbetes están hechos con ingredientes de la más alta calidad</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {categories.map(cat => {
            const flavors = sabores[cat.key] || [];
            if (flavors.length === 0) return null;
            return (
              <div key={cat.key} className={`mb-10 ${cat.color} rounded-2xl border p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className="w-7 h-7" />
                  <h2 className="text-2xl font-bold">{cat.label}</h2>
                  <span className="text-sm opacity-60 ml-auto">{flavors.length} sabores</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {flavors.map(s => (
                    <div key={s.id} className="bg-white/60 rounded-lg px-3 py-2 text-sm font-medium text-center">
                      {s.nombre}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Note */}
          <div className="text-center mt-8 p-6 bg-muted rounded-2xl">
            <p className="text-muted-foreground">
              Sus pedidos pueden incluir varios sabores. Todos nuestros productos están
              elaborados con los más altos estándares higiénicos y materiales de alta calidad.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sabores;
