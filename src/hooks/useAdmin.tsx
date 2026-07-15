
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('admin_session');
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Try edge function first, fall back to direct DB query
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-auth', {
        body: { email, password, action: 'login' }
      });

      if (!edgeError && edgeData?.success) {
        const adminUser = { id: edgeData.admin.id, email: edgeData.admin.email };
        setAdmin(adminUser);
        localStorage.setItem('admin_session', JSON.stringify(adminUser));
        return { success: true };
      }

      // Fallback: direct DB query for local dev
      const { data: adminRow, error: dbError } = await supabase
        .from('admin_users')
        .select('id, email, password_hash')
        .eq('email', email)
        .single();

      if (dbError || !adminRow) {
        return { success: false, error: 'Credenciales inválidas' };
      }

      if (password !== adminRow.password_hash) {
        return { success: false, error: 'Credenciales inválidas' };
      }

      const adminUser = { id: adminRow.id, email: adminRow.email };
      setAdmin(adminUser);
      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
  };

  return (
    <AdminContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
