import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) {
    router.replace('/login');
    return null;
  }

  const containerStyle = [styles.container, isDark && styles.containerDark];
  const cardStyle = [styles.card, isDark && styles.cardDark];
  const textStyle = (baseStyle: any) => [baseStyle, isDark && styles.textDark];

  return (
    <ScrollView style={containerStyle}>
      <View style={styles.content}>
        {/* Avatar e Nome */}
        <View style={cardStyle}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={50} color="#999" />
              </View>
            )}
          </View>

          <Text style={textStyle(styles.name)}>{user.name}</Text>
          <Text style={textStyle(styles.email)}>{user.email}</Text>

          <View style={styles.providerBadge}>
            <Ionicons
              name={user.provider === 'google' ? 'logo-google' : 'logo-github'}
              size={16}
              color="#fff"
            />
            <Text style={styles.providerText}>
              {user.provider === 'google' ? 'Google' : 'GitHub'}
            </Text>
          </View>
        </View>

        {/* Informações da Conta */}
        <View style={cardStyle}>
          <Text style={textStyle(styles.sectionTitle)}>Informações da Conta</Text>

          <View style={styles.infoRow}>
            <Ionicons name="fingerprint" size={20} color={isDark ? '#aaa' : '#666'} />
            <View style={styles.infoContent}>
              <Text style={textStyle(styles.infoLabel)}>ID do Usuário</Text>
              <Text style={textStyle(styles.infoValue)}>{user.id}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark" size={20} color={isDark ? '#aaa' : '#666'} />
            <View style={styles.infoContent}>
              <Text style={textStyle(styles.infoLabel)}>Provedor</Text>
              <Text style={textStyle(styles.infoValue)}>
                {user.provider === 'google' ? 'Google OAuth' : 'GitHub OAuth'}
              </Text>
            </View>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>
            {isLoading ? 'Saindo...' : 'Sair da Conta'}
          </Text>
        </TouchableOpacity>

        <Text style={textStyle(styles.footer)}>
          ReciclaMuz v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  textDark: {
    color: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'center',
  },
  providerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
  },
});
