import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  talla?: string;
  image: string;
  quantity: number;
};

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setItems(saved);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updated));
      localStorage.setItem('cartItemsCount', String(updated.reduce((s, i) => s + i.quantity, 0)));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updated));
      localStorage.setItem('cartItemsCount', String(updated.reduce((s, i) => s + i.quantity, 0)));
      return updated;
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">Agrega algunos helados deliciosos para empezar.</p>
          <button onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90">
            Ver Productos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={count} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Seguir comprando
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tu Carrito ({count})</h1>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-card rounded-2xl p-4 border border-border flex gap-4">
              <img src={item.image || '/placeholder.svg'} alt={item.nombre}
                className="w-20 h-20 rounded-xl object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.nombre}</h3>
                {item.talla && <p className="text-sm text-muted-foreground">Talla: {item.talla}</p>}
                <p className="text-primary font-bold mt-1">${(item.precio * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive/80 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-card rounded-2xl p-6 border border-border">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-muted-foreground">
            <span>Envío</span>
            <span>Se calcula en el checkout</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2">
          Proceder al Pago <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
