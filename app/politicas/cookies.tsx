import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { MarkdownViewer } from '@/components/MarkdownViewer';

/**
 * Tela da Política de Cookies
 */
export default function CookiesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [content, setContent] = useState('');

  useEffect(() => {
    loadCookiePolicy();
  }, []);

  const loadCookiePolicy = async () => {
    try {
      const markdown = `# Política de Cookies - ReciclaMuz

**Última atualização**: 28 de outubro de 2025

## 1. O que são Cookies?

Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você utiliza o aplicativo ReciclaMuz. Eles ajudam o aplicativo a lembrar suas preferências e melhorar sua experiência.

---

## 2. Tipos de Cookies

### 2.1 Cookies Essenciais 🔴

**Não podem ser desativados** - São necessários para o funcionamento básico.

- Token de autenticação OAuth
- Dados do usuário
- Provedor de login
- Sessão ativa

**Duração**: 7 dias

### 2.2 Cookies de Preferências 🟡

**Podem ser desativados** - Melhoram sua experiência.

- Tema escolhido (claro/escuro)
- Pontos de coleta favoritos
- Nível de zoom do mapa
- Idioma preferido

**Duração**: Permanente até você limpar

### 2.3 Cookies de Análise 🔵

**Podem ser desativados** - Ajudam a melhorar o app.

- Estatísticas de uso anônimas
- Logs de erros
- Features mais usadas

**Duração**: 30 dias

---

## 3. Como Gerenciar Cookies

Você pode personalizar suas preferências de cookies:

1. Acesse **Perfil** > **Configurações**
2. Toque em **Privacidade e Cookies**
3. Escolha quais cookies aceitar

### Opções Disponíveis

- ✅ **Aceitar Tudo**: Melhor experiência
- ⚙️ **Personalizar**: Escolha o que aceitar
- ❌ **Apenas Essenciais**: Funcionalidade básica

---

## 4. Impacto de Recusar Cookies

### Recusando Cookies Essenciais ❌
- Não conseguirá fazer login
- App não funcionará

### Recusando Cookies de Preferências ⚠️
- Tema será redefinido
- Favoritos não serão salvos
- Configurações não persistem

### Recusando Cookies de Análise ✅
- Nenhum impacto na experiência
- Apenas não nos ajuda a melhorar

---

## 5. Cookies de Terceiros

Utilizamos cookies de:

- **Google OAuth**: Para login com Google
- **GitHub OAuth**: Para login com GitHub
- **Expo**: Infraestrutura do aplicativo

Cada provedor tem sua própria política de privacidade.

---

## 6. Segurança

Medidas de proteção:

- 🔐 Dados sensíveis criptografados (SHA-256)
- 🔒 Comunicação segura (HTTPS/SSL)
- ⏱️ Expiração automática de tokens
- 🚫 Sem compartilhamento com terceiros

---

## 7. Conformidade LGPD

Esta política está em conformidade com:

- 📜 LGPD (Lei nº 13.709/2018)
- 📜 Marco Civil da Internet
- 📜 Código de Defesa do Consumidor

---

## 8. Contato

Dúvidas sobre cookies:

📧 **E-mail**: [Inserir e-mail]
📱 **No app**: Perfil > Ajuda

---

**ReciclaMuz** - Transparência e respeito à sua privacidade 🍪✅

*Este é um resumo. Consulte o documento completo no repositório do projeto.*
`;

      setContent(markdown);
    } catch (error) {
      console.error('Error loading cookie policy:', error);
      setContent('# Erro\n\nNão foi possível carregar a política de cookies.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Política de Cookies',
          headerStyle: {
            backgroundColor: isDark ? '#1c1c1e' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <MarkdownViewer content={content} />
    </>
  );
}