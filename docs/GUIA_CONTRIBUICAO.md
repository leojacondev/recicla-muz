# 🤝 Guia de Contribuição - Recicla-Muz

**Autor**: Anderson Henrique da Silva - COMP VIII
**Criado em**: 21 de outubro de 2025 às 17:30 BRT
**Versão**: 1.0

---

## 👋 Bem-vindo!

Obrigado por considerar contribuir com o Recicla-Muz! Este guia irá ajudá-lo a fazer contribuições de forma eficiente e alinhada com os padrões do projeto.

---

## 📋 Índice

1. [Código de Conduta](#-código-de-conduta)
2. [Como Começar](#-como-começar)
3. [Workflow de Desenvolvimento](#-workflow-de-desenvolvimento)
4. [Padrões de Código](#-padrões-de-código)
5. [Commits](#-commits)
6. [Pull Requests](#-pull-requests)
7. [Testes](#-testes)
8. [Documentação](#-documentação)
9. [Obtendo Ajuda](#-obtendo-ajuda)

---

## 📜 Código de Conduta

### Nossos Compromissos

- 🤝 Ser respeitoso e inclusivo
- 💬 Comunicação construtiva e profissional
- 🎯 Focar no que é melhor para a comunidade
- 🙏 Mostrar empatia com outros membros

### Comportamentos Inaceitáveis

- ❌ Linguagem ofensiva ou discriminatória
- ❌ Ataques pessoais ou políticos
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas sem permissão

---

## 🚀 Como Começar

### 1. Pré-requisitos

```bash
# Versões necessárias
Node.js >= 20.18.1
npm >= 9.2.0
Git >= 2.0
```

### 2. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork:
git clone https://github.com/SEU-USUARIO/recicla-muz.git
cd recicla-muz

# Adicione o repositório original como upstream
git remote add upstream https://github.com/leojacondev/recicla-muz.git
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Ambiente

```bash
# Copie o template de variáveis de ambiente
cp .env.example .env

# Edite .env e adicione suas credenciais OAuth
# Consulte: docs/GUIA_CONFIGURACAO_OAUTH.md
```

### 5. Executar o Projeto

```bash
# Iniciar servidor de desenvolvimento
npm start

# Opções:
# - Pressione 'i' para iOS
# - Pressione 'a' para Android
# - Pressione 'w' para Web
```

---

## 🔄 Workflow de Desenvolvimento

### Estrutura de Branches

```
main                    # Branch de produção (protegida)
  └── development       # Branch de desenvolvimento principal
       └── feat/*       # Features individuais
       └── fix/*        # Correções de bugs
       └── docs/*       # Atualizações de documentação
       └── refactor/*   # Refatorações de código
```

### Criar Nova Branch

```bash
# Sempre crie branches a partir da main atualizada
git checkout main
git pull upstream main

# Crie sua branch de feature
git checkout -b feat/nome-da-feature

# Exemplos:
git checkout -b feat/biometric-auth
git checkout -b fix/login-error-handling
git checkout -b docs/update-readme
```

### Nomenclatura de Branches

**Formato**: `tipo/descricao-curta`

**Tipos**:
- `feat/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `refactor/` - Refatoração sem mudar funcionalidade
- `test/` - Adição ou correção de testes
- `chore/` - Tarefas de manutenção
- `style/` - Formatação de código

**Exemplos**:
```
feat/push-notifications
fix/map-crash-on-android
docs/contributing-guide
refactor/auth-context-structure
test/login-flow
chore/update-dependencies
style/format-login-screen
```

---

## 📝 Padrões de Código

### TypeScript

**Sempre use tipos explícitos**:
```typescript
// ✅ Bom
const userName: string = 'João';
function getUserData(id: string): User {
  // ...
}

// ❌ Ruim
const userName = 'João';  // tipo implícito
function getUserData(id) {  // sem tipos
  // ...
}
```

**Evite `any`, use `unknown` se necessário**:
```typescript
// ✅ Bom
const data: unknown = JSON.parse(response);
if (typeof data === 'object' && data !== null) {
  // type guard
}

// ❌ Ruim
const data: any = JSON.parse(response);
```

**Use interfaces para objetos**:
```typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Ruim (use type para unions/primitivos)
type User = {
  id: string;
  name: string;
  email: string;
}
```

### React / React Native

**Componentes Funcionais**:
```typescript
// ✅ Bom
export function MyComponent({ title }: { title: string }) {
  return <Text>{title}</Text>;
}

// ❌ Ruim (class components)
export class MyComponent extends React.Component {
  // ...
}
```

**Hooks**:
```typescript
// ✅ Bom - sempre no topo do componente
function MyComponent() {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  // lógica do componente
  return <View>...</View>;
}

// ❌ Ruim - hooks condicionais
function MyComponent() {
  if (condition) {
    const [count, setCount] = useState(0);  // ERRO!
  }
}
```

### Estilos

**Use StyleSheet.create()**:
```typescript
// ✅ Bom
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

// ❌ Ruim (inline styles em produção)
<View style={{ flex: 1, padding: 16 }} />
```

**Separe estilos em arquivos `.styles.ts`**:
```
MyComponent/
  ├── MyComponent.tsx
  ├── MyComponent.styles.ts  ✅
  └── index.ts
```

### Nomenclatura

**Variáveis e Funções**:
```typescript
// camelCase
const userName = 'João';
function getUserData() {}

// Constantes em UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
```

**Componentes e Interfaces**:
```typescript
// PascalCase
interface UserProfile {}
type AuthProvider = 'google' | 'github';
function LoginScreen() {}
```

---

## 💬 Commits

### Conventional Commits

**Formato**:
```
tipo(escopo): descrição curta em inglês

Descrição detalhada (opcional)
- O que foi feito
- Por que foi feito
- Impacto esperado
```

### Tipos de Commit

```
feat      - Nova funcionalidade
fix       - Correção de bug
docs      - Documentação
style     - Formatação (não afeta lógica)
refactor  - Refatoração de código
test      - Testes
chore     - Tarefas de manutenção
perf      - Melhorias de performance
ci        - Integração contínua
build     - Build system
revert    - Reverter commit anterior
```

### Exemplos de Commits

```bash
# Feature
git commit -m "feat(auth): implement Google OAuth login flow"

# Fix
git commit -m "fix(map): resolve crash when location permission denied"

# Docs
git commit -m "docs(readme): add setup instructions for OAuth"

# Refactor
git commit -m "refactor(storage): simplify encryption logic"

# Com descrição detalhada
git commit -m "feat(profile): add user avatar upload

- Integrate with expo-image-picker
- Add image compression before upload
- Update SecureStorage to handle image URLs
- Add loading state during upload"
```

### ❌ Commits Proibidos

```bash
# ❌ Vago
git commit -m "fix stuff"
git commit -m "updates"

# ❌ Muito longo no título
git commit -m "feat(auth): implement Google OAuth login flow with redirect handling and error states and loading indicators and..."

# ❌ Mencionar ferramentas de IA
git commit -m "feat: add feature (generated with Claude Code)"  # NUNCA!
git commit -m "fix: bug (AI-assisted)"  # NUNCA!
```

### ✅ Boas Práticas

- 📏 Título com no máximo 60 caracteres
- 🔤 Usar verbos no imperativo ("add", não "added")
- 🌍 Commits em **inglês** (padrão internacional)
- 🎯 Um commit = uma mudança lógica
- 📝 Descrição detalhada quando necessário

---

## 🔀 Pull Requests

### Antes de Criar um PR

**Checklist**:
```bash
# 1. Atualizar com main
git checkout main
git pull upstream main
git checkout sua-branch
git rebase main

# 2. Verificar código
npm run lint      # (se disponível)
npm run type-check  # TypeScript

# 3. Testar
npm start
# Testar em iOS/Android/Web

# 4. Commitar tudo
git status  # verificar que não há mudanças pendentes
```

### Criar Pull Request

**Título do PR**:
```
tipo(escopo): descrição clara em inglês

Exemplos:
feat(auth): add GitHub OAuth support
fix(map): resolve marker rendering issue
docs(oauth): update setup guide with screenshots
```

**Descrição do PR** (template):
```markdown
## 📝 Descrição

Breve descrição do que foi implementado/corrigido.

## 🎯 Motivação

Por que esta mudança é necessária?

## 🔧 Mudanças

- [x] Implementado X
- [x] Corrigido Y
- [x] Atualizado Z

## 📸 Screenshots (se aplicável)

[Adicione capturas de tela]

## ✅ Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (se aplicável)
- [ ] Documentação atualizada
- [ ] Commits seguem Conventional Commits
- [ ] PR tem título descritivo

## 🔗 Issues Relacionadas

Closes #123
Relates to #456
```

### Revisão de Código

**Como Autor do PR**:
- ✅ Responda comentários educadamente
- ✅ Faça mudanças solicitadas prontamente
- ✅ Use `git commit --amend` para pequenas correções
- ✅ Force push com cuidado: `git push --force-with-lease`

**Como Revisor**:
- ✅ Seja construtivo e respeitoso
- ✅ Sugira melhorias, não apenas critique
- ✅ Teste o código localmente se possível
- ✅ Aprove quando estiver satisfeito

---

## 🧪 Testes

### Testes Manuais

**Checklist de Testes**:
```
Login Flow:
  □ Google OAuth funciona
  □ GitHub OAuth funciona
  □ Logout limpa sessão
  □ Sessão persiste após reiniciar app

Navigation:
  □ Rotas protegidas redirecionam para login
  □ Header atualiza com estado de auth
  □ Navegação entre telas funciona

Theme:
  □ Tema claro funciona
  □ Tema escuro funciona
  □ Transição suave entre temas

Platforms:
  □ iOS funciona
  □ Android funciona
  □ Web funciona
```

### Testes Automatizados (Futuro)

Quando implementarmos testes unitários:
```bash
npm test                # Executar todos os testes
npm test -- --watch     # Modo watch
npm test -- --coverage  # Com cobertura
```

---

## 📚 Documentação

### Quando Atualizar Documentação

**Sempre atualize quando**:
- ✅ Adicionar nova feature
- ✅ Mudar comportamento existente
- ✅ Adicionar/remover dependências
- ✅ Modificar configuração
- ✅ Corrigir informações incorretas

### Documentos Importantes

```
docs/
  ├── ROADMAP_SPRINT_OAUTH_LOGIN.md    # Planejamento
  ├── GUIA_CONFIGURACAO_OAUTH.md       # Setup OAuth
  ├── CHANGELOG_SPRINT.md              # Progresso
  ├── ESTRUTURA_PROJETO.md             # Organização
  ├── GUIA_CONTRIBUICAO.md             # Este arquivo
  └── arquitetura/
      └── SISTEMA_AUTENTICACAO.md      # Arquitetura
```

### Padrão de Documentação

**Sempre inclua**:
```markdown
# Título do Documento

**Autor**: Seu Nome
**Criado em**: DD de mês de YYYY às HH:MM BRT
**Versão**: 1.0
**Última Atualização**: DD de mês de YYYY

---

## Conteúdo aqui...
```

---

## 🆘 Obtendo Ajuda

### Canais de Comunicação

**GitHub Issues**:
- 🐛 Reportar bugs
- 💡 Sugerir features
- ❓ Fazer perguntas

**Documentação**:
- 📖 Leia primeiro a documentação em `docs/`
- 🔍 Use a busca do GitHub

### Como Reportar Bugs

**Template**:
```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do bug.

## 📋 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Veja o erro

## 🎯 Comportamento Esperado

O que deveria acontecer.

## 📸 Screenshots

[Se aplicável]

## 💻 Ambiente

- OS: [ex: iOS 17.0]
- Device: [ex: iPhone 14 Pro]
- App Version: [ex: 1.0.0]

## 📝 Informações Adicionais

Qualquer outro contexto relevante.
```

---

## 🎨 Padrões Visuais

### Cores do App

```typescript
Primary Green: #4caf50
Dark Green: #2d5016
Secondary: #2e7d32
Background Light: #ffffff
Background Dark: #000000
```

### Ícones

**Use Ionicons** (via `@expo/vector-icons`):
```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="home" size={24} color="black" />
```

---

## ✅ Checklist Final Antes do PR

```
Code:
  □ Código funciona localmente
  □ Sem console.logs desnecessários
  □ Sem comentários de debug
  □ TypeScript sem erros
  □ Imports organizados

Commits:
  □ Conventional Commits seguidos
  □ Mensagens em inglês
  □ Sem menções a ferramentas de IA

Testes:
  □ Testado em pelo menos 2 plataformas
  □ Fluxos principais funcionam
  □ Edge cases considerados

Documentação:
  □ README atualizado (se necessário)
  □ Comentários no código quando pertinente
  □ Docs técnicos atualizados

PR:
  □ Título descritivo
  □ Descrição completa
  □ Screenshots adicionados
  □ Issues linkadas
```

---

## 🌟 Reconhecimento

Contribuidores serão adicionados ao README.md e terão seus nomes no changelog das releases!

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

## 🙏 Obrigado!

Suas contribuições fazem o Recicla-Muz melhor para todos! 🚀

---

**Última Atualização**: 21 de outubro de 2025 às 17:30 BRT
**Responsável**: Anderson Henrique da Silva - COMP VIII
**Versão**: 1.0
