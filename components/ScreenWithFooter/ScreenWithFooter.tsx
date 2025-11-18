import React, { useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Footer } from '@/components/Footer';
import { AboutModal } from '@/components/AboutModal';
import { INSTITUTIONAL_INFO } from '@/constants/institutionalInfo';

interface ScreenWithFooterProps {
  children: ReactNode;
}

/**
 * Wrapper component que adiciona Footer e AboutModal às telas
 * Usa-se para envolver o conteúdo de telas que devem exibir o rodapé institucional
 */
export function ScreenWithFooter({ children }: ScreenWithFooterProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <Footer onAboutPress={() => setModalVisible(true)} />
      <AboutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        institutionalInfo={INSTITUTIONAL_INFO}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
