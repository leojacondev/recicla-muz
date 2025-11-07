# Política de Privacidade - ReciclaMuz

**Última atualização**: 07 de novembro de 2025

## 1. Introdução

Bem-vindo ao **ReciclaMuz**! Este documento descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais quando você utiliza nosso aplicativo.

O ReciclaMuz é um aplicativo desenvolvido para facilitar a identificação e localização de pontos de coleta de lixo na cidade de Muzambinho-MG, contribuindo para um meio ambiente mais sustentável.

Levamos sua privacidade muito a sério e nos comprometemos a proteger suas informações pessoais de acordo com a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**.

---

## 2. Responsável pelo Tratamento de Dados

**Desenvolvedor**: Equipe ReciclaMuz
**Líder do Projeto**: Lurian Letícia dos Reis
**Desenvolvedores**: Anderson Henrique da Silva, Leonardo Jacon dos Reis
**Contato**: reciclamuz@ifsudeminas.edu.br
**Instituição**: IFSULDEMINAS - Campus Muzambinho
**Cidade**: Muzambinho - MG, Brasil

Para dúvidas sobre esta política ou sobre seus dados pessoais, entre em contato através do e-mail acima.

---

## 3. Dados Coletados

### 3.1 Dados de Autenticação (OAuth)

Quando você faz login usando Google ou GitHub, coletamos:

- **Nome completo**
- **Endereço de e-mail**
- **Foto de perfil** (avatar)
- **ID do usuário** no provedor (Google ou GitHub)
- **Token de acesso OAuth** (criptografado e armazenado localmente)

**Base Legal**: Consentimento (LGPD, Art. 7º, I) - você autoriza expressamente ao fazer login.

### 3.2 Dados de Uso do Aplicativo

Coletamos automaticamente:

- **Localização aproximada** (quando você usa o mapa)
- **Histórico de interações** com pontos de coleta
- **Data e hora de acesso** ao aplicativo
- **Tipo de dispositivo** (iOS, Android, Web)
- **Preferências de tema** (claro/escuro)

**Base Legal**: Execução de contrato e legítimo interesse (LGPD, Art. 7º, V e IX) - necessários para funcionamento do app.

### 3.2.1 Dados de Avaliações

Quando você avalia um ponto de coleta, coletamos:

- **Classificação em estrelas** (1 a 5)
- **Comentário escrito** por você
- **Data e hora** da avaliação
- **Nome de usuário** e **foto de perfil** (para exibição pública)
- **Histórico de edições** (se você modificar sua avaliação)

⚠️ **Atenção**: Suas avaliações são **públicas** e podem ser visualizadas por outros usuários do aplicativo.

**Base Legal**: Consentimento explícito (LGPD, Art. 7º, I) - você autoriza ao publicar a avaliação.

### 3.3 Dados de Localização

- **Localização em tempo real**: Usada apenas quando você abre o mapa
- **Não coletamos histórico de localização**
- **Você pode negar permissão de localização** - o app continuará funcionando, mas sem mostrar sua posição no mapa

**Base Legal**: Consentimento explícito (LGPD, Art. 7º, I)

### 3.4 Dados que NÃO Coletamos

❌ Não coletamos:
- Dados sensíveis (raça, religião, opinião política)
- Dados bancários ou financeiros
- Dados de menores de 18 anos sem autorização dos pais
- Contatos do seu dispositivo
- Mensagens ou fotos privadas
- Histórico de navegação fora do app

---

## 4. Como Usamos Seus Dados

### 4.1 Finalidades

Utilizamos seus dados para:

1. **Autenticação e Acesso**
   - Permitir login e manter sua sessão ativa
   - Identificar você dentro do aplicativo
   - Exibir seu perfil e avatar

2. **Funcionalidades do Aplicativo**
   - Mostrar pontos de coleta próximos a você
   - Permitir criação, edição e exclusão de avaliações
   - Exibir suas avaliações e comentários publicamente
   - Calcular estatísticas de avaliações (média, distribuição)
   - Salvar seus favoritos e preferências
   - Calcular rotas até pontos de coleta

3. **Melhorias e Análises**
   - Entender como o app é usado
   - Corrigir bugs e problemas
   - Desenvolver novas funcionalidades
   - Melhorar a experiência do usuário

4. **Comunicação**
   - Enviar notificações importantes sobre o serviço
   - Responder suas dúvidas e solicitações
   - Informar sobre atualizações do aplicativo

### 4.2 Compartilhamento de Dados

**Não vendemos, alugamos ou comercializamos seus dados pessoais.**

Compartilhamos dados apenas quando:

1. **Com Provedores de Serviço**
   - Google (autenticação OAuth)
   - GitHub (autenticação OAuth)
   - Expo (infraestrutura do aplicativo)

2. **Por Exigência Legal**
   - Quando requerido por autoridades judiciais
   - Para cumprir leis e regulamentações
   - Para proteger direitos e segurança

3. **Com Seu Consentimento**
   - Quando você autorizar explicitamente

---

## 5. Armazenamento e Segurança

### 5.1 Como Armazenamos

- **Dados de autenticação**: Armazenados localmente no seu dispositivo, criptografados
- **Dados de perfil**: Armazenados em servidores seguros (quando implementarmos backend)
- **Avaliações e comentários**: Armazenados localmente no dispositivo via AsyncStorage
- **Localização**: Nunca armazenada permanentemente

📱 **Importante**: Atualmente, as avaliações são armazenadas apenas no seu dispositivo. Se você desinstalar o app ou limpar os dados, suas avaliações serão perdidas.

### 5.2 Medidas de Segurança

Implementamos:

✅ **Criptografia**: Tokens e dados sensíveis são criptografados
✅ **HTTPS**: Todas as comunicações usam SSL/TLS
✅ **OAuth 2.0**: Padrão seguro de autenticação
✅ **Expiração de sessão**: Tokens expiram em 7 dias
✅ **Sem armazenamento de senhas**: Usamos apenas OAuth

### 5.3 Retenção de Dados

- **Dados de autenticação**: Mantidos enquanto sua conta estiver ativa
- **Avaliações e comentários**:
  - Armazenadas localmente enquanto o app estiver instalado
  - Podem ser editadas ou excluídas por você a qualquer momento
  - Anonimizadas se você excluir sua conta (mantém texto sem identificação)
- **Logs de uso**: Mantidos por até 12 meses
- **Dados excluídos**: Removidos permanentemente em até 30 dias após solicitação

---

## 6. Seus Direitos (LGPD)

De acordo com a LGPD, você tem direito a:

### 6.1 Direitos Garantidos

✅ **Acesso**: Confirmar que tratamos seus dados e acessá-los
✅ **Correção**: Corrigir dados incompletos, inexatos ou desatualizados
✅ **Anonimização**: Solicitar bloqueio ou anonimização de dados desnecessários
✅ **Eliminação**: Pedir exclusão de dados tratados com seu consentimento
✅ **Portabilidade**: Receber seus dados em formato estruturado
✅ **Revogação**: Revogar seu consentimento a qualquer momento
✅ **Oposição**: Opor-se a tratamento de dados em certas situações
✅ **Informação**: Saber com quem compartilhamos seus dados

### 6.2 Como Exercer Seus Direitos

Para exercer qualquer direito, entre em contato:

📧 **E-mail**: reciclamuz@ifsudeminas.edu.br
⏱️ **Prazo de resposta**: Até 15 dias úteis
💰 **Custo**: Gratuito

**Exclusão de avaliações**: Você pode excluir suas avaliações diretamente no app, sem necessidade de contato.

### 6.3 Exclusão de Conta

Você pode excluir sua conta a qualquer momento:

1. Acesse seu perfil no app
2. Toque em "Configurações"
3. Selecione "Excluir minha conta"
4. Confirme a exclusão

⚠️ **Atenção**: Avaliações e comentários públicos podem ser mantidos de forma anonimizada.

---

## 7. Cookies e Armazenamento Local

### 7.1 O que são Cookies

Cookies são pequenos arquivos armazenados no seu dispositivo para lembrar preferências e melhorar a experiência.

### 7.2 Cookies que Usamos

- **Cookies essenciais**: Necessários para login e autenticação
- **Cookies de preferência**: Salvam tema (claro/escuro) e idioma
- **Cookies de análise**: Ajudam a entender como você usa o app

### 7.3 Gerenciamento de Cookies

Você pode:
- Aceitar ou recusar cookies ao primeiro acesso
- Gerenciar preferências em Configurações > Privacidade
- Limpar cookies fazendo logout

📋 **Mais detalhes**: Veja nossa [Política de Cookies](./POLITICA_COOKIES.md)

---

## 8. Uso por Menores de Idade

🔞 **Idade mínima**: 13 anos

- Se você tem **menos de 13 anos**, não pode usar o aplicativo
- Se você tem **entre 13 e 18 anos**, precisa de autorização dos pais/responsáveis
- Não coletamos intencionalmente dados de menores sem autorização

Se descobrirmos que coletamos dados de menores sem autorização, excluiremos imediatamente.

---

## 9. Transferência Internacional de Dados

Alguns serviços que utilizamos (Google, GitHub, Expo) podem armazenar dados em servidores fora do Brasil.

Garantimos que:
- ✅ Apenas empresas com cláusulas contratuais adequadas são usadas
- ✅ Seus direitos da LGPD continuam protegidos
- ✅ Nível de proteção equivalente ao brasileiro

---

## 10. Alterações nesta Política

Podemos atualizar esta política periodicamente. Quando fizermos alterações significativas:

1. ✉️ Notificaremos você por e-mail
2. 📱 Exibiremos aviso no aplicativo
3. 📅 Atualizaremos a data no topo deste documento

Recomendamos revisar esta política regularmente.

---

## 11. Legislação Aplicável

Esta política é regida pelas leis brasileiras, especialmente:

- 📜 **Lei Geral de Proteção de Dados (LGPD)** - Lei nº 13.709/2018
- 📜 **Marco Civil da Internet** - Lei nº 12.965/2014
- 📜 **Código de Defesa do Consumidor** - Lei nº 8.078/1990

---

## 12. Autoridade de Proteção de Dados

Em caso de dúvidas ou reclamações sobre tratamento de dados, você pode contatar:

**Autoridade Nacional de Proteção de Dados (ANPD)**
🌐 Website: https://www.gov.br/anpd/
📧 E-mail: atendimento@anpd.gov.br

---

## 13. Contato e Dúvidas

Para dúvidas, solicitações ou exercer seus direitos:

📧 **E-mail**: [Inserir e-mail de contato]
📍 **Endereço**: Muzambinho - MG, Brasil
⏱️ **Horário de atendimento**: Segunda a Sexta, 9h às 18h

---

## 14. Consentimento

Ao utilizar o ReciclaMuz, você declara que:

✅ Leu e compreendeu esta Política de Privacidade
✅ Concorda com a coleta e uso de seus dados conforme descrito
✅ Tem 13 anos ou mais (ou autorização dos pais/responsáveis)
✅ Está ciente de seus direitos sob a LGPD

---

**ReciclaMuz** - Reciclando para um futuro melhor 🌱♻️

*Versão 1.0 - Outubro de 2025*