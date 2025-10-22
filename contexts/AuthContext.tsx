import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { secureStorage } from '@/services/SecureStorage';

// Completar warm-up do navegador para melhor UX em OAuth
WebBrowser.maybeCompleteAuthSession();

// Tipos de provedores OAuth suportados
export type AuthProvider = 'google' | 'github';

// Dados do usuário após autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: AuthProvider;
}

// Interface do contexto de autenticação
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configurações OAuth - serão movidas para variáveis de ambiente posteriormente
const OAUTH_CONFIG = {
  google: {
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'reciclamuz',
      path: 'auth/google',
    }),
  },
  github: {
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID || '',
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'reciclamuz',
      path: 'auth/github',
    }),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se existe sessão salva ao iniciar o app
  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      setIsLoading(true);
      const session = await secureStorage.loadSession();

      if (session) {
        console.log('✅ Sessão restaurada:', session.user.name);
        setUser(session.user);
      } else {
        console.log('ℹ️ Nenhuma sessão encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar sessão:', error);
      await secureStorage.clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      // Configuração do discovery document do Google
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      };

      // Criar request de autenticação
      const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
          clientId: OAUTH_CONFIG.google.clientId,
          scopes: ['openid', 'profile', 'email'],
          redirectUri: OAUTH_CONFIG.google.redirectUri,
        },
        discovery
      );

      // TODO: Implementar fluxo OAuth completo
      console.log('Google OAuth iniciado');

      // Mock de usuário para desenvolvimento
      const mockUser: User = {
        id: 'google_123',
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        avatar: 'https://via.placeholder.com/150',
        provider: 'google',
      };

      setUser(mockUser);

      // Salvar sessão no armazenamento seguro
      const mockToken = `google_token_${Date.now()}`;
      await secureStorage.saveSession(mockUser, mockToken);
      console.log('✅ Login com Google realizado e sessão salva');

    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    try {
      setIsLoading(true);

      // Configuração do discovery document do GitHub
      const discovery = {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
      };

      // TODO: Implementar fluxo OAuth completo
      console.log('GitHub OAuth iniciado');

      // Mock de usuário para desenvolvimento
      const mockUser: User = {
        id: 'github_456',
        name: 'Usuário GitHub',
        email: 'usuario@github.com',
        avatar: 'https://via.placeholder.com/150',
        provider: 'github',
      };

      setUser(mockUser);

      // Salvar sessão no armazenamento seguro
      const mockToken = `github_token_${Date.now()}`;
      await secureStorage.saveSession(mockUser, mockToken);
      console.log('✅ Login com GitHub realizado e sessão salva');

    } catch (error) {
      console.error('Erro no login com GitHub:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await secureStorage.clearSession();
      setUser(null);
      console.log('✅ Logout realizado e sessão limpa');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const session = await secureStorage.loadSession();

      if (!session) {
        console.log('⚠️ Nenhuma sessão para renovar');
        return;
      }

      // Verificar se a sessão está próxima de expirar (< 24 horas)
      const timeUntilExpiry = session.expiresAt - Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000;

      if (timeUntilExpiry < oneDayInMs) {
        console.log('🔄 Renovando sessão...');

        // Gerar novo token (em produção, isso seria feito via API)
        const newToken = `${session.provider}_refreshed_${Date.now()}`;

        // Salvar nova sessão
        await secureStorage.saveSession(session.user, newToken);
        console.log('✅ Sessão renovada com sucesso');
      } else {
        console.log('✓ Sessão ainda válida');
      }
    } catch (error) {
      console.error('❌ Erro ao renovar sessão:', error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  // Verificar e renovar sessão periodicamente
  useEffect(() => {
    if (!user) return;

    // Verificar a cada 1 hora
    const intervalId = setInterval(() => {
      refreshSession();
    }, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signInWithGoogle,
        signInWithGitHub,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
