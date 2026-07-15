import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, MapPin, Menu, Search, IceCream } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Header = ({ cartItemsCount = 0, onCartClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [categories, setCategories] = React.useState<{ name: string; subcategories: string[] }[]>([]);

  React.useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id,nombre,slug,parent_id,sort_order,is_active')
        .eq('is_active', true);
      if (!data) return;
      const parents = data.filter((c: any) => !c.parent_id).sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      const childrenGrouped: Record<string, string[]> = {};
      data.filter((c: any) => c.parent_id).forEach((c: any) => {
        const parent = data.find((p: any) => p.id === c.parent_id);
        if (!parent) return;
        if (!childrenGrouped[parent.nombre]) childrenGrouped[parent.nombre] = [];
        childrenGrouped[parent.nombre].push(c.nombre);
      });
      setCategories(parents.map((p: any) => ({ name: p.nombre, subcategories: childrenGrouped[p.nombre] || [] })));
    };
    loadCategories();
  }, []);

  const handleCartClick = () => { onCartClick?.(); navigate('/cart'); };
  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const navLinks = [
    { label: 'Menú', href: '/products' },
    { label: 'Sabores', href: '/sabores' },
    { label: 'Nosotros', href: '/nosotros' },
  ];

  return (
    <header className="bg-sorbe-primary text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-sorbe-blue py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <a href="https://wa.me/503" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-sorbe-light transition-colors">
              <Phone className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Entrega en todo El Salvador
            </span>
          </div>
          <span>🍦 Hechos al momento</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Menu className="w-5 h-5" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 border-b"><SheetTitle>Menú</SheetTitle></SheetHeader>
                <div className="p-4 space-y-3">
                  <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate(`/products?search=${encodeURIComponent(query)}`); }}>
                    <div className="flex gap-2">
                      <input type="search" placeholder="Buscar sabores..." value={query} onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground" />
                      <button type="submit" className="bg-primary text-primary-foreground px-3 py-2 rounded-lg"><Search className="w-4 h-4" /></button>
                    </div>
                  </form>
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <button onClick={() => navigate(link.href)} className="block w-full text-left py-2 text-foreground hover:text-primary font-medium">{link.label}</button>
                    </SheetClose>
                  ))}
                  <hr />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Categorías</p>
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <SheetClose asChild>
                        <button onClick={() => handleCategoryClick(cat.name)} className="block w-full text-left py-1.5 font-medium hover:text-primary">{cat.name}</button>
                      </SheetClose>
                      {cat.subcategories.map((sub) => (
                        <SheetClose key={sub} asChild>
                          <button onClick={() => handleCategoryClick(sub)} className="block w-full text-left py-1 pl-4 text-sm text-muted-foreground hover:text-primary">{sub}</button>
                        </SheetClose>
                      ))}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => navigate(link.href)} className="text-white/80 hover:text-white font-medium transition-colors">{link.label}</button>
            ))}
            {/* Desktop category dropdown */}
            <div className="relative group">
              <button className="text-white/80 hover:text-white font-medium transition-colors flex items-center gap-1">
                Categorías <svg className="w-3 h-3" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </button>
              <div className="absolute top-full left-0 mt-2 bg-white text-sorbe-blue rounded-xl shadow-xl p-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {categories.map((cat) => (
                  <div key={cat.name} className="mb-3 last:mb-0">
                    <button onClick={() => handleCategoryClick(cat.name)} className="font-semibold text-sm hover:text-primary w-full text-left">{cat.name}</button>
                    {cat.subcategories.map((sub) => (
                      <button key={sub} onClick={() => handleCategoryClick(sub)} className="block text-sm text-muted-foreground hover:text-primary pl-3 py-0.5 w-full text-left">{sub}</button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <IceCream className="w-8 h-8 sm:w-10 sm:h-10 text-sorbe-primary" />
            <span className="text-white font-bold text-xl sm:text-2xl">Sorbe</span>
          </button>

          {/* Cart */}
          <button onClick={handleCartClick}
            className="relative bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Carrito</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
