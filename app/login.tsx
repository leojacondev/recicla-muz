import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleButton, GitHubButton } from '@/components/LoginScreen';

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, signInWithGoogle, signInWithGitHub } = useAuth();
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);
  const [loadingGitHub, setLoadingGitHub] = React.useState(false);

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login com Google:', error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setLoadingGitHub(true);
      await signInWithGitHub();
    } catch (error) {
      console.error('Erro no login com GitHub:', error);
    } finally {
      setLoadingGitHub(false);
    }
  };

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

        <View style={styles.buttonsContainer}>
          <GoogleButton
            onPress={handleGoogleLogin}
            loading={loadingGoogle}
            disabled={loadingGitHub}
          />
          <GitHubButton
            onPress={handleGitHubLogin}
            loading={loadingGitHub}
            disabled={loadingGoogle}
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.guestText}>
          Continue como visitante para explorar o app
        </Text>
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
    paddingHorizontal: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  guestText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
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