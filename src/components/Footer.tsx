import React from 'react';
import { MessageCircle, Facebook, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#091024] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#3bc8da] mb-4">
              Sorbe
            </h3>
            <p className="text-gray-300 mb-4">
              Helados artesanales. Sabores naturales, momentos inolvidables.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/503" target="_blank" rel="noopener noreferrer" className="text-[#3fdb70] hover:text-[#3fdb70]/80" aria-label="WhatsApp">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#3bc8da] hover:text-[#3bc8da]/80" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#f3cb49] hover:text-[#f3cb49]/80" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a 
                  href="https://wa.me/503" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#3fdb70] transition-colors"
                >
                  WhatsApp Business
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>El Salvador</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Sorbe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
