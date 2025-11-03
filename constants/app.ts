/**
 * Application Constants
 *
 * Centralized configuration values and constants used throughout the app.
 * This approach makes it easier to maintain and update configuration values.
 */

/**
 * Application Information
 */
export const APP_INFO = {
  name: 'ReciclaMuz',
  version: '1.0.0',
  description: 'Pontos de coleta de lixo em Muzambinho-MG',
  website: 'https://github.com/leojacondev/recicla-muz',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

/**
 * Map Configuration
 */
export const MAP_CONFIG = {
  defaultCenter: {
    latitude: -21.3729, // Muzambinho, MG coordinates
    longitude: -46.5258,
  },
  defaultZoom: 14,
  minZoom: 10,
  maxZoom: 20,
} as const;

/**
 * Theme Colors
 */
export const COLORS = {
  primary: '#2d5016',
  secondary: '#4caf50',
  success: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#3498db',
  dark: '#1a1a1a',
  light: '#f8f9fa',
  gray: '#666',
  border: '#e0e0e0',
  white: '#ffffff',
  black: '#000000',
} as const;

/**
 * Validation Rules
 */
export const VALIDATION = {
  email: {
    maxLength: 255,
  },
  password: {
    minLength: 8,
    maxLength: 128,
  },
  name: {
    minLength: 2,
    maxLength: 100,
  },
  phone: {
    minLength: 10,
    maxLength: 11,
  },
  cep: {
    length: 8,
  },
  description: {
    maxLength: 500,
  },
} as const;

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  authToken: '@reciclamuz:auth_token',
  user: '@reciclamuz:user',
  theme: '@reciclamuz:theme',
  cookieConsent: '@reciclamuz:cookie_consent',
  onboardingComplete: '@reciclamuz:onboarding_complete',
} as const;

/**
 * OAuth Providers
 */
export const OAUTH_PROVIDERS = {
  google: {
    name: 'Google',
    color: '#4285F4',
  },
  github: {
    name: 'GitHub',
    color: '#24292e',
  },
} as const;

/**
 * Waste Types
 */
export const WASTE_TYPES = {
  plastic: {
    name: 'Plástico',
    color: '#e74c3c',
    icon: 'trash',
  },
  paper: {
    name: 'Papel',
    color: '#3498db',
    icon: 'document',
  },
  glass: {
    name: 'Vidro',
    color: '#2ecc71',
    icon: 'wine',
  },
  metal: {
    name: 'Metal',
    color: '#f39c12',
    icon: 'construct',
  },
  organic: {
    name: 'Orgânico',
    color: '#8e44ad',
    icon: 'leaf',
  },
  electronic: {
    name: 'Eletrônico',
    color: '#16a085',
    icon: 'laptop',
  },
  battery: {
    name: 'Bateria',
    color: '#e67e22',
    icon: 'battery-charging',
  },
  oil: {
    name: 'Óleo',
    color: '#95a5a6',
    icon: 'water',
  },
} as const;

/**
 * Navigation Routes
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  profile: '/profile',
  map: '/map',
  policies: {
    index: '/politicas',
    privacy: '/politicas/privacidade',
    cookies: '/politicas/cookies',
    terms: '/politicas/termos',
  },
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  network: 'Erro de conexão. Verifique sua internet.',
  timeout: 'A requisição excedeu o tempo limite.',
  unauthorized: 'Você não tem permissão para acessar este recurso.',
  notFound: 'Recurso não encontrado.',
  serverError: 'Erro no servidor. Tente novamente mais tarde.',
  validation: 'Erro de validação. Verifique os dados informados.',
  generic: 'Ocorreu um erro inesperado.',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  login: 'Login realizado com sucesso!',
  logout: 'Logout realizado com sucesso!',
  saved: 'Dados salvos com sucesso!',
  deleted: 'Item removido com sucesso!',
  updated: 'Dados atualizados com sucesso!',
} as const;

/**
 * Timeouts and Delays
 */
export const TIMING = {
  toastDuration: 3000, // 3 seconds
  splashDuration: 2000, // 2 seconds
  debounceDelay: 300, // 300ms
  animationDuration: 300, // 300ms
} as const;

/**
 * Feature Flags
 */
export const FEATURES = {
  enableNotifications: false,
  enableGamification: false,
  enableDarkMode: true,
  enableOfflineMode: false,
  enableAnalytics: false,
} as const;
