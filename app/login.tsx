import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ReciclaMuz</Text>
        <Text style={styles.subtitle}>
          Bem-vindo ao app de reciclagem de Muzambinho
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructions}>
          Faça login para acessar o mapa de pontos de coleta
        </Text>

        {/* Botões OAuth serão adicionados aqui */}
        <View style={styles.buttonsContainer}>
          <Text style={styles.placeholder}>Botões OAuth em breve...</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
  },
  placeholder: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});