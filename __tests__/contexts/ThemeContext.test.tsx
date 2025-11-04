import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

describe('ThemeContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      console.error = originalError;
    });

    it('should provide theme context values', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current).toHaveProperty('isDark');
      expect(result.current).toHaveProperty('toggleTheme');
    });

    it('should initialize with light theme by default', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.isDark).toBe(false);
    });

    it('should toggle theme when toggleTheme is called', async () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      const initialTheme = result.current.isDark;

      await act(async () => {
        await result.current.toggleTheme();
      });

      expect(result.current.isDark).toBe(!initialTheme);
    });

    it('should toggle theme back and forth', async () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      // First toggle
      await act(async () => {
        await result.current.toggleTheme();
      });
      const afterFirstToggle = result.current.isDark;

      // Second toggle
      await act(async () => {
        await result.current.toggleTheme();
      });
      const afterSecondToggle = result.current.isDark;

      expect(afterFirstToggle).not.toBe(afterSecondToggle);
    });

    it('should have function type for toggleTheme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });
});
