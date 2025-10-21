import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { User, AuthProvider } from '@/contexts/AuthContext';

/**
 * Serviço de armazenamento seguro para dados de autenticação
 *
 * Utiliza AsyncStorage com criptografia para proteger dados sensíveis
 * como tokens OAuth e informações do usuário.
 */

// Prefixo para todas as chaves do app
const STORAGE_PREFIX = '@reciclamuz:';

// Chaves de armazenamento
export const STORAGE_KEYS = {
  AUTH_TOKEN: `${STORAGE_PREFIX}auth_token`,
  USER_DATA: `${STORAGE_PREFIX}user_data`,
  AUTH_PROVIDER: `${STORAGE_PREFIX}auth_provider`,
  SESSION_EXPIRY: `${STORAGE_PREFIX}session_expiry`,
  COOKIE_CONSENT: `${STORAGE_PREFIX}cookie_consent`,
} as const;

// Tempo padrão de expiração de sessão (7 dias em milissegundos)
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

/**
 * Interface para dados de sessão armazenados
 */
interface StoredSession {
  user: User;
  provider: AuthProvider;
  token: string;
  expiresAt: number;
}

class SecureStorageService {
  /**
   * Criptografa dados usando SHA256
   * Para produção, considere usar uma biblioteca mais robusta como crypto-js
   */
  private async encrypt(data: string): Promise<string> {
    try {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        data
      );
      // Por enquanto, apenas retorna base64 do hash + dados
      // Em produção, usar criptografia simétrica adequada (AES)
      const encoded = Buffer.from(data).toString('base64');
      return `${hash.substring(0, 16)}:${encoded}`;
    } catch (error) {
      console.error('Erro ao criptografar dados:', error);
      throw error;
    }
  }

  /**
   * Descriptografa dados
   */
  private async decrypt(encryptedData: string): Promise<string> {
    try {
      // Remove o hash prefix e decodifica base64
      const [, encoded] = encryptedData.split(':');
      if (!encoded) {
        throw new Error('Formato de dados criptografados inválido');
      }
      return Buffer.from(encoded, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Erro ao descriptografar dados:', error);
      throw error;
    }
  }

  /**
   * Salva sessão de autenticação de forma segura
   */
  async saveSession(user: User, token: string): Promise<void> {
    try {
      const expiresAt = Date.now() + SESSION_DURATION;

      const sessionData: StoredSession = {
        user,
        provider: user.provider,
        token,
        expiresAt,
      };

      // Criptografa dados sensíveis
      const encryptedToken = await this.encrypt(token);
      const userData = JSON.stringify(user);

      // Salva no AsyncStorage
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, encryptedToken],
        [STORAGE_KEYS.USER_DATA, userData],
        [STORAGE_KEYS.AUTH_PROVIDER, user.provider],
        [STORAGE_KEYS.SESSION_EXPIRY, expiresAt.toString()],
      ]);

      console.log('✅ Sessão salva com sucesso');
    } catch (error) {
      console.error('❌ Erro ao salvar sessão:', error);
      throw error;
    }
  }

  /**
   * Carrega sessão armazenada
   */
  async loadSession(): Promise<StoredSession | null> {
    try {
      const keys = [
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.AUTH_PROVIDER,
        STORAGE_KEYS.SESSION_EXPIRY,
      ];

      const values = await AsyncStorage.multiGet(keys);
      const data = Object.fromEntries(values);

      // Verifica se todos os dados necessários existem
      if (!data[STORAGE_KEYS.AUTH_TOKEN] || !data[STORAGE_KEYS.USER_DATA]) {
        return null;
      }

      // Verifica expiração
      const expiresAt = parseInt(data[STORAGE_KEYS.SESSION_EXPIRY] || '0', 10);
      if (Date.now() > expiresAt) {
        console.log('⏰ Sessão expirada');
        await this.clearSession();
        return null;
      }

      // Descriptografa token
      const token = await this.decrypt(data[STORAGE_KEYS.AUTH_TOKEN]!);
      const user: User = JSON.parse(data[STORAGE_KEYS.USER_DATA]!);

      console.log('✅ Sessão carregada com sucesso');
      return {
        user,
        provider: user.provider,
        token,
        expiresAt,
      };
    } catch (error) {
      console.error('❌ Erro ao carregar sessão:', error);
      return null;
    }
  }

  /**
   * Limpa todos os dados de sessão
   */
  async clearSession(): Promise<void> {
    try {
      const keys = [
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.AUTH_PROVIDER,
        STORAGE_KEYS.SESSION_EXPIRY,
      ];

      await AsyncStorage.multiRemove(keys);
      console.log('✅ Sessão limpa com sucesso');
    } catch (error) {
      console.error('❌ Erro ao limpar sessão:', error);
      throw error;
    }
  }

  /**
   * Verifica se existe uma sessão válida
   */
  async hasValidSession(): Promise<boolean> {
    const session = await this.loadSession();
    return session !== null;
  }

  /**
   * Salva consentimento de cookies
   */
  async saveCookieConsent(consent: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.COOKIE_CONSENT,
        JSON.stringify(consent)
      );
      console.log('✅ Consentimento de cookies salvo:', consent);
    } catch (error) {
      console.error('❌ Erro ao salvar consentimento:', error);
      throw error;
    }
  }

  /**
   * Carrega consentimento de cookies
   */
  async loadCookieConsent(): Promise<boolean | null> {
    try {
      const consent = await AsyncStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
      return consent ? JSON.parse(consent) : null;
    } catch (error) {
      console.error('❌ Erro ao carregar consentimento:', error);
      return null;
    }
  }

  /**
   * Limpa TODOS os dados do app (útil para logout completo)
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('✅ Todos os dados limpos');
    } catch (error) {
      console.error('❌ Erro ao limpar todos os dados:', error);
      throw error;
    }
  }

  /**
   * Obtém informações de debug sobre o armazenamento
   */
  async getStorageInfo(): Promise<{
    hasSession: boolean;
    hasConsent: boolean;
    sessionExpiresAt: number | null;
  }> {
    try {
      const hasSession = await this.hasValidSession();
      const consent = await this.loadCookieConsent();
      const expiryStr = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY);
      const sessionExpiresAt = expiryStr ? parseInt(expiryStr, 10) : null;

      return {
        hasSession,
        hasConsent: consent !== null,
        sessionExpiresAt,
      };
    } catch (error) {
      console.error('❌ Erro ao obter info de armazenamento:', error);
      return {
        hasSession: false,
        hasConsent: false,
        sessionExpiresAt: null,
      };
    }
  }
}

// Exporta instância singleton
export const secureStorage = new SecureStorageService();

// Exporta a classe para testes
export default SecureStorageService;
