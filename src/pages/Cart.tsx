import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, ArrowRight, Package } from 'lucide-react';

type CartItem = {
  id: string; nombre: string; precio: number; paquete?: string; paqueteId?: string;
  image: string; quantity: number;
};

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  }, []);

  const saveItems = (updated: CartItem[]) => {
    setItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    localStorage.setItem('cartItemsCount', String(updated.reduce((s, i) => s + i.quantity, 0)));
  };

  const updateQuantity = (id: string, delta: number) => {
    saveItems(items.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeItem = (id: string) => saveItems(items.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.precio * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">Explora nuestros sabores y arma tu paquete.</p>
          <button onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90">
            Ver Sabores <ArrowRight className="w-4 h-4" />
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
        <button onClick={() => navigate('/products')} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Seguir explorando sabores
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Tu Carrito</h1>
        <p className="text-muted-foreground mb-6">Revisa tus sabores y el tamaño del paquete</p>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-card rounded-2xl p-4 border border-border flex gap-4">
              <img src={item.image || '/placeholder.svg'} alt={item.nombre}
                className="w-20 h-20 rounded-xl object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{item.nombre}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Package className="w-3.5 h-3.5 text-sorbe-primary" />
                  <span className="text-sm text-muted-foreground">{item.paquete || 'Sin paquete'}</span>
                </div>
                <p className="text-primary font-bold mt-1">${(item.precio * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
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

        <div className="mt-8 bg-card rounded-2xl p-6 border border-border">
          <div className="flex justify-between mb-2"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-muted-foreground"><span>Delivery</span><span>Se calcula en el checkout</span></div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between">
            <span className="font-bold text-lg">Total (sin delivery)</span>
            <span className="font-bold text-lg text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2">
          Finalizar Pedido <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
