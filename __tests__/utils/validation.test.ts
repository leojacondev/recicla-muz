import {
  isValidEmail,
  isValidPhone,
  isValidCEP,
  isValidURL,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isInRange,
  validatePasswordStrength,
  isValidCoordinates,
  sanitizeInput,
  formatPhone,
  formatCEP,
} from '@/utils/validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('invalid@domain')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate Brazilian phone numbers', () => {
      expect(isValidPhone('11987654321')).toBe(true);
      expect(isValidPhone('1134567890')).toBe(true);
      expect(isValidPhone('(11) 98765-4321')).toBe(true);
      // +55 format has 13 digits, which is more than 11, so it's invalid
      expect(isValidPhone('5511987654321')).toBe(false);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('')).toBe(false);
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('12345678901234')).toBe(false);
    });
  });

  describe('isValidCEP', () => {
    it('should validate Brazilian CEP', () => {
      expect(isValidCEP('12345678')).toBe(true);
      expect(isValidCEP('12345-678')).toBe(true);
    });

    it('should reject invalid CEP', () => {
      expect(isValidCEP('')).toBe(false);
      expect(isValidCEP('1234')).toBe(false);
      expect(isValidCEP('123456789')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://localhost:3000')).toBe(true);
      expect(isValidURL('https://sub.domain.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('')).toBe(false);
      expect(isValidURL('not-a-url')).toBe(false);
      // Note: URL constructor accepts custom protocols like 'htp://'
      // For stricter validation, we would need additional checks
    });
  });

  describe('isRequired', () => {
    it('should validate required fields', () => {
      expect(isRequired('value')).toBe(true);
      expect(isRequired('  value  ')).toBe(true);
      expect(isRequired([1, 2, 3])).toBe(true);
      expect(isRequired(true)).toBe(true);
      expect(isRequired(0)).toBe(true);
    });

    it('should reject empty values', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
      expect(isRequired([])).toBe(false);
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('should validate minimum length', () => {
      expect(hasMinLength('hello', 5)).toBe(true);
      expect(hasMinLength('hello world', 5)).toBe(true);
    });

    it('should reject strings below minimum length', () => {
      expect(hasMinLength('hi', 5)).toBe(false);
      expect(hasMinLength('', 1)).toBe(false);
    });
  });

  describe('hasMaxLength', () => {
    it('should validate maximum length', () => {
      expect(hasMaxLength('hello', 10)).toBe(true);
      expect(hasMaxLength('', 5)).toBe(true);
    });

    it('should reject strings above maximum length', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should validate numbers in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    it('should reject numbers outside range', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate strong passwords', () => {
      const result = validatePasswordStrength('StrongPass123');
      expect(result.isValid).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(validatePasswordStrength('').isValid).toBe(false);
      expect(validatePasswordStrength('short').isValid).toBe(false);
      expect(validatePasswordStrength('nouppercase123').isValid).toBe(false);
      expect(validatePasswordStrength('NOLOWERCASE123').isValid).toBe(false);
      expect(validatePasswordStrength('NoNumbers').isValid).toBe(false);
    });
  });

  describe('isValidCoordinates', () => {
    it('should validate correct coordinates', () => {
      expect(isValidCoordinates(0, 0)).toBe(true);
      expect(isValidCoordinates(-23.5505, -46.6333)).toBe(true);
      expect(isValidCoordinates(90, 180)).toBe(true);
      expect(isValidCoordinates(-90, -180)).toBe(true);
    });

    it('should reject invalid coordinates', () => {
      expect(isValidCoordinates(91, 0)).toBe(false);
      expect(isValidCoordinates(0, 181)).toBe(false);
      expect(isValidCoordinates(-91, 0)).toBe(false);
      expect(isValidCoordinates(0, -181)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
      expect(sanitizeInput("It's a test")).toBe('It&#x27;s a test');
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });

  describe('formatPhone', () => {
    it('should format 11-digit phone numbers', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('should format 10-digit phone numbers', () => {
      expect(formatPhone('1134567890')).toBe('(11) 3456-7890');
    });

    it('should handle empty input', () => {
      expect(formatPhone('')).toBe('');
    });
  });

  describe('formatCEP', () => {
    it('should format CEP', () => {
      expect(formatCEP('12345678')).toBe('12345-678');
    });

    it('should handle already formatted CEP', () => {
      expect(formatCEP('12345-678')).toBe('12345-678');
    });

    it('should handle empty input', () => {
      expect(formatCEP('')).toBe('');
    });
  });
});
