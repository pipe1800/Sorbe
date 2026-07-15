import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/hooks/useAdmin";
import { useMetaPixel } from "@/integrations/meta/useMetaPixel";
import WhatsAppButton from "@/components/BotonWhatsApp";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Nosotros from "./pages/Nosotros";
import Sabores from "./pages/Sabores";
import Contacto from "./pages/Contacto";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppInner = () => {
  useMetaPixel();

  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/sabores" element={<Sabores />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AdminAddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
    </AdminProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
