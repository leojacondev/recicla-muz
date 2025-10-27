import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, signInWithGoogle, signInWithGitHub } = useAuth();
  const { isDark } = useTheme();
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);
  const [loadingGitHub, setLoadingGitHub] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      setLoadingGoogle(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      setError('Falha ao fazer login com Google. Tente novamente.');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setError(null);
      setLoadingGitHub(true);
      await signInWithGitHub();
    } catch (error) {
      console.error('Erro no login com GitHub:', error);
      setError('Falha ao fazer login com GitHub. Tente novamente.');
    } finally {
      setLoadingGitHub(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, isDark && styles.containerDark, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2d5016" />
        <Text style={[styles.loadingText, isDark && styles.textDark]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>🌿 Bem-vindo</Text>
        <Text style={[styles.subtitle, isDark && styles.textDark]}>
          Faça login para acessar recursos exclusivos do ReciclaMuz
        </Text>
      </View>

      {error && (
        <View style={styles.errorCard}>
          <Ionicons name="alert-circle" size={24} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => setError(null)}>
            <Ionicons name="close" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.textDark]}>
          Escolha seu método de login
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            styles.googleButton,
            (loadingGoogle || loadingGitHub) && styles.buttonDisabled
          ]}
          onPress={handleGoogleLogin}
          disabled={loadingGoogle || loadingGitHub}
        >
          {loadingGoogle ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="logo-google" size={24} color="#fff" />
              <Text style={styles.buttonText}>Continuar com Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.githubButton,
            (loadingGoogle || loadingGitHub) && styles.buttonDisabled
          ]}
          onPress={handleGitHubLogin}
          disabled={loadingGoogle || loadingGitHub}
        >
          {loadingGitHub ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="logo-github" size={24} color="#fff" />
              <Text style={styles.buttonText}>Continuar com GitHub</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
          <Text style={[styles.dividerText, isDark && styles.textDark]}>ou</Text>
          <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.guestButton, isDark && styles.guestButtonDark]}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="arrow-back" size={20} color={isDark ? '#fff' : '#2d5016'} />
          <Text style={[styles.guestButtonText, isDark && styles.textDark]}>
            Voltar para o app
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.infoCard, isDark && styles.cardDark]}>
        <Ionicons name="lock-closed" size={20} color="#2d5016" />
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Ao fazer login, você concorda com nossos{' '}
          <Text style={styles.link}>Termos de Serviço</Text> e{' '}
          <Text style={styles.link}>Política de Privacidade</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleDark: {
    color: '#4caf50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  textDark: {
    color: '#e0e0e0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#2a2a2a',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  guestButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#2d5016',
  },
  guestButtonDark: {
    backgroundColor: '#1a1a1a',
    borderColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButtonText: {
    color: '#2d5016',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerLineDark: {
    backgroundColor: '#444',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  errorText: {
    flex: 1,
    color: '#c0392b',
    fontSize: 14,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  link: {
    color: '#2d5016',
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
