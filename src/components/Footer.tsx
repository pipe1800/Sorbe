import React from 'react';
import { MessageCircle, Facebook, MapPin, IceCream } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sorbe-tan text-sorbe-blue py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IceCream className="w-6 h-6 text-sorbe-primary" />
              <h3 className="text-xl font-bold">Sorbe</h3>
            </div>
            <p className="text-sorbe-blue/70 mb-4 text-sm">
              Sorbete artesanal desde 2013. Tu felicidad, nuestra pasión.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/50379383084" target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="bg-sorbe-blue text-white p-2 rounded-full hover:bg-sorbe-blue/80 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="bg-sorbe-primary text-white p-2 rounded-full hover:bg-sorbe-primary/80 transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <div className="space-y-2 text-sorbe-blue/70 text-sm">
              <a href="https://wa.me/50379383084" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-sorbe-primary transition-colors">
                <MessageCircle className="w-4 h-4 text-green-500" /> +503 7938 3084
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sorbe-primary" />
                <span>Av. Dario Gonzales 731, San Jacinto, San Salvador</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Delivery</h4>
            <div className="space-y-1 text-sorbe-blue/70 text-sm">
              <p>San Jacinto: mín $10 + $1</p>
              <p>San Salvador: mín $35 + $3</p>
              <p className="mt-2 text-xs">Atendemos todo tipo de eventos</p>
            </div>
          </div>
        </div>

        <div className="border-t border-sorbe-blue/20 mt-8 pt-6 text-center text-sorbe-blue/50 text-sm">
          <p>&copy; 2025 Sorbe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
