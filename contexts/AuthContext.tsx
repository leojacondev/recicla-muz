import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

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
      // TODO: Implementar carregamento de sessão do AsyncStorage
      // Por enquanto, apenas simula carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
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
      // TODO: Salvar no AsyncStorage

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
      // TODO: Salvar no AsyncStorage

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
      // TODO: Limpar AsyncStorage
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signInWithGoogle,
        signInWithGitHub,
        signOut,
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
