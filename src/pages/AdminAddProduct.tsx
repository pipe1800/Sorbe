import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, Plus, X } from 'lucide-react';

type CategoryRow = { id: string; nombre: string; slug: string };

const FLAVOR_OPTIONS = ['frutal', 'cremoso', 'chocolate', 'citrico', 'tropical', 'herbal'];
const DIET_OPTIONS = ['vegano', 'sin_gluten', 'sin_azucar', 'sin_lactosa'];

const AdminAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  useEffect(() => { if (!admin) navigate('/admin'); }, [admin, navigate]);

  const [formData, setFormData] = useState({
    sku: '', nombre: '', descripcion: '', precio: '', precio_original: '',
    ingredientes: '', stock_count: '50', es_temporal: false, is_new: false, is_on_sale: false,
  });
  const [perfilSabor, setPerfilSabor] = useState<string[]>([]);
  const [infoDietetica, setInfoDietetica] = useState<Record<string, boolean>>({});
  const [tallas, setTallas] = useState<{ nombre: string; modificador_precio: number }[]>([
    { nombre: 'Chico', modificador_precio: 0 },
  ]);
  const [alergenos, setAlergenos] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    supabase.from('categories').select('id,nombre,slug').eq('is_active', true).then(({ data }) => setCategories(data || []));
  }, []);

  const toggleFlavor = (f: string) => setPerfilSabor(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleDiet = (d: string) => setInfoDietetica(prev => ({ ...prev, [d]: !prev[d] }));

  const addTalla = () => setTallas(prev => [...prev, { nombre: '', modificador_precio: 0 }]);
  const removeTalla = (i: number) => setTallas(prev => prev.filter((_, idx) => idx !== i));
  const updateTalla = (i: number, field: string, value: string | number) => {
    setTallas(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.sku) return;
    setIsLoading(true);

    const { error } = await supabase.from('products').insert({
      sku: formData.sku,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      precio_original: formData.precio_original ? parseFloat(formData.precio_original) : null,
      perfil_sabor: perfilSabor,
      info_dietetica: infoDietetica,
      opciones_talla: tallas.filter(t => t.nombre),
      es_temporal: formData.es_temporal,
      alergenos: alergenos ? alergenos.split(',').map(s => s.trim()) : [],
      ingredientes: formData.ingredientes,
      is_new: formData.is_new,
      is_on_sale: formData.is_on_sale,
      in_stock: true,
      stock_count: parseInt(formData.stock_count) || 0,
      image_urls: imageUrls,
    });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      navigate('/admin/dashboard');
    }
    setIsLoading(false);
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver al dashboard
        </button>

        <h1 className="text-3xl font-bold mb-8">Agregar Producto</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <Card>
            <CardHeader><CardTitle>Información Básica</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>SKU *</Label><Input value={formData.sku} onChange={e => setFormData(p => ({ ...p, sku: e.target.value }))} placeholder="SOR-XXX-001" required /></div>
                <div><Label>Nombre *</Label><Input value={formData.nombre} onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))} placeholder="Paleta de..." required /></div>
              </div>
              <div><Label>Descripción</Label><Textarea value={formData.descripcion} onChange={e => setFormData(p => ({ ...p, descripcion: e.target.value }))} rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Precio *</Label><Input type="number" step="0.01" value={formData.precio} onChange={e => setFormData(p => ({ ...p, precio: e.target.value }))} placeholder="2.50" required /></div>
                <div><Label>Precio Original</Label><Input type="number" step="0.01" value={formData.precio_original} onChange={e => setFormData(p => ({ ...p, precio_original: e.target.value }))} placeholder="3.00" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Stock</Label><Input type="number" value={formData.stock_count} onChange={e => setFormData(p => ({ ...p, stock_count: e.target.value }))} /></div>
                <div><Label>Categoría</Label>
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-background">
                    <option value="">Seleccionar...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2"><Switch checked={formData.is_new} onCheckedChange={v => setFormData(p => ({ ...p, is_new: v }))} /><Label>Nuevo</Label></div>
                <div className="flex items-center gap-2"><Switch checked={formData.is_on_sale} onCheckedChange={v => setFormData(p => ({ ...p, is_on_sale: v }))} /><Label>En Oferta</Label></div>
                <div className="flex items-center gap-2"><Switch checked={formData.es_temporal} onCheckedChange={v => setFormData(p => ({ ...p, es_temporal: v }))} /><Label>Temporal</Label></div>
              </div>
            </CardContent>
          </Card>

          {/* Flavor + Dietary */}
          <Card>
            <CardHeader><CardTitle>Perfil de Sabor & Dieta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Perfil de Sabor</Label>
                <div className="flex flex-wrap gap-2">
                  {FLAVOR_OPTIONS.map(f => (
                    <button key={f} type="button" onClick={() => toggleFlavor(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${perfilSabor.includes(f) ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border hover:border-primary/50'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Información Dietética</Label>
                <div className="flex flex-wrap gap-2">
                  {DIET_OPTIONS.map(d => (
                    <button key={d} type="button" onClick={() => toggleDiet(d)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${infoDietetica[d] ? 'bg-sorbe-teal text-sorbe-blue border-sorbe-teal' : 'bg-muted border-border hover:border-sorbe-teal/50'}`}>
                      {d.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Alérgenos (separados por coma)</Label>
                <Input value={alergenos} onChange={e => setAlergenos(e.target.value)} placeholder="lacteos, nueces, huevo" />
              </div>
              <div>
                <Label>Ingredientes</Label>
                <Textarea value={formData.ingredientes} onChange={e => setFormData(p => ({ ...p, ingredientes: e.target.value }))} rows={2} placeholder="Leche entera, azúcar, vainilla..." />
              </div>
            </CardContent>
          </Card>

          {/* Tallas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Opciones de Talla</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addTalla}><Plus className="w-4 h-4 mr-1" /> Agregar</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tallas.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input value={t.nombre} onChange={e => updateTalla(i, 'nombre', e.target.value)} placeholder="Chico / Mediano / Grande" className="flex-1" />
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm">+$</span>
                      <Input type="number" step="0.01" value={t.modificador_precio} onChange={e => updateTalla(i, 'modificador_precio', parseFloat(e.target.value) || 0)} className="w-20" />
                    </div>
                    {tallas.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeTalla(i)}><X className="w-4 h-4" /></Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader><CardTitle>Imágenes</CardTitle></CardHeader>
            <CardContent>
              <ImageUpload images={imageUrls} onChange={setImageUrls} />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg">
            {isLoading ? 'Guardando...' : 'Crear Producto'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
