import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

// Versão web do mapa (sem react-native-maps)
export default function MapScreen() {
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.messageCard}>
        <Text style={[styles.icon, isDark && styles.iconDark]}>🗺️</Text>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Mapa Interativo
        </Text>
        <Text style={[styles.message, isDark && styles.messageDark]}>
          O mapa com pontos de coleta está disponível apenas no aplicativo mobile.
        </Text>
        <Text style={[styles.hint, isDark && styles.hintDark]}>
          Use o app no Android ou iOS para visualizar os pontos de coleta em Muzambinho.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  iconDark: {
    opacity: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleDark: {
    color: '#4caf50',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  messageDark: {
    color: '#e0e0e0',
  },
  hint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  hintDark: {
    color: '#999',
  },
});
