import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tipos de cookies disponíveis no aplicativo
 */
export type CookieType = 'essential' | 'preferences' | 'analytics';

/**
 * Preferências de cookies do usuário
 */
export interface CookiePreferences {
  essential: boolean;        // Sempre true (obrigatório)
  preferences: boolean;      // Tema, favoritos, etc
  analytics: boolean;        // Estatísticas de uso
}

/**
 * Estado do consentimento de cookies
 */
interface CookieConsentState {
  hasConsent: boolean;                                    // Se já deu consentimento
  showBanner: boolean;                                    // Se deve mostrar o banner
  preferences: CookiePreferences;                         // Preferências atuais
  acceptAll: () => Promise<void>;                         // Aceitar todos os cookies
  acceptEssentialOnly: () => Promise<void>;               // Apenas essenciais
  updatePreferences: (prefs: Partial<CookiePreferences>) => Promise<void>;  // Personalizar
  resetConsent: () => Promise<void>;                      // Limpar consentimento
  isLoading: boolean;                                     // Estado de carregamento
}

/**
 * Chaves de armazenamento
 */
const STORAGE_KEYS = {
  CONSENT: '@reciclamuz:cookie_consent',
  PREFERENCES: '@reciclamuz:cookie_preferences',
  CONSENT_DATE: '@reciclamuz:cookie_consent_date',
};

/**
 * Preferências padrão (apenas essenciais)
 */
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,      // Sempre true
  preferences: false,
  analytics: false,
};

const CookieConsentContext = createContext<CookieConsentState | undefined>(undefined);

/**
 * Provider do contexto de consentimento de cookies
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Carrega o consentimento ao iniciar o app
   */
  useEffect(() => {
    loadConsent();
  }, []);

  /**
   * Carrega consentimento do AsyncStorage
   */
  const loadConsent = async () => {
    try {
      setIsLoading(true);

      const [consentValue, preferencesValue] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CONSENT),
        AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES),
      ]);

      if (consentValue === 'true') {
        setHasConsent(true);
        setShowBanner(false);

        // Carrega preferências salvas
        if (preferencesValue) {
          const savedPrefs = JSON.parse(preferencesValue);
          setPreferences({
            essential: true, // Sempre true
            preferences: savedPrefs.preferences ?? false,
            analytics: savedPrefs.analytics ?? false,
          });
        }
      } else {
        // Primeira vez ou sem consentimento
        setHasConsent(false);
        setShowBanner(true);
        setPreferences(DEFAULT_PREFERENCES);
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error);
      // Em caso de erro, mostra o banner
      setShowBanner(true);
      setHasConsent(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Salva o consentimento no AsyncStorage
   */
  const saveConsent = async (prefs: CookiePreferences) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.CONSENT, 'true'],
        [STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs)],
        [STORAGE_KEYS.CONSENT_DATE, new Date().toISOString()],
      ]);

      setHasConsent(true);
      setShowBanner(false);
      setPreferences(prefs);

      console.log('Cookie consent saved:', prefs);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
      throw error;
    }
  };

  /**
   * Aceita todos os cookies
   */
  const acceptAll = async () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      preferences: true,
      analytics: true,
    };

    await saveConsent(allAccepted);
  };

  /**
   * Aceita apenas cookies essenciais
   */
  const acceptEssentialOnly = async () => {
    await saveConsent(DEFAULT_PREFERENCES);
  };

  /**
   * Atualiza preferências personalizadas
   */
  const updatePreferences = async (partialPrefs: Partial<CookiePreferences>) => {
    const newPreferences: CookiePreferences = {
      essential: true, // Sempre true
      preferences: partialPrefs.preferences ?? preferences.preferences,
      analytics: partialPrefs.analytics ?? preferences.analytics,
    };

    await saveConsent(newPreferences);
  };

  /**
   * Reseta o consentimento (para testes ou se usuário quiser mudar)
   */
  const resetConsent = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.CONSENT,
        STORAGE_KEYS.PREFERENCES,
        STORAGE_KEYS.CONSENT_DATE,
      ]);

      setHasConsent(false);
      setShowBanner(true);
      setPreferences(DEFAULT_PREFERENCES);

      console.log('Cookie consent reset');
    } catch (error) {
      console.error('Error resetting cookie consent:', error);
      throw error;
    }
  };

  const value: CookieConsentState = {
    hasConsent,
    showBanner,
    preferences,
    acceptAll,
    acceptEssentialOnly,
    updatePreferences,
    resetConsent,
    isLoading,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

/**
 * Hook para usar o contexto de consentimento de cookies
 *
 * @example
 * const { hasConsent, preferences, acceptAll } = useCookieConsent();
 */
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }

  return context;
}

/**
 * Helper: Verifica se um tipo específico de cookie está habilitado
 *
 * @example
 * const canUseAnalytics = isCookieEnabled(preferences, 'analytics');
 */
export function isCookieEnabled(
  preferences: CookiePreferences,
  cookieType: CookieType
): boolean {
  return preferences[cookieType] === true;
}