import React from 'react';
import { MessageCircle } from 'lucide-react';

type WhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
};

const DEFAULT_PHONE = '503';
const DEFAULT_MESSAGE = 'Hola Sorbe, quiero hacer un pedido...';

const WhatsAppButton = ({
  phoneNumber = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chatear por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-sorbe-blue text-sm px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¿Te ayudamos?
      </span>
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
    </a>
  );
};

export default WhatsAppButton;
