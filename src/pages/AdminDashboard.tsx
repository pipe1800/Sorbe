import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag, Package, DollarSign, TrendingUp,
  Plus, LogOut, Trash2, Edit, IceCream,
} from 'lucide-react';

type Product = {
  id: string; sku: string; nombre: string; precio: number;
  perfil_sabor?: string[]; es_temporal?: boolean;
  is_new?: boolean; is_on_sale?: boolean;
  in_stock?: boolean; stock_count?: number;
  image_urls?: string[]; created_at: string;
};

type Order = {
  id: string; customer_name: string; customer_phone?: string;
  total_amount: number; status: string; metodo_entrega?: string;
  payment_method?: string; payment_status?: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800', confirmado: 'bg-blue-100 text-blue-800',
  preparando: 'bg-purple-100 text-purple-800', listo: 'bg-green-100 text-green-800',
  entregado: 'bg-gray-100 text-gray-800', cancelado: 'bg-red-100 text-red-800',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();

  useEffect(() => { if (!admin) navigate('/admin'); }, [admin]);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, revenue: 0, pendingOrders: 0 });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data: p } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setProducts(p || []);
    setOrders(o || []);
    setStats({
      totalProducts: p?.length || 0,
      totalOrders: o?.length || 0,
      revenue: o?.reduce((s, ord) => s + (ord.total_amount || 0), 0) || 0,
      pendingOrders: o?.filter(ord => ord.status === 'pendiente' || ord.status === 'confirmado').length || 0,
    });
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchData();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <div className="bg-sorbe-chocolate text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <IceCream className="w-6 h-6 text-sorbe-strawberry" />
            <span className="font-bold text-lg">Sorbe Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white" onClick={() => navigate('/admin/add')}>
              <Plus className="w-4 h-4 mr-1" /> Nuevo Producto
            </Button>
            <Button variant="ghost" className="text-white" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Salir
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: 'Productos', value: stats.totalProducts, color: 'text-sorbe-mint' },
            { icon: ShoppingBag, label: 'Pedidos', value: stats.totalOrders, color: 'text-sorbe-strawberry' },
            { icon: DollarSign, label: 'Ingresos', value: `$${stats.revenue.toFixed(2)}`, color: 'text-sorbe-lemon' },
            { icon: TrendingUp, label: 'Pendientes', value: stats.pendingOrders, color: 'text-sorbe-raspberry' },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Productos ({products.length})</TabsTrigger>
            <TabsTrigger value="orders">Pedidos ({orders.length})</TabsTrigger>
          </TabsList>

          {/* Products tab */}
          <TabsContent value="products">
            <div className="space-y-3">
              {products.map(p => (
                <Card key={p.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={p.image_urls?.[0] || '/placeholder.svg'} alt={p.nombre}
                      className="w-16 h-16 rounded-lg object-cover bg-muted" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold truncate">{p.nombre}</h3>
                        {p.es_temporal && <Badge variant="destructive" className="text-xs">Temporal</Badge>}
                        {p.is_new && <Badge className="text-xs bg-sorbe-mint text-sorbe-chocolate">Nuevo</Badge>}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>SKU: {p.sku}</span>
                        <span>${p.precio?.toFixed(2)}</span>
                        <span>Stock: {p.stock_count}</span>
                        {p.perfil_sabor?.map(f => (
                          <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <IceCream className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p>No hay productos todavía.</p>
                  <Button className="mt-4" onClick={() => navigate('/admin/add')}>Crear Primer Producto</Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Orders tab */}
          <TabsContent value="orders">
            <div className="space-y-3">
              {orders.map(o => (
                <Card key={o.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{o.customer_name}</h3>
                        <p className="text-sm text-muted-foreground">{o.customer_phone} • {new Date(o.created_at).toLocaleDateString('es-SV')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${o.total_amount?.toFixed(2)}</p>
                        <Badge className={statusColors[o.status] || ''}>{o.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>Entrega: {o.metodo_entrega || 'recoger'}</span>
                      <span>•</span>
                      <span>Pago: {o.payment_method || 'wompi'}</span>
                      <span>•</span>
                      <span>{o.payment_status || 'pending'}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['confirmado', 'preparando', 'listo', 'entregado', 'cancelado'].map(s => (
                        <Button key={s} variant={o.status === s ? 'default' : 'outline'} size="sm"
                          onClick={() => updateOrderStatus(o.id, s)} disabled={o.status === 'entregado' || o.status === 'cancelado'}>
                          {s}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p>No hay pedidos todavía.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
