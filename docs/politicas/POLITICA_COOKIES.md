# Política de Cookies - ReciclaMuz

**Última atualização**: 28 de outubro de 2025

## 1. O que são Cookies?

Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando você utiliza o aplicativo ReciclaMuz. Eles ajudam o aplicativo a lembrar suas preferências e melhorar sua experiência.

### 1.1 Como Funcionam

Quando você acessa o ReciclaMuz:
1. 📥 O aplicativo envia cookies para o seu dispositivo
2. 💾 Seu dispositivo armazena os cookies localmente
3. 🔄 O aplicativo lê os cookies em acessos futuros
4. ✨ Sua experiência é personalizada com base nos cookies

---

## 2. Tipos de Cookies que Utilizamos

### 2.1 Cookies Essenciais (Necessários) 🔴

**Não podem ser desativados** - São essenciais para o funcionamento básico do app.

| Cookie | Finalidade | Duração |
|--------|-----------|---------|
| `@reciclamuz:auth_token` | Token de autenticação OAuth (criptografado) | 7 dias |
| `@reciclamuz:user_data` | Dados básicos do seu perfil | 7 dias |
| `@reciclamuz:auth_provider` | Provedor usado (Google ou GitHub) | 7 dias |
| `@reciclamuz:session_expiry` | Data de expiração da sessão | 7 dias |

**Por que são necessários?**
- Manter você logado no aplicativo
- Identificar sua sessão ativa
- Renovar automaticamente seu token
- Proteger contra acessos não autorizados

### 2.2 Cookies de Preferências 🟡

**Podem ser desativados** - Melhoram sua experiência, mas não são essenciais.

| Cookie | Finalidade | Duração |
|--------|-----------|---------|
| `@reciclamuz:theme_preference` | Tema escolhido (claro/escuro) | Permanente |
| `@reciclamuz:map_zoom_level` | Nível de zoom preferido no mapa | 30 dias |
| `@reciclamuz:favorite_points` | Pontos de coleta favoritados | Permanente |
| `@reciclamuz:language` | Idioma preferido | Permanente |

**Por que usamos?**
- Lembrar seu tema favorito
- Salvar suas preferências de visualização
- Manter seus pontos de coleta favoritos
- Personalizar sua interface

### 2.3 Cookies de Consentimento 🟢

**Gerenciáveis pelo usuário** - Controlam suas escolhas de privacidade.

| Cookie | Finalidade | Duração |
|--------|-----------|---------|
| `@reciclamuz:cookie_consent` | Registra se você aceitou cookies | 12 meses |
| `@reciclamuz:analytics_consent` | Permissão para cookies de análise | 12 meses |
| `@reciclamuz:location_consent` | Permissão para usar localização | Permanente |

### 2.4 Cookies de Análise 🔵

**Podem ser desativados** - Ajudam a melhorar o aplicativo.

| Cookie | Finalidade | Duração |
|--------|-----------|---------|
| `@reciclamuz:usage_stats` | Estatísticas de uso anônimas | 30 dias |
| `@reciclamuz:error_logs` | Logs de erros para debugging | 7 dias |
| `@reciclamuz:feature_usage` | Quais features você mais usa | 30 dias |

**Por que usamos?**
- Entender como o app é utilizado
- Identificar e corrigir bugs
- Melhorar funcionalidades existentes
- Desenvolver novas features

---

## 3. Armazenamento Local (Local Storage)

Além de cookies, usamos **Local Storage** para armazenar dados localmente no seu dispositivo.

### 3.1 Dados Armazenados

```
AsyncStorage (React Native):
├── Sessão de autenticação (criptografada)
├── Preferências de usuário
├── Cache de pontos de coleta
├── Dados offline
└── Histórico de interações
```

### 3.2 Segurança

✅ **Dados sensíveis são criptografados** usando SHA-256
✅ **Tokens OAuth são protegidos** e nunca expostos
✅ **Dados locais não são compartilhados** com terceiros
✅ **Você pode limpar tudo** fazendo logout

---

## 4. Cookies de Terceiros

### 4.1 Provedores de Autenticação

**Google OAuth**
- Cookies: `GOOGLE_AUTH_STATE`, `OAUTH_TOKEN`
- Finalidade: Autenticação segura via Google
- Duração: Definida pelo Google
- Política: https://policies.google.com/privacy

**GitHub OAuth**
- Cookies: `GITHUB_AUTH_STATE`, `OAUTH_TOKEN`
- Finalidade: Autenticação segura via GitHub
- Duração: Definida pelo GitHub
- Política: https://docs.github.com/en/site-policy/privacy-policies

### 4.2 Infraestrutura (Expo)

**Expo Platform**
- Cookies: Cookies técnicos do Expo
- Finalidade: Funcionamento da infraestrutura do app
- Duração: Sessão
- Política: https://expo.dev/privacy

---

## 5. Como Gerenciar Cookies

### 5.1 Aceitar ou Recusar Cookies

**Ao primeiro acesso**, você verá um banner perguntando:

```
🍪 Este aplicativo usa cookies

Usamos cookies essenciais para autenticação e cookies
opcionais para melhorar sua experiência.

[⚙️ Personalizar]  [✅ Aceitar Tudo]  [❌ Apenas Essenciais]
```

### 5.2 Personalizar Preferências

Você pode personalizar quais cookies aceita:

1. Abra o aplicativo
2. Vá em **Perfil** > **Configurações**
3. Toque em **Privacidade e Cookies**
4. Escolha suas preferências:

```
🔴 Cookies Essenciais        [Sempre Ativo]
🟡 Cookies de Preferências    [    ON   ]
🔵 Cookies de Análise         [    OFF  ]
```

### 5.3 Limpar Cookies

Para limpar todos os cookies:

**Opção 1: Fazer Logout**
1. Vá em Perfil
2. Toque em "Sair"
3. Todos os cookies serão removidos

**Opção 2: Limpar Cache**
1. Perfil > Configurações
2. Privacidade e Cookies
3. "Limpar todos os dados"

**Opção 3: Desinstalar o App**
- Remove permanentemente todos os dados locais

---

## 6. Impacto de Recusar Cookies

### 6.1 Recusando Cookies Essenciais ❌

Se você recusar cookies essenciais:
- ❌ Não conseguirá fazer login
- ❌ Não poderá usar o aplicativo
- ❌ Sessão não será mantida

**Solução**: Cookies essenciais são necessários para funcionamento básico.

### 6.2 Recusando Cookies de Preferências ⚠️

Se você recusar cookies de preferências:
- ⚠️ Tema será redefinido a cada acesso
- ⚠️ Favoritos não serão salvos
- ⚠️ Terá que configurar preferências toda vez
- ✅ Funcionalidades principais continuam funcionando

### 6.3 Recusando Cookies de Análise ✅

Se você recusar cookies de análise:
- ✅ Nenhum impacto na experiência
- ✅ Todas as funcionalidades disponíveis
- ✅ Privacidade aumentada
- ℹ️ Não poderemos melhorar o app baseado no seu uso

---

## 7. Cookies e Privacidade (LGPD)

### 7.1 Conformidade com LGPD

De acordo com a **Lei Geral de Proteção de Dados (LGPD)**:

✅ **Transparência**: Informamos claramente sobre cookies
✅ **Consentimento**: Pedimos sua autorização (exceto essenciais)
✅ **Controle**: Você pode gerenciar suas preferências
✅ **Acesso**: Você pode ver quais dados armazenamos
✅ **Exclusão**: Você pode remover cookies a qualquer momento

### 7.2 Base Legal

- **Cookies Essenciais**: Execução de contrato (LGPD, Art. 7º, V)
- **Cookies Opcionais**: Consentimento (LGPD, Art. 7º, I)
- **Cookies de Análise**: Legítimo interesse (LGPD, Art. 7º, IX)

### 7.3 Seus Direitos

Você tem direito a:
- 📋 Saber quais cookies usamos
- ✏️ Modificar suas preferências
- 🗑️ Deletar cookies a qualquer momento
- ❌ Revogar consentimento
- 📧 Solicitar informações: [Inserir e-mail]

---

## 8. Cookies em Diferentes Plataformas

### 8.1 iOS (iPhone/iPad)

```
Armazenamento: AsyncStorage (criptografado pelo iOS)
Localização: Keychain (dados sensíveis)
Segurança: Proteção nativa do iOS
Duração: Até desinstalar o app
```

### 8.2 Android

```
Armazenamento: AsyncStorage (SQLite)
Localização: /data/data/com.reciclamuz/
Segurança: Sandbox do Android
Duração: Até desinstalar o app ou limpar cache
```

### 8.3 Web

```
Armazenamento: LocalStorage + SessionStorage
Localização: Navegador (localStorage)
Segurança: Same-origin policy
Duração: Até limpar dados do navegador
```

---

## 9. Segurança dos Cookies

### 9.1 Medidas de Proteção

Implementamos:

🔐 **Criptografia**: Dados sensíveis são criptografados (SHA-256)
🔒 **HTTPS**: Comunicação segura via SSL/TLS
🚫 **HttpOnly**: Cookies não acessíveis via JavaScript (quando aplicável)
🔑 **Secure Flag**: Cookies transmitidos apenas por HTTPS
⏱️ **Expiração**: Tokens expiram automaticamente

### 9.2 O que NÃO Fazemos

❌ **NÃO vendemos** dados de cookies
❌ **NÃO compartilhamos** com anunciantes
❌ **NÃO rastreamos** entre aplicativos
❌ **NÃO usamos** para profiling invasivo
❌ **NÃO armazenamos** senhas em cookies

---

## 10. Atualizações de Cookies

### 10.1 Novos Cookies

Se adicionarmos novos tipos de cookies:
1. ✉️ Você será notificado no aplicativo
2. 🔔 Pediremos novo consentimento (se necessário)
3. 📄 Atualizaremos esta política
4. 📅 Informaremos a data da mudança

### 10.2 Histórico de Alterações

| Data | Mudança |
|------|---------|
| 28/10/2025 | Versão inicial da política de cookies |

---

## 11. Perguntas Frequentes (FAQ)

### ❓ Cookies rastreiam minha localização o tempo todo?

**Não.** Apenas armazenamos sua preferência de consentimento de localização. A localização real é acessada apenas quando você abre o mapa, e não é armazenada permanentemente.

### ❓ Posso usar o app sem aceitar cookies?

**Parcialmente.** Cookies essenciais são obrigatórios para login e autenticação. Mas você pode recusar cookies opcionais e ainda usar o app normalmente.

### ❓ Meus dados de cookies são compartilhados?

**Não vendemos ou compartilhamos** dados de cookies com terceiros para fins comerciais. Apenas provedores essenciais (Google/GitHub para OAuth) têm acesso a cookies de autenticação.

### ❓ Como sei quais cookies estão ativos?

Acesse **Perfil > Configurações > Privacidade e Cookies > Ver Cookies Ativos**. Lá você verá uma lista de todos os cookies armazenados.

### ❓ Cookies expiram?

**Sim.** Cookies de sessão expiram em 7 dias. Cookies de preferência são permanentes até você limpá-los. Você pode ver a data de expiração na seção de Cookies Ativos.

---

## 12. Contato

Para dúvidas sobre cookies:

📧 **E-mail**: [Inserir e-mail de contato]
📱 **Suporte no App**: Perfil > Ajuda > "Falar com Suporte"
📍 **Localização**: Muzambinho - MG, Brasil

---

## 13. Links Úteis

- 📜 [Política de Privacidade](./POLITICA_PRIVACIDADE.md)
- 📋 [Termos de Uso](./TERMOS_USO.md)
- 🇧🇷 [LGPD - Lei 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- 🏛️ [ANPD - Autoridade Nacional de Proteção de Dados](https://www.gov.br/anpd/)

---

**ReciclaMuz** - Transparência e respeito à sua privacidade 🍪✅

*Versão 1.0 - Outubro de 2025*
