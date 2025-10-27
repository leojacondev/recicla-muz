import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Mock do MapScreen para web
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.messageCard}>
        <Text style={styles.icon}>🗺️</Text>
        <Text style={styles.title}>Mapa Interativo</Text>
        <Text style={styles.message}>
          O mapa com pontos de coleta está disponível apenas no aplicativo mobile.
        </Text>
        <Text style={styles.hint}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
