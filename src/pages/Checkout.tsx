import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, ShoppingBag, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { wompiService } from '@/integrations/wompi';
import { orderService } from '@/integrations/supabase/orderService';
import { notificationService } from '@/integrations/supabase/notificationService';
import { supabase } from '@/integrations/supabase/client';

type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  talla?: string;
  image: string;
  quantity: number;
};

type DeliveryMethod = 'recoger' | 'domicilio';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoEntrega, setMetodoEntrega] = useState<DeliveryMethod>('recoger');
  const [direccion, setDireccion] = useState('');
  const [referencia, setReferencia] = useState('');
  const [notas, setNotas] = useState('');
  const [metodoPago, setMetodoPago] = useState('wompi');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setItems(saved);
    if (saved.length === 0) navigate('/cart');
  }, []);

  const subtotal = items.reduce((s, i) => s + i.precio * i.quantity, 0);
  const envio = metodoEntrega === 'domicilio' ? 3.00 : 0;
  const total = subtotal + envio;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !telefono) {
      toast({ title: 'Campos requeridos', description: 'Completa nombre, email y teléfono.', variant: 'destructive' });
      return;
    }
    if (metodoEntrega === 'domicilio' && !direccion) {
      toast({ title: 'Dirección requerida', description: 'Ingresa la dirección de entrega.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Create order via orderService if available, otherwise direct insert
      const orderData = {
        customer_name: nombre,
        customer_email: email,
        customer_phone: telefono,
        customer_address: metodoEntrega === 'domicilio' ? direccion : 'Recoger en tienda',
        product_id: items[0].id,
        talla_seleccionada: items[0].talla || null,
        quantity: count,
        total_amount: total,
        metodo_entrega: metodoEntrega,
        direccion_entrega: metodoEntrega === 'domicilio' ? { direccion, referencia } : {},
        notas_pedido: notas,
        status: 'pendiente',
        payment_method: metodoPago,
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Try to create Wompi payment link
      if (metodoPago === 'wompi') {
        try {
          const paymentResult = await wompiService.createPaymentLink({
            amount: total,
            reference: order.id,
            description: `Pedido Sorbe - ${nombre}`,
          });
          if (paymentResult?.url) {
            localStorage.setItem('currentOrderReference', order.id);
            window.location.href = paymentResult.url;
            return;
          }
        } catch (wompiErr) {
          console.error('Wompi error:', wompiErr);
        }
      }

      // Fallback: redirect to success
      toast({ title: 'Pedido creado', description: 'Tu pedido ha sido registrado.' });
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartItemsCount');
      navigate('/payment/success');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'No se pudo procesar el pedido.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={count} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver al carrito
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Finalizar Pedido</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Order summary */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Resumen ({count} items)</h2>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.nombre} {item.talla ? `(${item.talla})` : ''} x{item.quantity}</span>
                  <span className="font-medium">${(item.precio * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Envío</span><span>{envio > 0 ? `$${envio.toFixed(2)}` : 'Gratis'}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
            <h2 className="font-bold text-lg">Tus Datos</h2>
            <div>
              <Label htmlFor="nombre">Nombre completo *</Label>
              <Input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+503 ---- ----" required />
            </div>
          </div>

          {/* Delivery method */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Truck className="w-5 h-5" /> Método de Entrega</h2>
            <RadioGroup value={metodoEntrega} onValueChange={v => setMetodoEntrega(v as DeliveryMethod)} className="gap-4">
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${metodoEntrega === 'recoger' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <RadioGroupItem value="recoger" id="recoger" />
                <Label htmlFor="recoger" className="cursor-pointer">
                  <span className="font-medium">Recoger en tienda</span>
                  <span className="block text-sm text-muted-foreground">Gratis — recoge tu pedido en nuestro local</span>
                </Label>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${metodoEntrega === 'domicilio' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <RadioGroupItem value="domicilio" id="domicilio" />
                <Label htmlFor="domicilio" className="cursor-pointer">
                  <span className="font-medium">Entrega a domicilio</span>
                  <span className="block text-sm text-muted-foreground">$3.00 — San Salvador y área metropolitana</span>
                </Label>
              </div>
            </RadioGroup>

            {metodoEntrega === 'domicilio' && (
              <div className="mt-4 space-y-3 pl-8">
                <div>
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input id="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle, colonia, número..." />
                </div>
                <div>
                  <Label htmlFor="referencia">Referencia</Label>
                  <Input id="referencia" value={referencia} onChange={e => setReferencia(e.target.value)} placeholder="Punto de referencia" />
                </div>
              </div>
            )}
          </div>

          {/* Payment method */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Método de Pago</h2>
            <RadioGroup value={metodoPago} onValueChange={setMetodoPago} className="gap-4">
              {[
                { value: 'wompi', label: 'Tarjeta (Wompi)', desc: 'Paga con tarjeta de crédito o débito' },
                { value: 'efectivo', label: 'Efectivo', desc: 'Paga al recibir o recoger tu pedido' },
                { value: 'transferencia', label: 'Transferencia', desc: 'Transferencia bancaria' },
              ].map(pm => (
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
            <Label htmlFor="notas">Notas adicionales</Label>
            <Textarea id="notas" value={notas} onChange={e => setNotas(e.target.value)} placeholder="Instrucciones especiales..." className="mt-2" />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-6 text-lg">
            {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
          </Button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
