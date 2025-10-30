import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { MarkdownViewer } from '@/components/MarkdownViewer';

/**
 * Tela dos Termos de Uso
 */
export default function TermosScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [content, setContent] = useState('');

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    try {
      const markdown = `# Termos de Uso - ReciclaMuz

**Última atualização**: 28 de outubro de 2025

## 1. Aceitação dos Termos

Ao utilizar o **ReciclaMuz**, você concorda em cumprir e estar vinculado a estes Termos de Uso.

**Se você não concordar**, não utilize o aplicativo.

---

## 2. Sobre o ReciclaMuz

O ReciclaMuz é um aplicativo **gratuito** desenvolvido para:

- 📍 Localizar pontos de coleta de lixo em Muzambinho-MG
- ♻️ Promover a reciclagem e sustentabilidade
- 🗺️ Facilitar rotas até pontos de descarte
- ⭐ Permitir avaliações de pontos de coleta

---

## 3. Elegibilidade

Para usar o ReciclaMuz:

- ✅ Você deve ter **13 anos ou mais**
- ✅ Se tiver **13-18 anos**, precisa de autorização dos pais
- ✅ Deve fornecer informações verdadeiras

---

## 4. Uso Permitido

### Você PODE ✅

- Usar o app para localizar pontos de coleta
- Avaliar e comentar sobre pontos
- Compartilhar informações do app
- Sugerir novos pontos de coleta
- Reportar problemas

### Você NÃO PODE ❌

- Fornecer informações falsas
- Criar múltiplas contas
- Postar conteúdo ofensivo
- Fazer engenharia reversa do app
- Usar bots ou automação
- Usar para fins comerciais não autorizados

---

## 5. Conteúdo do Usuário

Ao postar avaliações ou comentários:

- ✅ Garante que o conteúdo é verdadeiro
- ✅ Concede licença para exibirmos o conteúdo
- ✅ Assume responsabilidade pelo que publica
- ✅ Concorda com moderação

### Conteúdo Proibido ❌

- Spam ou conteúdo irrelevante
- Discurso de ódio
- Conteúdo ofensivo ou assédio
- Informações falsas
- Violência ou ameaças

---

## 6. Propriedade Intelectual

Todos os direitos sobre o aplicativo pertencem ao ReciclaMuz:

- 🎨 Design e interface
- 💻 Código-fonte
- 📱 Logo e marca
- 📄 Conteúdo original

Você recebe uma licença **não-exclusiva**, **revogável** e **não-transferível** para uso pessoal.

---

## 7. Isenção de Responsabilidade

⚠️ **Importante**:

- Informações fornecidas **"como estão"**
- Não garantimos **100% de precisão**
- Pontos podem mudar sem aviso
- Você é **responsável por sua segurança**

Não nos responsabilizamos por:
- Danos diretos ou indiretos
- Perda de dados
- Uso ou incapacidade de usar o app
- Falhas de terceiros

---

## 8. Suspensão e Encerramento

Podemos suspender sua conta se:

- Violar estes Termos
- Usar o app para fins ilegais
- Usar bots não autorizados
- Publicar conteúdo proibido

Você pode encerrar sua conta em:
**Perfil > Configurações > Excluir Conta**

---

## 9. Modificações dos Termos

Reservamos o direito de modificar estes Termos.

Quando houver mudanças:
1. 📧 Enviaremos e-mail
2. 📱 Exibiremos aviso no app
3. ⏱️ Mudanças entram em vigor em 7 dias

---

## 10. Legislação Aplicável

Estes Termos são regidos pelas leis do Brasil:

- 📜 LGPD (Lei nº 13.709/2018)
- 📜 Marco Civil da Internet
- 📜 Código de Defesa do Consumidor

**Foro**: Comarca de Muzambinho-MG ou Alfenas-MG

---

## 11. Contato

Para dúvidas sobre os Termos:

📧 **E-mail**: [Inserir e-mail]
📍 **Endereço**: Muzambinho - MG
⏱️ **Horário**: Segunda a Sexta, 9h às 18h

---

**ReciclaMuz** - Juntos por um Muzambinho mais sustentável 🌱♻️

*Este é um resumo. Consulte o documento completo no repositório do projeto.*
`;

      setContent(markdown);
    } catch (error) {
      console.error('Error loading terms:', error);
      setContent('# Erro\n\nNão foi possível carregar os termos de uso.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Termos de Uso',
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