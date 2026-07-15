import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle, Facebook, MapPin, Store } from 'lucide-react';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20 bg-gradient-to-b from-sorbe-chocolate to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Contáctanos</h1>
          <p className="text-xl text-sorbe-cream/70">Pide tu Sorbe ahora o visítanos</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* WhatsApp — primary CTA */}
          <a href="https://wa.me/50379383084" target="_blank" rel="noopener noreferrer"
            className="block bg-green-500 hover:bg-green-600 text-white rounded-2xl p-8 text-center mb-6 transition-all hover:shadow-xl hover:scale-[1.02]">
            <MessageCircle className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">Pedir por WhatsApp</h2>
            <p className="text-green-100 mb-2">La forma más rápida de hacer tu pedido</p>
            <p className="text-3xl font-black">+503 7938 3084</p>
          </a>

          {/* Address */}
          <div className="bg-card rounded-2xl p-8 border border-border mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-sorbe-strawberry/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-sorbe-strawberry" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visítanos</h3>
                <p className="text-foreground font-medium">Avenida Dario Gonzales 731</p>
                <p className="text-muted-foreground">Barrio San Jacinto, San Salvador</p>
                <p className="text-sm text-muted-foreground mt-1">A 25 mt del costado sur del Mercado San Jacinto</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border hover:border-blue-400/50 hover:shadow-lg transition-all text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-1">Facebook</h3>
              <p className="text-sm text-muted-foreground">Síguenos para novedades</p>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border hover:border-pink-400/50 hover:shadow-lg transition-all text-center">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-600">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </div>
              <h3 className="font-bold mb-1">Instagram</h3>
              <p className="text-sm text-muted-foreground">@sorbe_helados</p>
            </a>
          </div>

          {/* Hours */}
          <div className="mt-8 bg-muted rounded-2xl p-8 text-center">
            <Store className="w-10 h-10 mx-auto mb-3 text-sorbe-raspberry" />
            <h3 className="text-xl font-bold mb-2">Horarios de Atención</h3>
            <p className="text-muted-foreground">Abierto todos los días para delivery</p>
            <p className="text-muted-foreground">Contáctanos por WhatsApp para confirmar disponibilidad</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
