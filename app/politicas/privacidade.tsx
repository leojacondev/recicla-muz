import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { MarkdownViewer } from '@/components/MarkdownViewer';

/**
 * Tela da Política de Privacidade
 */
export default function PrivacidadeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [content, setContent] = useState('');

  useEffect(() => {
    // Carrega o conteúdo da política de privacidade
    loadPrivacyPolicy();
  }, []);

  const loadPrivacyPolicy = async () => {
    try {
      // Em produção, você pode carregar de uma API ou do bundle
      // Por enquanto, vamos usar um conteúdo de exemplo
      const markdown = `# Política de Privacidade - ReciclaMuz

**Última atualização**: 28 de outubro de 2025

## 1. Introdução

Bem-vindo ao **ReciclaMuz**! Este documento descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais quando você utiliza nosso aplicativo.

O ReciclaMuz é um aplicativo desenvolvido para facilitar a identificação e localização de pontos de coleta de lixo na cidade de Muzambinho-MG, contribuindo para um meio ambiente mais sustentável.

Levamos sua privacidade muito a sério e nos comprometemos a proteger suas informações pessoais de acordo com a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**.

---

## 2. Dados Coletados

### 2.1 Dados de Autenticação (OAuth)

Quando você faz login usando Google ou GitHub, coletamos:

- **Nome completo**
- **Endereço de e-mail**
- **Foto de perfil** (avatar)
- **ID do usuário** no provedor
- **Token de acesso OAuth** (criptografado)

**Base Legal**: Consentimento (LGPD, Art. 7º, I)

### 2.2 Dados de Uso

Coletamos automaticamente:

- **Localização aproximada** (quando você usa o mapa)
- **Histórico de interações** com pontos de coleta
- **Avaliações e comentários**
- **Data e hora de acesso**
- **Tipo de dispositivo**

**Base Legal**: Execução de contrato (LGPD, Art. 7º, V)

---

## 3. Como Usamos Seus Dados

Utilizamos seus dados para:

1. **Autenticação e Acesso**
   - Permitir login e manter sua sessão ativa
   - Identificar você dentro do aplicativo

2. **Funcionalidades do Aplicativo**
   - Mostrar pontos de coleta próximos
   - Permitir avaliações e comentários
   - Salvar favoritos e preferências

3. **Melhorias e Análises**
   - Entender como o app é usado
   - Corrigir bugs e problemas
   - Desenvolver novas funcionalidades

---

## 4. Seus Direitos (LGPD)

Você tem direito a:

✅ **Acesso**: Ver quais dados temos sobre você
✅ **Correção**: Corrigir dados incorretos
✅ **Exclusão**: Solicitar remoção dos seus dados
✅ **Portabilidade**: Receber seus dados
✅ **Revogação**: Retirar consentimento

Para exercer seus direitos, entre em contato através do app.

---

## 5. Segurança

Implementamos medidas de segurança:

- ✅ Criptografia de dados sensíveis
- ✅ HTTPS em todas as comunicações
- ✅ OAuth 2.0 para autenticação
- ✅ Tokens com expiração automática

---

## 6. Contato

Para dúvidas sobre privacidade:

📧 **E-mail**: [Inserir e-mail]
📍 **Localização**: Muzambinho - MG

---

**ReciclaMuz** - Reciclando para um futuro melhor 🌱♻️

*Este é um resumo. Consulte o documento completo no repositório do projeto.*
`;

      setContent(markdown);
    } catch (error) {
      console.error('Error loading privacy policy:', error);
      setContent('# Erro\n\nNão foi possível carregar a política de privacidade.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Política de Privacidade',
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