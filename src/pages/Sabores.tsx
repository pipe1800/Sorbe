import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FlavorBadge from '@/components/IndicadorSabor';
import SeasonalBanner from '@/components/BannerTemporal';
import { IceCream } from 'lucide-react';

const sabores = [
  { nombre: 'Fresa Natural', categoria: 'Frutal', descripcion: 'Con trozos de fresa fresca' },
  { nombre: 'Mango Tropical', categoria: 'Frutal', descripcion: 'Mango maduro de temporada' },
  { nombre: 'Maracuyá', categoria: 'Cítrico', descripcion: 'Intenso y refrescante' },
  { nombre: 'Coco Cremoso', categoria: 'Cremoso', descripcion: 'Leche de coco artesanal' },
  { nombre: 'Vainilla Clásica', categoria: 'Cremoso', descripcion: 'Vainilla natural de Madagascar' },
  { nombre: 'Chocolate Intenso', categoria: 'Chocolate', descripcion: 'Cacao 70% salvadoreño' },
  { nombre: 'Choco-Menta', categoria: 'Chocolate', descripcion: 'Chocolate con menta fresca' },
  { nombre: 'Limón Hierbabuena', categoria: 'Herbal', descripcion: 'Cítrico con toque herbal' },
];

const Sabores = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 bg-gradient-to-b from-sorbe-chocolate to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <IceCream className="w-12 h-12 mx-auto mb-4 text-sorbe-strawberry" />
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Nuestros Sabores</h1>
          <p className="text-xl text-sorbe-cream/70 max-w-2xl mx-auto">
            Descubre nuestra colección de sabores artesanales, desde los clásicos hasta ediciones limitadas.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <SeasonalBanner
              title="Sabores de Temporada"
              subtitle="Nuevos sabores cada temporada — ¡pruébalos antes de que se vayan!"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sabores.map((sabor) => (
              <div key={sabor.nombre} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                <div className="mb-3">
                  <FlavorBadge flavor={sabor.categoria} />
                </div>
                <h3 className="text-lg font-bold mb-1">{sabor.nombre}</h3>
                <p className="text-muted-foreground text-sm">{sabor.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-muted rounded-2xl">
            <h3 className="text-xl font-bold mb-2">¿No encuentras tu sabor favorito?</h3>
            <p className="text-muted-foreground">
              Siempre estamos creando nuevos sabores. Escríbenos por WhatsApp y cuéntanos qué te gustaría probar.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sabores;
