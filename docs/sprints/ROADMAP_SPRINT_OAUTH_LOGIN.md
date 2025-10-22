# 🚀 Roadmap de Sprint - Implementação de Login OAuth

**Autor**: Anderson Henrique da Silva - COMP VIII
**Criado em**: 21 de outubro de 2025 (Terça-feira) às 14:30 BRT
**Duração da Sprint**: 5 dias (21-25 de outubro de 2025)
**Meta**: 25 commits (5 commits/dia)
**Funcionalidade**: Login OAuth (Google/GitHub) com Armazenamento Local

---

## 📋 Contexto do Projeto

**Projeto**: Recicla-Muz
**Branch**: `feat/login`
**Branch Base**: `main`
**Stack Tecnológica**: React Native (Expo), TypeScript, Expo Router, AsyncStorage
**Localização**: Muzambinho, Minas Gerais, Brasil

---

## 🎯 Objetivos da Sprint

### Objetivos Principais
1. ✅ Implementar autenticação OAuth (Google + GitHub)
2. ✅ Armazenamento local para persistência de sessão (SEM backend/banco de dados)
3. ✅ Rotas protegidas e guardas de navegação
4. ✅ Consentimento de cookies e políticas de privacidade
5. ✅ Estrutura completa de documentação

### Critérios de Sucesso
- [x] Usuários conseguem fazer login com Google OAuth
- [x] Usuários conseguem fazer login com GitHub OAuth
- [x] Sessão persiste ao reiniciar o aplicativo
- [x] Rotas protegidas redirecionam para login
- [x] Política de privacidade e consentimento de cookies implementados
- [x] Toda documentação completa e revisada

---

## 📅 Detalhamento da Sprint de 5 Dias

### **DIA 1: Configuração da Infraestrutura OAuth** (21 de outubro de 2025)

**Foco**: Fundação e infraestrutura de autenticação

#### Commits (5):
1. **docs: cria roadmap de sprint e estrutura de documentação**
   - Criar estrutura de pastas `/docs`
   - Documento de roadmap da sprint
   - Placeholders para diagramas de arquitetura

2. **chore: instala dependências OAuth e armazenamento**
   - `expo-auth-session` para fluxos OAuth
   - `expo-web-browser` para redirecionamentos de autenticação
   - `@react-native-async-storage/async-storage`
   - `expo-crypto` para manipulação segura de tokens

3. **feat(auth): cria AuthContext com configuração de provedores OAuth**
   - `/contexts/AuthContext.tsx`
   - Configuração OAuth do Google
   - Configuração OAuth do GitHub
   - Interface de estado do usuário

4. **feat(storage): implementa serviço de armazenamento seguro para tokens de autenticação**
   - `/services/SecureStorage.ts`
   - Utilitários de criptografia/descriptografia de tokens
   - Wrapper do AsyncStorage com segurança

5. **config: configura credenciais de aplicativos OAuth e URIs de redirecionamento**
   - Atualizar `app.json` com esquemas OAuth
   - Configuração de ambiente para chaves OAuth
   - Configuração de URI de redirecionamento

**Entregas**:
- ✅ Estrutura de documentação criada
- ✅ Dependências OAuth instaladas
- ✅ Esqueleto do AuthContext pronto
- ✅ Serviço de armazenamento implementado
- ✅ Configuração OAuth completa

---

### **DIA 2: Interface de Login e Fluxo OAuth** (22 de outubro de 2025)

**Foco**: Interface do usuário e lógica de autenticação

#### Commits (5):
1. **feat(ui): cria componente de tela de Login com botões OAuth**
   - Rota `/app/login.tsx`
   - Pasta `/components/LoginScreen/`
   - Botão de login do Google com ícone
   - Botão de login do GitHub com ícone
   - Estados de carregamento

2. **style(login): implementa estilização da tela de login com suporte a tema**
   - `LoginScreen.styles.ts`
   - Variantes de tema claro/escuro
   - Layout responsivo
   - Integração de cores da marca

3. **feat(auth): implementa fluxo de autenticação OAuth do Google**
   - Lógica de sign-in do Google no AuthContext
   - Manipulação de troca de tokens
   - Busca de perfil do usuário
   - Tratamento de erros

4. **feat(auth): implementa fluxo de autenticação OAuth do GitHub**
   - Lógica de sign-in do GitHub
   - Gerenciamento de tokens
   - Normalização de dados do usuário
   - Estados de erro

5. **feat(auth): adiciona funcionalidade de logout e atualização de token**
   - Método de logout no AuthContext
   - Limpar armazenamento no logout
   - Tratamento de expiração de token
   - Lógica de auto-renovação

**Entregas**:
- ✅ Tela de login totalmente projetada
- ✅ OAuth do Google funcionando
- ✅ OAuth do GitHub funcionando
- ✅ Logout implementado
- ✅ UI adaptada ao tema

---

### **DIA 3: Persistência de Sessão e Proteção de Rotas** (23 de outubro de 2025)

**Foco**: Integração de armazenamento e segurança de navegação

#### Commits (5):
1. **feat(storage): implementa persistência de sessão de autenticação com AsyncStorage**
   - Salvar tokens em login bem-sucedido
   - Carregar sessão na inicialização do app
   - Armazenamento seguro de tokens
   - Validação de sessão

2. **feat(navigation): adiciona guardas de rota para telas protegidas**
   - Atualizar `app/_layout.tsx` com verificações de autenticação
   - Lógica de redirecionamento para usuários não autenticados
   - Wrapper de rota protegida
   - Definição de rotas públicas

3. **feat(profile): cria tela de perfil do usuário com dados OAuth**
   - Rota `/app/profile.tsx`
   - Exibir informações do usuário (nome, email, avatar)
   - Badge do provedor da conta (Google/GitHub)
   - Botão de logout

4. **refactor(header): integra estado de autenticação no componente Header**
   - Mostrar login/logout baseado no estado de autenticação
   - Avatar do usuário no header quando logado
   - Navegação para perfil a partir do header
   - Itens de menu condicionais

5. **fix(auth): trata casos extremos e cenários de erro**
   - Tratamento de cancelamento de OAuth
   - Recuperação de erros de rede
   - Limpeza de tokens inválidos
   - Tratamento de timeout de sessão

**Entregas**:
- ✅ Sessões persistem ao reiniciar o app
- ✅ Rotas protegidas funcionais
- ✅ Tela de perfil completa
- ✅ Header integrado com autenticação
- ✅ Tratamento de erros robusto

---

### **DIA 4: Privacidade, Cookies e Conformidade Legal** (24 de outubro de 2025)

**Foco**: Documentação legal e consentimento de cookies

#### Commits (5):
1. **docs(privacy): cria documento abrangente de política de privacidade**
   - `/docs/policies/POLITICA_PRIVACIDADE.md`
   - Divulgação de coleta de dados
   - Informações sobre provedores OAuth
   - Direitos do usuário (conforme LGPD)
   - Informações de contato

2. **docs(cookies): cria documentação de política de cookies**
   - `/docs/policies/POLITICA_COOKIES.md`
   - Tipos de cookies usados (sessão, preferências)
   - Cookies de terceiros (provedores OAuth)
   - Mecanismos de consentimento do usuário
   - Instruções de gerenciamento de cookies

3. **feat(consent): implementa componente de banner de consentimento de cookies**
   - Pasta `/components/CookieConsent/`
   - Design de bottom sheet ou modal
   - Botões Aceitar/Recusar
   - Link para política de privacidade
   - Persistência de consentimento no armazenamento

4. **feat(settings): adiciona tela de configurações de privacidade**
   - Rota `/app/settings.tsx`
   - Visualizar política de privacidade no app
   - Visualizar política de cookies no app
   - Gerenciar preferências de consentimento
   - Opção de limpar armazenamento

5. **docs(terms): cria documento de termos de serviço**
   - `/docs/policies/TERMOS_SERVICO.md`
   - Termos de uso do serviço
   - Responsabilidades do usuário
   - Limitações de responsabilidade
   - Resolução de disputas

**Entregas**:
- ✅ Política de privacidade completa (conforme LGPD)
- ✅ Política de cookies documentada
- ✅ UI de consentimento de cookies funcional
- ✅ Tela de configurações com controles de privacidade
- ✅ Termos de serviço redigidos

---

### **DIA 5: Testes, Refinamentos e Integração Final** (25 de outubro de 2025)

**Foco**: Garantia de qualidade e finalização da documentação

#### Commits (5):
1. **test(auth): adiciona testes abrangentes do fluxo de autenticação**
   - Testar fluxo OAuth do Google
   - Testar fluxo OAuth do GitHub
   - Testar persistência de sessão
   - Testar funcionalidade de logout
   - Testar proteção de rotas

2. **docs(architecture): documenta arquitetura do sistema de autenticação**
   - `/docs/architecture/SISTEMA_AUTENTICACAO.md`
   - Diagramas de fluxo do sistema
   - Mapas de interação de componentes
   - Estrutura de armazenamento
   - Considerações de segurança

3. **docs(setup): cria guia de configuração OAuth para desenvolvedores**
   - `/docs/GUIA_CONFIGURACAO_OAUTH.md`
   - Configuração do Google Cloud Console
   - Configuração de aplicativo OAuth do GitHub
   - Guia de variáveis de ambiente
   - Seção de solução de problemas

4. **refactor(auth): otimiza performance e adiciona melhorias de carregamento**
   - Otimizar validação de tokens
   - Adicionar skeleton loaders
   - Melhorar animações de transição
   - Reduzir re-renders
   - Limpeza de código

5. **docs(readme): atualiza README principal com documentação da funcionalidade de login**
   - Adicionar seção de funcionalidade de login
   - Atualizar instruções de configuração
   - Adicionar passos de configuração OAuth
   - Atualizar capturas de tela
   - Adicionar notas para colaboradores

**Entregas**:
- ✅ Todos os fluxos de autenticação testados
- ✅ Arquitetura documentada
- ✅ Guia de configuração para desenvolvedores completo
- ✅ Performance otimizada
- ✅ README atualizado

---

## 🏗️ Visão Geral da Arquitetura Técnica

### Fluxo de Autenticação
```
Usuário clica em "Entrar com Google/GitHub"
    ↓
Expo AuthSession abre o navegador
    ↓
Autenticação no provedor OAuth
    ↓
Redirecionamento de volta ao app com código de autenticação
    ↓
Troca de código por tokens (simulado localmente)
    ↓
Armazenar tokens criptografados no AsyncStorage
    ↓
Atualizar estado do AuthContext
    ↓
Navegar para rota protegida
```

### Estrutura de Armazenamento
```typescript
Chaves do AsyncStorage:
- @reciclamuz:auth_token      // Token OAuth criptografado
- @reciclamuz:user_data       // Dados do perfil do usuário
- @reciclamuz:auth_provider   // "google" | "github"
- @reciclamuz:cookie_consent  // true | false
- @reciclamuz:session_expiry  // Timestamp
```

### Hierarquia de Componentes
```
App (_layout.tsx)
├── ThemeProvider
├── AuthProvider
│   ├── CookieConsent (primeiro lançamento)
│   └── Rotas
│       ├── Rotas Públicas
│       │   └── /login
│       └── Rotas Protegidas
│           ├── / (home)
│           ├── /map
│           ├── /profile
│           └── /settings
```

---

## 📦 Dependências a Instalar

### Autenticação Principal
```json
{
  "expo-auth-session": "~6.0.1",
  "expo-web-browser": "~15.0.7",
  "expo-crypto": "~15.0.1"
}
```

### Armazenamento
```json
{
  "@react-native-async-storage/async-storage": "^2.1.0"
}
```

### Opcional (para UX aprimorada)
```json
{
  "expo-haptics": "~15.0.1",
  "react-native-reanimated": "~4.1.0"
}
```

---

## 🔒 Considerações de Segurança

### Gerenciamento de Tokens
- **Criptografia**: Todos os tokens criptografados antes do armazenamento
- **Expiração**: Tokens expiram após 7 dias (configurável)
- **Armazenamento Seguro**: Usar AsyncStorage com camada de criptografia
- **Sem Texto Simples**: Nunca armazenar dados sensíveis sem criptografia

### Melhores Práticas OAuth
- **Parâmetro State**: Usar para proteção CSRF
- **Code Verifier**: PKCE para fluxos OAuth móveis
- **Validação de Redirecionamento**: Verificar URIs de redirecionamento
- **Validação de Token**: Validar tokens antes de usar

### Conformidade com Privacidade
- **LGPD (Brasil)**: Consentimento do usuário necessário
- **Transparência**: Divulgação clara do uso de dados
- **Controle do Usuário**: Mecanismos fáceis de opt-out
- **Direito ao Esquecimento**: Capacidade de deletar dados

---

## 📊 Métricas de Sucesso

### Métricas Funcionais
- [ ] 100% de taxa de sucesso OAuth (ambos provedores)
- [ ] <2s tempo médio de login
- [ ] 0 falhas de armazenamento de tokens
- [ ] 100% de cobertura de proteção de rotas

### Métricas de Documentação
- [ ] Todos os docs completos e revisados
- [ ] 0 links internos quebrados
- [ ] Guia de configuração para desenvolvedores testado por pares
- [ ] Políticas de privacidade revisadas legalmente

### Qualidade de Código
- [ ] 0 erros TypeScript
- [ ] 0 avisos ESLint
- [ ] Todos os commits seguem formato convencional
- [ ] Código revisado antes do merge

---

## 🚨 Gerenciamento de Riscos

### Bloqueios Potenciais
1. **Problemas de Configuração OAuth**
   - **Mitigação**: Testar cedo no Dia 1
   - **Fallback**: Usar autenticação mock para testes

2. **Complexidade de Criptografia de Armazenamento**
   - **Mitigação**: Usar bibliotecas testadas em batalha
   - **Fallback**: Codificação básica se criptografia falhar

3. **Casos Extremos de Proteção de Rotas**
   - **Mitigação**: Testes abrangentes no Dia 5
   - **Fallback**: Forçar logout em erros

4. **Lacunas de Conformidade Legal**
   - **Mitigação**: Pesquisar requisitos da LGPD no Dia 4
   - **Fallback**: Consultar recursos legais online

---

## 📝 Formato de Daily Standup

### Cada Dia (5-10 minutos)
1. **Ontem**: Commits concluídos
2. **Hoje**: Commits planejados
3. **Bloqueios**: Quaisquer problemas encontrados
4. **Notas**: Descobertas ou melhorias

---

## 🎉 Checklist de Conclusão da Sprint

### Código
- [ ] Todos os 25 commits concluídos
- [ ] Branch `feat/login` atualizada
- [ ] Sem conflitos de merge com `main`
- [ ] Todos os erros TypeScript resolvidos
- [ ] App compila com sucesso (iOS/Android/Web)

### Documentação
- [ ] Roadmap da sprint completo
- [ ] Política de privacidade finalizada
- [ ] Política de cookies finalizada
- [ ] Termos de serviço redigidos
- [ ] Arquitetura documentada
- [ ] Guia de configuração OAuth completo
- [ ] README atualizado

### Testes
- [ ] Testes manuais concluídos
- [ ] Fluxos OAuth verificados (Google + GitHub)
- [ ] Persistência de sessão testada
- [ ] Proteção de rotas validada
- [ ] Consentimento de cookies funcionando
- [ ] Compatibilidade multiplataforma confirmada

### Revisão
- [ ] Código auto-revisado
- [ ] Documentação revisada
- [ ] Revisão por pares solicitada
- [ ] PR criado com descrição detalhada
- [ ] Capturas de tela/demos preparados

---

## 🔄 Ações Pós-Sprint

### Imediato (Dia 6)
1. Criar PR: `feat/login` → `main`
2. Solicitar revisão de código da equipe
3. Abordar feedback de revisão
4. Fazer merge para `main` uma vez aprovado

### Acompanhamento (Semana 2)
1. Monitorar taxas de sucesso de login
2. Coletar feedback dos usuários
3. Abordar quaisquer bugs reportados
4. Planejar melhorias de autenticação (biometria, etc.)

---

## 📚 Documentação de Referência

### Documentação Oficial
- [Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Configuração OAuth do Google](https://developers.google.com/identity/protocols/oauth2)
- [Aplicativos OAuth do GitHub](https://docs.github.com/pt/developers/apps/building-oauth-apps)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

### Recursos Legais
- [LGPD (Brasil)](https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd)
- [Guia de Lei de Cookies](https://www.cookielaw.org/)

---

## 🤝 Notas de Colaboração

### Comunicação
- Commits diários enviados para branch `feat/login`
- Atualizações de progresso na ferramenta de gerenciamento de projetos
- Bloqueios levantados imediatamente no chat da equipe
- Documentação revisada por pares

### Padrões de Código
- Seguir padrões existentes do projeto
- Usar modo TypeScript strict
- Manter estrutura de componentes (componente/estilos/índice)
- Escrever mensagens de commit descritivas (commits convencionais)

---

## 🎯 Visão de Longo Prazo

### Melhorias Futuras (Pós-Sprint)
- Autenticação biométrica (Face ID, Impressão Digital)
- Autenticação multi-fator (2FA)
- Expansão de login social (Apple, Facebook)
- Integração de backend para sincronização de dados do usuário
- Análises avançadas sobre padrões de login

### Considerações de Escalabilidade
- Armazenamento local atual funciona para MVP
- Futuro: Integração de API backend pronta
- Caminho de migração de banco de dados documentado
- Considerações de sincronização multi-dispositivo anotadas

---

**Versão do Documento**: 1.0
**Última Atualização**: 21 de outubro de 2025 às 14:30 BRT
**Próxima Revisão**: 25 de outubro de 2025 (Fim da sprint)

---

_Este roadmap é um documento vivo e pode ser ajustado baseado no progresso da sprint e bloqueios encontrados._
