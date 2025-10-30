import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * Tela de índice das políticas legais
 * Lista todas as políticas disponíveis no app
 */
export default function PoliticasIndexScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Políticas Legais',
          headerStyle: {
            backgroundColor: isDark ? '#1c1c1e' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView
        style={[styles.container, isDark && styles.containerDark]}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.icon}>📜</Text>
          <Text style={[styles.title, isDark && styles.textDark]}>
            Políticas e Termos
          </Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Conheça nossos documentos legais e seus direitos
          </Text>
        </View>

        {/* Lista de políticas */}
        <View style={styles.policiesList}>
          {/* Política de Privacidade */}
          <Link href="/politicas/privacidade" asChild>
            <TouchableOpacity
              style={[styles.policyCard, isDark && styles.policyCardDark]}
              activeOpacity={0.7}
            >
              <View style={styles.policyHeader}>
                <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="shield-checkmark" size={28} color="#2196F3" />
                </View>
                <View style={styles.policyTextContainer}>
                  <Text style={[styles.policyTitle, isDark && styles.textDark]}>
                    Política de Privacidade
                  </Text>
                  <Text style={[styles.policyDescription, isDark && styles.subtitleDark]}>
                    Como coletamos e usamos seus dados
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={isDark ? '#666' : '#999'}
                />
              </View>
              <View style={styles.policyTags}>
                <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                  <Text style={[styles.tagText, { color: '#2196F3' }]}>LGPD</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                  <Text style={[styles.tagText, { color: '#4CAF50' }]}>Seus Direitos</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Política de Cookies */}
          <Link href="/politicas/cookies" asChild>
            <TouchableOpacity
              style={[styles.policyCard, isDark && styles.policyCardDark]}
              activeOpacity={0.7}
            >
              <View style={styles.policyHeader}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.cookieIcon}>🍪</Text>
                </View>
                <View style={styles.policyTextContainer}>
                  <Text style={[styles.policyTitle, isDark && styles.textDark]}>
                    Política de Cookies
                  </Text>
                  <Text style={[styles.policyDescription, isDark && styles.subtitleDark]}>
                    Como usamos cookies e armazenamento
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={isDark ? '#666' : '#999'}
                />
              </View>
              <View style={styles.policyTags}>
                <View style={[styles.tag, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={[styles.tagText, { color: '#F57C00' }]}>Gerenciável</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                  <Text style={[styles.tagText, { color: '#2196F3' }]}>Personalização</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Termos de Uso */}
          <Link href="/politicas/termos" asChild>
            <TouchableOpacity
              style={[styles.policyCard, isDark && styles.policyCardDark]}
              activeOpacity={0.7}
            >
              <View style={styles.policyHeader}>
                <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
                  <Ionicons name="document-text" size={28} color="#9C27B0" />
                </View>
                <View style={styles.policyTextContainer}>
                  <Text style={[styles.policyTitle, isDark && styles.textDark]}>
                    Termos de Uso
                  </Text>
                  <Text style={[styles.policyDescription, isDark && styles.subtitleDark]}>
                    Regras e condições de uso do app
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={isDark ? '#666' : '#999'}
                />
              </View>
              <View style={styles.policyTags}>
                <View style={[styles.tag, { backgroundColor: '#F3E5F5' }]}>
                  <Text style={[styles.tagText, { color: '#9C27B0' }]}>Obrigatório</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#FFEBEE' }]}>
                  <Text style={[styles.tagText, { color: '#F44336' }]}>Importante</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Informações adicionais */}
        <View style={[styles.infoBox, isDark && styles.infoBoxDark]}>
          <Ionicons name="information-circle" size={24} color="#2196F3" />
          <Text style={[styles.infoText, isDark && styles.textDark]}>
            Todos os documentos estão em conformidade com a{' '}
            <Text style={styles.bold}>LGPD (Lei 13.709/2018)</Text> e demais leis brasileiras.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, isDark && styles.subtitleDark]}>
            Última atualização: 28 de outubro de 2025
          </Text>
          <Text style={[styles.footerText, isDark && styles.subtitleDark]}>
            Versão 1.0
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  subtitleDark: {
    color: '#999',
  },
  policiesList: {
    gap: 16,
    marginBottom: 24,
  },
  policyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  policyCardDark: {
    backgroundColor: '#1c1c1e',
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cookieIcon: {
    fontSize: 28,
  },
  policyTextContainer: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  policyDescription: {
    fontSize: 14,
    color: '#666',
  },
  policyTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  infoBoxDark: {
    backgroundColor: '#1a237e',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  textDark: {
    color: '#fff',
  },
});