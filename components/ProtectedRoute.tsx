import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Lista de rotas que REQUEREM autenticação
    const protectedRoutes = ['profile', 'settings'];
    const currentRoute = segments[0];

    // Se tentar acessar rota protegida sem estar autenticado, redireciona para login
    if (!isAuthenticated && protectedRoutes.includes(currentRoute)) {
      router.replace('/login');
    }
    // Se já estiver autenticado e tentar acessar login, volta para home
    else if (isAuthenticated && currentRoute === 'login') {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}