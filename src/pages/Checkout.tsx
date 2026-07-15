import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, MapPin, MessageCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type CartItem = {
  id: string; nombre: string; precio: number; sabores?: string[];
  image: string; quantity: number;
};

type DeliveryZone = 'san_jacinto' | 'san_salvador';

const DELIVERY_ZONES: Record<DeliveryZone, { label: string; minimo: number; costo: number }> = {
  san_jacinto: { label: 'San Jacinto y alrededores', minimo: 10.00, costo: 1.00 },
  san_salvador: { label: 'Otras áreas de San Salvador', minimo: 35.00, costo: 3.00 },
};

const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo', desc: 'Paga al recibir tu pedido' },
  { value: 'transferencia', label: 'Transferencia', desc: 'Transferencia bancaria' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [zona, setZona] = useState<DeliveryZone>('san_jacinto');
  const [direccion, setDireccion] = useState('');
  const [referencia, setReferencia] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setItems(saved);
    if (saved.length === 0) navigate('/cart');
  }, []);

  const subtotal = items.reduce((s, i) => s + i.precio * i.quantity, 0);
  const deliveryCost = DELIVERY_ZONES[zona].costo;
  const deliveryMin = DELIVERY_ZONES[zona].minimo;
  const total = subtotal + deliveryCost;
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const belowMinimum = subtotal < deliveryMin;

  const handleWhatsAppOrder = () => {
    if (!nombre || !telefono) {
      toast({ title: 'Datos requeridos', description: 'Completa nombre y teléfono.', variant: 'destructive' });
      return;
    }
    if (belowMinimum) {
      toast({ title: 'Pedido mínimo', description: `Mínimo $${deliveryMin.toFixed(2)} para ${DELIVERY_ZONES[zona].label}`, variant: 'destructive' });
      return;
    }

    // Format order for WhatsApp
    const flavorList = items.flatMap(i => i.sabores || []).join(', ');
    const itemList = items.map(i =>
      `• ${i.nombre} x${i.quantity} — $${(i.precio * i.quantity).toFixed(2)}${i.sabores?.length ? ` [${i.sabores.join(', ')}]` : ''}`
    ).join('\n');

    const message = encodeURIComponent(
      `*Nuevo Pedido Sorbe*\n\n` +
      `*Cliente:* ${nombre}\n` +
      `*Teléfono:* ${telefono}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Zona:* ${DELIVERY_ZONES[zona].label}\n` +
      `*Dirección:* ${direccion || 'Recoger en tienda'}\n` +
      `*Pago:* ${metodoPago}\n\n` +
      `*Pedido:*\n${itemList}\n\n` +
      `*Subtotal:* $${subtotal.toFixed(2)}\n` +
      `*Delivery:* $${deliveryCost.toFixed(2)}\n` +
      `*Total:* $${total.toFixed(2)}\n\n` +
      `${notas ? `*Notas:* ${notas}\n\n` : ''}` +
      `*Sabores:* ${flavorList || 'Por definir'}`
    );

    window.open(`https://wa.me/50379383084?text=${message}`, '_blank');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartItemsCount');
    toast({ title: 'Pedido enviado', description: 'Tu pedido se abrió en WhatsApp. Completa el envío del mensaje.' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={count} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver al carrito
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Finalizar Pedido</h1>

        <form onSubmit={(e) => { e.preventDefault(); handleWhatsAppOrder(); }} className="space-y-8">
          {/* Order summary */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4">Resumen ({count} paquetes)</h2>
            {items.map(item => (
              <div key={item.id} className="mb-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{item.nombre} x{item.quantity}</span>
                  <span>${(item.precio * item.quantity).toFixed(2)}</span>
                </div>
                {item.sabores && item.sabores.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">Sabores: {item.sabores.join(', ')}</p>
                )}
              </div>
            ))}
            <div className="border-t border-border mt-4 pt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${deliveryCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
            <h2 className="font-bold text-lg">Tus Datos</h2>
            <div><Label>Nombre *</Label><Input value={nombre} onChange={e => setNombre(e.target.value)} required /></div>
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><Label>Teléfono (WhatsApp) *</Label><Input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+503" required /></div>
          </div>

          {/* Delivery zone */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Truck className="w-5 h-5" /> Zona de Delivery</h2>
            <RadioGroup value={zona} onValueChange={v => setZona(v as DeliveryZone)} className="gap-4">
              {Object.entries(DELIVERY_ZONES).map(([key, zone]) => (
                <div key={key} className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${zona === key ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value={key} id={key} className="mt-1" />
                  <Label htmlFor={key} className="cursor-pointer flex-1">
                    <span className="font-medium">{zone.label}</span>
                    <span className="block text-sm text-muted-foreground">Mín ${zone.minimo.toFixed(2)} + ${zone.costo.toFixed(2)} delivery</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-4 space-y-3 pl-8">
              <div><Label>Dirección de entrega</Label><Input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle, colonia, número..." /></div>
              <div><Label>Referencia</Label><Input value={referencia} onChange={e => setReferencia(e.target.value)} placeholder="Punto de referencia" /></div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Método de Pago</h2>
            <RadioGroup value={metodoPago} onValueChange={setMetodoPago} className="gap-4">
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${metodoPago === pm.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value={pm.value} id={pm.value} />
                  <Label htmlFor={pm.value} className="cursor-pointer">
                    <span className="font-medium">{pm.label}</span>
                    <span className="block text-sm text-muted-foreground">{pm.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notes */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <Label>Notas adicionales</Label>
            <Input value={notas} onChange={e => setNotas(e.target.value)} placeholder="Instrucciones especiales, sabores extra..." className="mt-2" />
          </div>

          {/* Minimum order warning */}
          {belowMinimum && (
            <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-800 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Pedido mínimo de ${deliveryMin.toFixed(2)} para {DELIVERY_ZONES[zona].label}. Agrega más paquetes o cambia de zona.</span>
            </div>
          )}

          <Button type="submit" disabled={loading || belowMinimum} className="w-full py-6 text-lg flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Pedir por WhatsApp — ${total.toFixed(2)}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Tu pedido se enviará por WhatsApp. Uno de nuestros agentes confirmará tu orden.
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
