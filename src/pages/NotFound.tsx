import { useLocation, useNavigate } from "react-router-dom";
import { IceCream } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <IceCream className="w-20 h-20 mx-auto mb-4 text-sorbe-strawberry opacity-50" />
        <h1 className="text-6xl font-black text-sorbe-chocolate mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Página no encontrada</p>
        <p className="text-sm text-muted-foreground mb-6">
          La ruta <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{location.pathname}</code> no existe.
        </p>
        <button onClick={() => navigate('/')}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
