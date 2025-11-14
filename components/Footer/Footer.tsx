import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './Footer.styles';

interface FooterProps {
  onAboutPress?: () => void;
}

export function Footer({ onAboutPress }: FooterProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo da Instituição */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/ifsuldeminas-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Informações do Projeto */}
        <View style={styles.info}>
          <Text style={[styles.projectName, isDark && styles.textDark]}>
            ReciclaMuz
          </Text>
          <Text style={[styles.projectType, isDark && styles.textSecondaryDark]}>
            Projeto Acadêmico - IFSULDEMINAS
          </Text>
        </View>

        {/* Botão de Mais Informações */}
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={onAboutPress}
          accessibilityLabel="Mais informações sobre o projeto"
          accessibilityRole="button"
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
          <Text style={[styles.aboutText, isDark && styles.textDark]}>
            Sobre
          </Text>
        </TouchableOpacity>
      </View>

      {/* Copyright */}
      <View style={styles.copyright}>
        <Text style={[styles.copyrightText, isDark && styles.textSecondaryDark]}>
          © {new Date().getFullYear()} ReciclaMuz. Desenvolvido para fins acadêmicos.
        </Text>
      </View>
    </View>
  );
}
