import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup && segments[0] !== 'login') {
      // Redirecionar para login se não autenticado
      router.replace('/login');
    } else if (isAuthenticated && segments[0] === 'login') {
      // Redirecionar para home se já autenticado
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}