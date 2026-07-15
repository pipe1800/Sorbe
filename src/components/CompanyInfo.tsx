import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';

const CompanyInfo = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#091024] text-center mb-12">
            Sobre Sorbe
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#3bc8da]">
              <h3 className="text-xl font-semibold text-[#091024] mb-4">Nuestra Historia</h3>
              <p className="text-gray-600">
                Sorbe nace de la pasión por los sabores naturales y la tradición artesanal. 
                Cada helado es preparado con ingredientes frescos y mucho amor.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#f3cb49]">
              <h3 className="text-xl font-semibold text-[#091024] mb-4">Contacto</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#3fdb70]" />
                  <a 
                    href="https://wa.me/503" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#091024] hover:text-[#3fdb70] transition-colors"
                  >
                    WhatsApp Business
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d93d34]" />
                  <span>El Salvador</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
