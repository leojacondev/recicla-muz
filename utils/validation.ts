/**
 * Validation Utilities
 *
 * Common validation functions for forms and user input.
 * These utilities help maintain data quality and provide
 * consistent error messages across the application.
 */

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates Brazilian phone number
 * Accepts formats: (11) 98765-4321, 11987654321, +5511987654321
 * @param phone - Phone string to validate
 * @returns true if phone is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;

  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Brazilian phone: 10 or 11 digits (with area code)
  // 11 digits for mobile (9 in front), 10 for landline
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Validates Brazilian CEP (postal code)
 * Accepts formats: 12345-678 or 12345678
 * @param cep - CEP string to validate
 * @returns true if CEP is valid, false otherwise
 */
export function isValidCEP(cep: string): boolean {
  if (!cep) return false;

  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
}

/**
 * Validates URL format
 * @param url - URL string to validate
 * @returns true if URL is valid, false otherwise
 */
export function isValidURL(url: string): boolean {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates required field (not empty)
 * @param value - Value to validate
 * @returns true if value is not empty, false otherwise
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validates minimum length
 * @param value - String to validate
 * @param minLength - Minimum required length
 * @returns true if string meets minimum length, false otherwise
 */
export function hasMinLength(value: string, minLength: number): boolean {
  if (!value) return false;
  return value.trim().length >= minLength;
}

/**
 * Validates maximum length
 * @param value - String to validate
 * @param maxLength - Maximum allowed length
 * @returns true if string doesn't exceed maximum length, false otherwise
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  if (!value) return true; // Empty string is valid
  return value.trim().length <= maxLength;
}

/**
 * Validates number range
 * @param value - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns true if number is within range, false otherwise
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates password strength
 * Requires: minimum 8 characters, at least one uppercase, one lowercase, one number
 * @param password - Password string to validate
 * @returns Object with isValid boolean and message string
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  if (!password) {
    return { isValid: false, message: 'Senha é obrigatória' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Senha deve ter no mínimo 8 caracteres' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Senha deve conter pelo menos uma letra maiúscula' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Senha deve conter pelo menos uma letra minúscula' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Senha deve conter pelo menos um número' };
  }

  return { isValid: true, message: 'Senha forte' };
}

/**
 * Validates coordinate values (latitude/longitude)
 * @param lat - Latitude value
 * @param lng - Longitude value
 * @returns true if coordinates are valid, false otherwise
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Sanitizes string input to prevent XSS attacks
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Formats phone number to Brazilian standard
 * @param phone - Phone string to format
 * @returns Formatted phone string (11) 98765-4321
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Formats CEP to Brazilian standard
 * @param cep - CEP string to format
 * @returns Formatted CEP string 12345-678
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';

  const cleaned = cep.replace(/\D/g, '');

  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }

  return cep;
}
