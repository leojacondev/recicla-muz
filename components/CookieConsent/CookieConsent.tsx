import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  useColorScheme,
} from 'react-native';
import { useCookieConsent, CookiePreferences } from '@/contexts/CookieConsentContext';
import { Link } from 'expo-router';

/**
 * Banner de consentimento de cookies LGPD-compliant
 *
 * Exibido na primeira vez que o usuário abre o app
 * Permite aceitar todos, apenas essenciais, ou personalizar
 */
export function CookieConsent() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    showBanner,
    preferences: currentPreferences,
    acceptAll,
    acceptEssentialOnly,
    updatePreferences,
  } = useCookieConsent();

  const [showCustomize, setShowCustomize] = useState(false);
  const [customPreferences, setCustomPreferences] = useState<CookiePreferences>(currentPreferences);

  /**
   * Handler: Aceitar todos os cookies
   */
  const handleAcceptAll = async () => {
    await acceptAll();
  };

  /**
   * Handler: Aceitar apenas essenciais
   */
  const handleEssentialOnly = async () => {
    await acceptEssentialOnly();
  };

  /**
   * Handler: Salvar preferências personalizadas
   */
  const handleSaveCustom = async () => {
    await updatePreferences(customPreferences);
    setShowCustomize(false);
  };

  /**
   * Handler: Abrir modal de personalização
   */
  const handleCustomize = () => {
    setCustomPreferences(currentPreferences);
    setShowCustomize(true);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Banner Principal */}
      <Modal
        visible={!showCustomize}
        transparent
        animationType="slide"
        onRequestClose={handleEssentialOnly}
      >
        <View style={styles.overlay}>
          <View style={[styles.banner, isDark && styles.bannerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Ícone e Título */}
              <View style={styles.header}>
                <Text style={styles.icon}>🍪</Text>
                <Text style={[styles.title, isDark && styles.textDark]}>
                  Este aplicativo usa cookies
                </Text>
              </View>

              {/* Descrição */}
              <Text style={[styles.description, isDark && styles.textDark]}>
                Usamos <Text style={styles.bold}>cookies essenciais</Text> para autenticação e{' '}
                <Text style={styles.bold}>cookies opcionais</Text> para melhorar sua experiência.
              </Text>

              {/* Informação sobre LGPD */}
              <View style={styles.infoBox}>
                <Text style={[styles.infoText, isDark && styles.textDark]}>
                  ✅ Você controla seus dados{'\n'}
                  ✅ Conforme LGPD (Lei 13.709/2018){'\n'}
                  ✅ Sem compartilhamento com terceiros
                </Text>
              </View>

              {/* Links para políticas */}
              <View style={styles.linksContainer}>
                <Text style={[styles.smallText, isDark && styles.textDark]}>
                  Leia nossa{' '}
                  <Link href="/politicas/privacidade" style={styles.link}>
                    Política de Privacidade
                  </Link>
                  {' '}e{' '}
                  <Link href="/politicas/cookies" style={styles.link}>
                    Política de Cookies
                  </Link>
                </Text>
              </View>

              {/* Botões de ação */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={handleAcceptAll}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTextPrimary}>✅ Aceitar Tudo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary, isDark && styles.buttonSecondaryDark]}
                  onPress={handleCustomize}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.buttonTextSecondary, isDark && styles.buttonTextSecondaryDark]}>
                    ⚙️ Personalizar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonTertiary]}
                  onPress={handleEssentialOnly}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTextTertiary}>❌ Apenas Essenciais</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Personalização */}
      <Modal
        visible={showCustomize}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCustomize(false)}
      >
        <View style={styles.overlay}>
          <View style={[styles.customizeModal, isDark && styles.customizeModalDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <Text style={[styles.customizeTitle, isDark && styles.textDark]}>
                Personalizar Cookies
              </Text>

              {/* Cookies Essenciais */}
              <View style={styles.cookieItem}>
                <View style={styles.cookieHeader}>
                  <Text style={[styles.cookieType, isDark && styles.textDark]}>
                    🔴 Cookies Essenciais
                  </Text>
                  <Switch
                    value={true}
                    disabled={true}
                    trackColor={{ false: '#ccc', true: '#4CAF50' }}
                  />
                </View>
                <Text style={[styles.cookieDescription, isDark && styles.textDark]}>
                  Necessários para autenticação e funcionamento básico. Não podem ser desativados.
                </Text>
                <Text style={[styles.cookieExamples, isDark && styles.textDark]}>
                  Exemplos: Token de login, sessão ativa
                </Text>
              </View>

              {/* Cookies de Preferências */}
              <View style={styles.cookieItem}>
                <View style={styles.cookieHeader}>
                  <Text style={[styles.cookieType, isDark && styles.textDark]}>
                    🟡 Cookies de Preferências
                  </Text>
                  <Switch
                    value={customPreferences.preferences}
                    onValueChange={(value) =>
                      setCustomPreferences({ ...customPreferences, preferences: value })
                    }
                    trackColor={{ false: '#ccc', true: '#4CAF50' }}
                  />
                </View>
                <Text style={[styles.cookieDescription, isDark && styles.textDark]}>
                  Lembram suas escolhas (tema, favoritos, configurações).
                </Text>
                <Text style={[styles.cookieExamples, isDark && styles.textDark]}>
                  Exemplos: Tema escuro/claro, pontos favoritos
                </Text>
              </View>

              {/* Cookies de Análise */}
              <View style={styles.cookieItem}>
                <View style={styles.cookieHeader}>
                  <Text style={[styles.cookieType, isDark && styles.textDark]}>
                    🔵 Cookies de Análise
                  </Text>
                  <Switch
                    value={customPreferences.analytics}
                    onValueChange={(value) =>
                      setCustomPreferences({ ...customPreferences, analytics: value })
                    }
                    trackColor={{ false: '#ccc', true: '#4CAF50' }}
                  />
                </View>
                <Text style={[styles.cookieDescription, isDark && styles.textDark]}>
                  Ajudam a melhorar o app coletando estatísticas anônimas de uso.
                </Text>
                <Text style={[styles.cookieExamples, isDark && styles.textDark]}>
                  Exemplos: Features mais usadas, tempo no app
                </Text>
              </View>

              {/* Botões */}
              <View style={styles.customizeButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={handleSaveCustom}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTextPrimary}>Salvar Preferências</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonTertiary]}
                  onPress={() => setShowCustomize(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTextTertiary}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  banner: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  bannerDark: {
    backgroundColor: '#1c1c1e',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 22,
  },
  linksContainer: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  smallText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  buttonSecondaryDark: {
    backgroundColor: '#2c2c2e',
    borderColor: '#2196F3',
  },
  buttonTertiary: {
    backgroundColor: 'transparent',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondaryDark: {
    color: '#64B5F6',
  },
  buttonTextTertiary: {
    color: '#666',
    fontSize: 15,
  },
  textDark: {
    color: '#fff',
  },

  // Estilos do modal de personalização
  customizeModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  customizeModalDark: {
    backgroundColor: '#1c1c1e',
  },
  customizeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  cookieItem: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cookieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cookieType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  cookieDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
  cookieExamples: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  customizeButtons: {
    gap: 12,
    marginTop: 8,
  },
});