import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  IceCream, Truck, MapPin, Star, ArrowRight, Milk, Apple, Flame, Wine,
  Dumbbell, Users, Shield, Sparkles, Phone, Clock, ChevronRight,
} from 'lucide-react';

const flavorCategories = [
  { key: 'con_leche', label: 'Con Leche', icon: Milk, emoji: '🥛', color: 'from-amber-400 to-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  { key: 'naturales', label: 'Naturales', icon: Apple, emoji: '🍉', color: 'from-green-400 to-green-500', bg: 'bg-green-50', text: 'text-green-700' },
  { key: 'chamoyados', label: 'Chamoyados', icon: Flame, emoji: '🌶️', color: 'from-red-400 to-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  { key: 'con_licor', label: 'Con Licor', icon: Wine, emoji: '🍸', color: 'from-purple-400 to-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  { key: 'con_proteina', label: 'Con Proteína', icon: Dumbbell, emoji: '💪', color: 'from-blue-400 to-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
];

const features = [
  { icon: IceCream, title: 'Sorbete Artesanal', desc: 'Elaborado con ingredientes frescos y naturales desde 2013', color: 'text-sorbe-primary', bg: 'bg-sorbe-primary/10' },
  { icon: Truck, title: 'Delivery San Salvador', desc: 'San Jacinto desde $1 · Otras zonas desde $3', color: 'text-sorbe-teal', bg: 'bg-sorbe-teal/10' },
  { icon: Sparkles, title: '31 Sabores', desc: 'Con leche, naturales, chamoyados, con licor y proteína', color: 'text-sorbe-green', bg: 'bg-sorbe-green/10' },
  { icon: Users, title: 'Eventos', desc: 'Servicio personalizado para toda ocasión', color: 'text-sorbe-orange', bg: 'bg-sorbe-orange/10' },
];

const steps = [
  { step: '1', title: 'Elige tus sabores', desc: 'Explora nuestros 31 sabores artesanales' },
  { step: '2', title: 'Selecciona el tamaño', desc: 'Medio galón, galón, dos galones o dos cubetas' },
  { step: '3', title: 'Recibe en casa', desc: 'Delivery en San Salvador o recoge en tienda' },
];

const Index = () => {
  const navigate = useNavigate();
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    supabase.from('sabores').select('categoria').then(({ data }) => {
      const counts: Record<string, number> = {};
      (data || []).forEach((s: any) => { counts[s.categoria] = (counts[s.categoria] || 0) + 1; });
      setFlavorCounts(counts);
    });
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, []);

  const totalFlavors = Object.values(flavorCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />

      {/* ── HERO ── */}
      <section className="relative bg-sorbe-teal text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sorbe-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">Desde 2013</p>
          <h1 className="text-6xl sm:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-sorbe-primary via-sorbe-tan to-sorbe-green bg-clip-text text-transparent">Sorbe</span>
          </h1>
          <p className="text-2xl sm:text-3xl font-light text-sorbe-light/80 mb-2">Tu felicidad, nuestra pasión</p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="bg-white/10 backdrop-blur-sm text-white/90 text-sm px-5 py-2 rounded-full border border-white/10">Sorbete Artesanal</span>
            <span className="bg-white/10 backdrop-blur-sm text-white/90 text-sm px-5 py-2 rounded-full border border-white/10">Delivery San Salvador</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button onClick={() => navigate('/products')}
              className="bg-sorbe-primary hover:bg-sorbe-orange text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
              Ver Sabores <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/contacto')}
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 border border-white/20 inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Pedir Ahora
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-2xl hover:shadow-md transition-all">
                <div className={`${f.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <f.icon className={`w-8 h-8 ${f.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAVOR CATEGORIES ── */}
      <section className="py-20 bg-sorbe-green text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-2">{totalFlavors} Sabores Artesanales</h2>
            <p className="text-white/80 text-lg">Cinco categorías para todos los gustos</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {flavorCategories.map(cat => (
              <button key={cat.key} onClick={() => navigate(`/products?category=${cat.key}`)}
                className={`${cat.bg} rounded-2xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all border border-transparent hover:border-current group`}>
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <h3 className={`font-bold ${cat.text} mb-1`}>{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{flavorCounts[cat.key] || 0} sabores</p>
                <ChevronRight className={`w-4 h-4 ${cat.text} mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">¿Cómo funciona?</h2>
          <p className="text-muted-foreground text-lg mb-12">Arma tu pedido en tres pasos</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-sorbe-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4">{s.step}</div>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-8 -right-4 text-muted-foreground/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/products')}
            className="mt-12 bg-sorbe-primary hover:bg-sorbe-orange text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2">
            Empezar mi pedido <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section className="py-20 bg-sorbe-blue text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Truck className="w-12 h-12 mx-auto mb-4 text-sorbe-teal" />
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Delivery en San Salvador</h2>
          <p className="text-sorbe-light/70 text-lg mb-10">Llevamos el sabor hasta tu puerta</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-left">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-sorbe-primary" />
                <h3 className="font-bold text-lg">San Jacinto y alrededores</h3>
              </div>
              <p className="text-sorbe-light/70">Mínimo $10.00</p>
              <p className="text-2xl font-bold text-sorbe-teal mt-1">Delivery $1.00</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-left">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-sorbe-teal" />
                <h3 className="font-bold text-lg">San Salvador</h3>
              </div>
              <p className="text-sorbe-light/70">Mínimo $35.00</p>
              <p className="text-2xl font-bold text-sorbe-teal mt-1">Delivery $3.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENTS + QUALITY ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-sorbe-primary/5 rounded-2xl p-8 border border-sorbe-primary/10">
              <Users className="w-10 h-10 text-sorbe-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Eventos Especiales</h3>
              <p className="text-muted-foreground leading-relaxed">
                Atendemos cumpleaños, bodas, eventos corporativos y más con servicio personalizado.
                Pregunta por nuestros paquetes especiales.
              </p>
            </div>
            <div className="bg-sorbe-teal/5 rounded-2xl p-8 border border-sorbe-teal/10">
              <Shield className="w-10 h-10 text-sorbe-teal mb-4" />
              <h3 className="text-xl font-bold mb-2">Calidad Garantizada</h3>
              <p className="text-muted-foreground leading-relaxed">
                Todos nuestros productos están elaborados con los más altos estándares higiénicos
                y materiales de alta calidad desde 2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-gradient-to-r from-sorbe-primary to-sorbe-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <IceCream className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl sm:text-5xl font-black mb-4">¿Listo para probar el mejor sorbete artesanal?</h2>
          <p className="text-white/80 text-lg mb-8">Pide ahora por WhatsApp o explora nuestros sabores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/50379383084" target="_blank" rel="noopener noreferrer"
              className="bg-white text-sorbe-primary hover:bg-white/90 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Pedir por WhatsApp
            </a>
            <button onClick={() => navigate('/products')}
              className="bg-white/20 hover:bg-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 border border-white/30 inline-flex items-center justify-center gap-2">
              Explorar Sabores <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
