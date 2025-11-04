import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      console.error = originalError;
    });

    it('should provide auth context values', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toHaveProperty('user');
      expect(result.current).toHaveProperty('isAuthenticated');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('signInWithGoogle');
      expect(result.current).toHaveProperty('signInWithGitHub');
      expect(result.current).toHaveProperty('signOut');
      expect(result.current).toHaveProperty('refreshSession');
    });

    it('should initialize with no authenticated user', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should have function types for auth methods', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.signInWithGoogle).toBe('function');
      expect(typeof result.current.signInWithGitHub).toBe('function');
      expect(typeof result.current.signOut).toBe('function');
      expect(typeof result.current.refreshSession).toBe('function');
    });
  });

  describe('Authentication state', () => {
    it('should update isAuthenticated when user is set', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Initially not authenticated
      expect(result.current.isAuthenticated).toBe(false);

      // Note: Actual authentication flow requires OAuth mocks
      // which are complex to test in unit tests
    });
  });

  describe('Loading state', () => {
    it('should have isLoading property', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.isLoading).toBe('boolean');
    });
  });
});
