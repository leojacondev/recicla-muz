import { Text, View } from '@/components/Themed';
import { ScrollView } from 'react-native';
import { styles } from './HomeScreen.styles';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>ReciclaMuz</Text>
        <Text style={styles.subtitle}>Pontos de coleta de lixo em Muzambinho</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo do Projeto</Text>
        <Text style={styles.text}>
          O ReciclaMuz é um aplicativo mobile desenvolvido para facilitar a identificação/localização 
          de pontos de coleta de lixo na cidade de Muzambinho. O projeto visa promover a sustentabilidade 
          ambiental e facilitar o descarte correto de resíduos, contribuindo para uma cidade mais limpa 
          e ecologicamente responsável.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Público-Alvo</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Moradores da cidade de Muzambinho</Text>
          <Text style={styles.bulletItem}>• Visitantes e turistas</Text>
          <Text style={styles.bulletItem}>• Empresas e estabelecimentos comerciais</Text>
          <Text style={styles.bulletItem}>• Instituições de ensino e órgãos públicos</Text>
          <Text style={styles.bulletItem}>• Qualquer pessoa interessada em contribuir com o meio ambiente</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Principais Funcionalidades</Text>
        <View style={styles.featuresList}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔐</Text>
            <Text style={styles.featureText}>Sistema de Login com diferentes níveis de acesso</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureText}>Mapa Interativo com pontos de coleta</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🗂️</Text>
            <Text style={styles.featureText}>Categorização de Resíduos por tipo</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Interface Intuitiva e responsiva</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureText}>Sistema de Avaliações dos pontos</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>👨‍💼</Text>
            <Text style={styles.featureText}>Painel Administrativo para gerenciar pontos</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍💻 Equipe de Desenvolvimento</Text>
        <Text style={styles.teamMember}>🔸 Anderson Henrique da Silva</Text>
        <Text style={styles.teamMember}>🔸 Leonardo Jacon dos Reis</Text>
        <Text style={styles.teamMember}>🔸 Lurian Letícia dos Reis</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>💚 Desenvolvido para uma Muzambinho mais sustentável</Text>
      </View>
    </ScrollView>
  );
}
