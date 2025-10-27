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

// Configurações OAuth
const OAUTH_CONFIG = {
  google: {
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    // Para web/desenvolvimento, usar localhost que já está configurado
    redirectUri: 'http://localhost:19006/auth/google',
    scopes: ['openid', 'profile', 'email'],
  },
  github: {
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID || '',
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'reciclamuz',
      path: 'auth/github',
    }),
    scopes: ['read:user', 'user:email'],
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Discovery endpoints
  const googleDiscovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const githubDiscovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  };

  // Hooks do AuthSession (devem estar no corpo do componente)
  const [googleRequest, googleResponse, googlePromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: OAUTH_CONFIG.google.clientId,
      scopes: OAUTH_CONFIG.google.scopes,
      redirectUri: OAUTH_CONFIG.google.redirectUri,
    },
    googleDiscovery
  );

  const [githubRequest, githubResponse, githubPromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: OAUTH_CONFIG.github.clientId,
      scopes: OAUTH_CONFIG.github.scopes,
      redirectUri: OAUTH_CONFIG.github.redirectUri,
    },
    githubDiscovery
  );

  // Verificar se existe sessão salva ao iniciar o app
  useEffect(() => {
    loadStoredSession();
  }, []);

  // Processar resposta do Google OAuth
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      handleGoogleSuccess(googleResponse);
    } else if (googleResponse?.type === 'error') {
      console.error('❌ Erro no Google OAuth:', googleResponse.error);
    }
  }, [googleResponse]);

  // Processar resposta do GitHub OAuth
  useEffect(() => {
    if (githubResponse?.type === 'success') {
      handleGitHubSuccess(githubResponse);
    } else if (githubResponse?.type === 'error') {
      console.error('❌ Erro no GitHub OAuth:', githubResponse.error);
    }
  }, [githubResponse]);

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

  const handleGoogleSuccess = async (response: AuthSession.AuthSessionResult & { type: 'success' }) => {
    try {
      setIsLoading(true);
      console.log('🔐 Processando autenticação Google...');

      // Obter access token
      const { accessToken } = response.authentication!;

      // Buscar informações do usuário
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userInfo = await userInfoResponse.json();

      const googleUser: User = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        provider: 'google',
      };

      setUser(googleUser);
      await secureStorage.saveSession(googleUser, accessToken);
      console.log('✅ Login com Google realizado:', googleUser.name);
    } catch (error) {
      console.error('❌ Erro ao processar login do Google:', error);
      setUser(null);
      await secureStorage.clearSession();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSuccess = async (response: AuthSession.AuthSessionResult & { type: 'success' }) => {
    try {
      setIsLoading(true);
      console.log('🔐 Processando autenticação GitHub...');

      const { code } = response.params;

      // Trocar code por access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: OAUTH_CONFIG.github.clientId,
          client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: OAUTH_CONFIG.github.redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Buscar informações do usuário
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const userInfo = await userResponse.json();

      // Buscar emails (necessário pois alguns usuários têm email privado)
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const emails = await emailResponse.json();
      const primaryEmail = emails.find((e: any) => e.primary)?.email || userInfo.email;

      const githubUser: User = {
        id: userInfo.id.toString(),
        name: userInfo.name || userInfo.login,
        email: primaryEmail,
        avatar: userInfo.avatar_url,
        provider: 'github',
      };

      setUser(githubUser);
      await secureStorage.saveSession(githubUser, accessToken);
      console.log('✅ Login com GitHub realizado:', githubUser.name);
    } catch (error) {
      console.error('❌ Erro ao processar login do GitHub:', error);
      setUser(null);
      await secureStorage.clearSession();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (!OAUTH_CONFIG.google.clientId) {
        throw new Error('Client ID do Google não configurado');
      }
      console.log('🚀 Iniciando login com Google...');
      await googlePromptAsync();
    } catch (error) {
      console.error('❌ Erro ao iniciar login Google:', error);
      throw error;
    }
  };

  const signInWithGitHub = async () => {
    try {
      if (!OAUTH_CONFIG.github.clientId) {
        throw new Error('Client ID do GitHub não configurado');
      }
      console.log('🚀 Iniciando login com GitHub...');
      await githubPromptAsync();
    } catch (error) {
      console.error('❌ Erro ao iniciar login GitHub:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await secureStorage.clearSession();
      setUser(null);
      console.log('✅ Logout realizado');
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

      if (!session.user || !session.expiresAt) {
        console.error('❌ Sessão corrompida');
        await secureStorage.clearSession();
        setUser(null);
        return;
      }

      const timeUntilExpiry = session.expiresAt - Date.now();

      if (timeUntilExpiry < 0) {
        console.log('⏰ Sessão expirada');
        await secureStorage.clearSession();
        setUser(null);
        return;
      }

      if (timeUntilExpiry < 24 * 60 * 60 * 1000) {
        console.log('🔄 Sessão próxima de expirar, considere renovar');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar sessão:', error);
    }
  };

  const isAuthenticated = !!user;

  // Verificar sessão periodicamente
  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => {
      refreshSession();
    }, 60 * 60 * 1000); // 1 hora

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
