import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle, Facebook, MapPin, Mail } from 'lucide-react';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20 bg-gradient-to-b from-sorbe-chocolate to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Contacto</h1>
          <p className="text-xl text-sorbe-cream/70 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos por WhatsApp, síguenos en redes o visítanos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <a href="https://wa.me/503" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-2xl p-8 border border-border hover:border-sorbe-mint/50 hover:shadow-lg transition-all group">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-2">La forma más rápida de hacer tu pedido</p>
              <span className="text-sorbe-mint font-semibold">+503 ---- ----</span>
            </a>

            {/* Facebook */}
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-2xl p-8 border border-border hover:border-blue-400/50 hover:shadow-lg transition-all group">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Facebook className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Facebook</h3>
              <p className="text-muted-foreground mb-2">Síguenos para novedades y promociones</p>
              <span className="text-blue-500 font-semibold">Sorbe Helados</span>
            </a>

            {/* Instagram */}
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-2xl p-8 border border-border hover:border-pink-400/50 hover:shadow-lg transition-all group">
              <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-pink-600">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-muted-foreground mb-2">Mira nuestros helados en acción</p>
              <span className="text-pink-500 font-semibold">@sorbe_helados</span>
            </a>

            {/* Email */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="bg-sorbe-strawberry/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-sorbe-strawberry" />
              </div>
              <h3 className="text-xl font-bold mb-2">Correo</h3>
              <p className="text-muted-foreground mb-2">Para consultas y pedidos especiales</p>
              <span className="text-sorbe-strawberry font-semibold">hola@sorbehelados.com</span>
            </div>
          </div>

          {/* Ubicación */}
          <div className="mt-12 bg-card rounded-2xl p-8 border border-border text-center">
            <MapPin className="w-10 h-10 mx-auto mb-4 text-sorbe-raspberry" />
            <h3 className="text-xl font-bold mb-2">Puntos de Entrega</h3>
            <p className="text-muted-foreground">
              Entrega disponible en San Salvador y área metropolitana.
              También puedes recoger tu pedido en nuestros puntos autorizados.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
