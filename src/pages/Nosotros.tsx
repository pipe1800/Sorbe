import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone, Heart, Store } from 'lucide-react';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20 bg-gradient-to-b from-sorbe-blue to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sorbe-primary font-semibold tracking-wider uppercase mb-2">Desde 2013</p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Sorbe</h1>
          <p className="text-xl text-sorbe-light/70">Tu felicidad, nuestra pasión</p>
          <p className="text-sorbe-teal mt-4">Sorbete Artesanal • Delivery San Salvador</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <Heart className="w-10 h-10 text-sorbe-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-muted-foreground leading-relaxed">
                Desde 2013, Sorbe ha sido sinónimo de sorbete artesanal de calidad en El Salvador.
                Elaboramos cada sorbete con los más altos estándares higiénicos y materiales de alta calidad.
                Nuestros clientes son nuestra prioridad.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Store className="w-10 h-10 text-sorbe-teal mb-4" />
              <h2 className="text-2xl font-bold mb-4">Visítanos</h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-sorbe-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Dirección</p>
                    <p>Avenida Dario Gonzales 731, Barrio San Jacinto</p>
                    <p className="text-sm">San Salvador</p>
                    <p className="text-xs mt-1">A 25 mt del costado sur del Mercado San Jacinto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Clock className="w-10 h-10 text-sorbe-green mb-4" />
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Atendemos todo tipo de eventos con servicio personalizado.
                Pregunta por nuestros paquetes especiales para cumpleaños,
                bodas, eventos corporativos y más.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Phone className="w-10 h-10 text-sorbe-orange mb-4" />
              <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Pedidos por WhatsApp</p>
                <a href="https://wa.me/50379383084" target="_blank" rel="noopener noreferrer"
                  className="text-sorbe-teal hover:underline font-medium text-lg">+503 7938 3084</a>
              </div>
            </div>
          </div>

          {/* Quality note */}
          <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
            <h3 className="text-xl font-bold mb-2">Calidad Garantizada</h3>
            <p className="text-muted-foreground">
              Todos nuestros productos están elaborados con los más altos estándares higiénicos
              y materiales de alta calidad. Tu satisfacción es nuestra prioridad.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
