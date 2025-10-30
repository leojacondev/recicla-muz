import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, useColorScheme } from 'react-native';

interface MarkdownViewerProps {
  content: string;
}

/**
 * Componente para renderizar documentos markdown de forma simples
 *
 * Este é um viewer básico que funciona sem dependências externas.
 * Para uma renderização mais completa, considere usar react-native-markdown-display
 */
export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!content) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={[styles.loadingText, isDark && styles.textDark]}>
          Carregando documento...
        </Text>
      </View>
    );
  }

  // Parse simples do markdown
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Títulos H1
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={key++} style={[styles.h1, isDark && styles.textDark]}>
          {line.replace('# ', '')}
        </Text>
      );
    }
    // Títulos H2
    else if (line.startsWith('## ')) {
      elements.push(
        <Text key={key++} style={[styles.h2, isDark && styles.textDark]}>
          {line.replace('## ', '')}
        </Text>
      );
    }
    // Títulos H3
    else if (line.startsWith('### ')) {
      elements.push(
        <Text key={key++} style={[styles.h3, isDark && styles.textDark]}>
          {line.replace('### ', '')}
        </Text>
      );
    }
    // Separador horizontal
    else if (line.trim() === '---') {
      elements.push(<View key={key++} style={styles.hr} />);
    }
    // Lista não ordenada
    else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('+ ')) {
      elements.push(
        <View key={key++} style={styles.listItem}>
          <Text style={[styles.bullet, isDark && styles.textDark]}>• </Text>
          <Text style={[styles.text, isDark && styles.textDark]}>
            {line.replace(/^[*\-+] /, '')}
          </Text>
        </View>
      );
    }
    // Lista ordenada
    else if (/^\d+\. /.test(line)) {
      const number = line.match(/^(\d+)\. /)?.[1];
      elements.push(
        <View key={key++} style={styles.listItem}>
          <Text style={[styles.bullet, isDark && styles.textDark]}>{number}. </Text>
          <Text style={[styles.text, isDark && styles.textDark]}>
            {line.replace(/^\d+\. /, '')}
          </Text>
        </View>
      );
    }
    // Negrito **texto**
    else if (line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <Text key={key++} style={[styles.text, isDark && styles.textDark]}>
          {parts.map((part, idx) =>
            idx % 2 === 1 ? (
              <Text key={idx} style={styles.bold}>
                {part}
              </Text>
            ) : (
              part
            )
          )}
        </Text>
      );
    }
    // Linha vazia (espaçamento)
    else if (line.trim() === '') {
      elements.push(<View key={key++} style={styles.spacer} />);
    }
    // Texto normal
    else if (line.trim() !== '') {
      elements.push(
        <Text key={key++} style={[styles.text, isDark && styles.textDark]}>
          {line}
        </Text>
      );
    }
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.content}>{elements}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 24,
    marginBottom: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  textDark: {
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 16,
  },
  bullet: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
    fontWeight: 'bold',
  },
  hr: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  spacer: {
    height: 8,
  },
});