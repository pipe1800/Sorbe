import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone, Heart } from 'lucide-react';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20 bg-gradient-to-b from-sorbe-chocolate to-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Nuestra Historia</h1>
          <p className="text-xl text-sorbe-cream/70 max-w-2xl mx-auto">
            Sorbe nace del amor por los sabores auténticos y la tradición artesanal salvadoreña.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <Heart className="w-10 h-10 text-sorbe-strawberry mb-4" />
              <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Crear momentos de felicidad a través de helados artesanales hechos con ingredientes
                frescos y naturales. Cada sabor cuenta una historia, cada bocado es una experiencia.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <MapPin className="w-10 h-10 text-sorbe-mint mb-4" />
              <h2 className="text-2xl font-bold mb-4">Dónde Estamos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Operamos desde El Salvador con puntos de entrega en San Salvador y área metropolitana.
                Próximamente expandiendo a más departamentos.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Clock className="w-10 h-10 text-sorbe-lemon mb-4" />
              <h2 className="text-2xl font-bold mb-4">Horarios</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">Lunes a Viernes:</span> 10:00 AM - 8:00 PM</p>
                <p><span className="font-medium text-foreground">Sábado:</span> 10:00 AM - 9:00 PM</p>
                <p><span className="font-medium text-foreground">Domingo:</span> 11:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Phone className="w-10 h-10 text-sorbe-raspberry mb-4" />
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Pedidos por WhatsApp</p>
                <a href="https://wa.me/503" target="_blank" rel="noopener noreferrer"
                  className="text-sorbe-mint hover:underline font-medium text-lg">+503 ---- ----</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
