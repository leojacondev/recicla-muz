# 📁 Estrutura do Projeto Recicla-Muz

**Autor**: Anderson Henrique da Silva - COMP VIII
**Criado em**: 21 de outubro de 2025 às 17:15 BRT
**Versão**: 1.0
**Última Atualização**: 21 de outubro de 2025

---

## 🌳 Árvore de Diretórios

```
recicla-muz/
│
├── 📱 app/                          # Rotas Expo Router (file-based routing)
│   ├── _layout.tsx                 # Layout raiz com providers
│   ├── index.tsx                   # Tela inicial (home)
│   ├── map.tsx                     # Tela de mapa
│   ├── login.tsx                   # 🚧 Tela de login (Dia 2)
│   ├── profile.tsx                 # 🚧 Perfil do usuário (Dia 3)
│   ├── settings.tsx                # 🚧 Configurações (Dia 4)
│   ├── +html.tsx                   # Wrapper HTML para web
│   └── +not-found.tsx              # Tela 404
│
├── 🧩 components/                   # Componentes reutilizáveis
│   ├── Header/                     # Header com menu e tema
│   │   ├── Header.tsx              # Componente principal
│   │   ├── Header.styles.ts        # Estilos
│   │   └── index.ts                # Barrel export
│   │
│   ├── HomeScreen/                 # Tela inicial
│   │   ├── HomeScreen.tsx
│   │   ├── HomeScreen.styles.ts
│   │   └── index.ts
│   │
│   ├── MapScreen/                  # Componente de mapa
│   │   ├── MapScreen.tsx
│   │   ├── MapScreen.styles.ts
│   │   └── index.ts
│   │
│   ├── LoginScreen/                # 🚧 Tela de login (Dia 2)
│   │   ├── LoginScreen.tsx
│   │   ├── LoginScreen.styles.ts
│   │   └── index.ts
│   │
│   ├── CookieConsent/              # 🚧 Banner de cookies (Dia 4)
│   │   ├── CookieConsent.tsx
│   │   ├── CookieConsent.styles.ts
│   │   └── index.ts
│   │
│   ├── Themed.tsx                  # Componentes com suporte a tema
│   ├── StyledText.tsx              # Texto estilizado
│   ├── useColorScheme.ts           # Hook de esquema de cores
│   ├── useColorScheme.web.ts       # Versão web
│   ├── useClientOnlyValue.ts       # Hook client-only
│   └── useClientOnlyValue.web.ts   # Versão web
│
├── 🎨 contexts/                     # React Context providers
│   ├── ThemeContext.tsx            # Gerenciamento de tema (light/dark)
│   └── AuthContext.tsx             # ✅ Gerenciamento de autenticação (Dia 1)
│
├── 🛠️ services/                     # Serviços e utilitários
│   └── SecureStorage.ts            # ✅ Armazenamento seguro (Dia 1)
│
├── 🎨 constants/                    # Constantes e configurações
│   └── Colors.ts                   # Paleta de cores do app
│
├── 🖼️ assets/                       # Assets estáticos
│   ├── images/                     # Imagens e ícones
│   │   ├── icon.png                # Ícone do app
│   │   ├── splash-icon.png         # Tela splash
│   │   ├── adaptive-icon.png       # Ícone adaptativo (Android)
│   │   └── favicon.png             # Favicon (Web)
│   │
│   └── fonts/                      # Fontes customizadas
│       └── SpaceMono-Regular.ttf   # Fonte monospace
│
├── 📚 docs/                         # Documentação do projeto
│   ├── sprints/                    # Documentação de sprints
│   │   └── ROADMAP_SPRINT_OAUTH_LOGIN.md  # ✅ Roadmap 5 dias (Dia 1)
│   │
│   ├── politicas/                  # Políticas e termos
│   │   ├── POLITICA_PRIVACIDADE.md # 🚧 Política de privacidade (Dia 4)
│   │   ├── POLITICA_COOKIES.md     # 🚧 Política de cookies (Dia 4)
│   │   └── TERMOS_SERVICO.md       # 🚧 Termos de serviço (Dia 4)
│   │
│   ├── arquitetura/                # Documentação técnica
│   │   └── SISTEMA_AUTENTICACAO.md # ✅ Arquitetura de autenticação (Dia 1)
│   │
│   ├── GUIA_CONFIGURACAO_OAUTH.md  # ✅ Guia de setup OAuth (Dia 1)
│   ├── CHANGELOG_SPRINT.md         # ✅ Log de progresso da sprint (Dia 1)
│   └── ESTRUTURA_PROJETO.md        # 📝 Este arquivo
│
├── ⚙️ Arquivos de Configuração
│   ├── .gitignore                  # ✅ Arquivos ignorados (Claude, .env) (Dia 1)
│   ├── .env.example                # ✅ Template de variáveis de ambiente (Dia 1)
│   ├── .env                        # ❌ Não versionado (credenciais locais)
│   ├── app.json                    # ✅ Configuração Expo + OAuth (Dia 1)
│   ├── package.json                # ✅ Dependências do projeto (Dia 1)
│   ├── tsconfig.json               # Configuração TypeScript
│   ├── babel.config.js             # Configuração Babel
│   ├── metro.config.js             # Configuração Metro bundler
│   └── README.md                   # 🚧 Documentação principal (atualizar Dia 5)
│
└── 🚫 Pastas Ignoradas (.gitignore)
    ├── node_modules/               # Dependências npm
    ├── .expo/                      # Cache Expo
    ├── .vscode/                    # Configurações VS Code
    ├── .cursor/                    # Configurações Cursor
    ├── .claude/                    # ✅ Arquivos Claude AI (Dia 1)
    ├── .idea/                      # Configurações IntelliJ/WebStorm
    ├── ios/                        # Build nativo iOS
    └── android/                    # Build nativo Android
```

---

## 📦 Descrição Detalhada dos Diretórios

### 📱 `/app` - Rotas e Páginas

**Propósito**: Estrutura de rotas usando file-based routing do Expo Router

**Convenções**:
- Cada arquivo `.tsx` vira automaticamente uma rota
- `_layout.tsx` define o layout compartilhado
- Prefixo `+` indica arquivos especiais (ex: `+not-found.tsx`)

**Rotas Atuais**:
```
/             → app/index.tsx       (Home)
/map          → app/map.tsx         (Mapa)
/login        → app/login.tsx       🚧 (Dia 2)
/profile      → app/profile.tsx     🚧 (Dia 3)
/settings     → app/settings.tsx    🚧 (Dia 4)
```

**Exemplo de Navegação**:
```typescript
import { router } from 'expo-router';

// Navegar para mapa
router.push('/map');

// Navegar para perfil
router.push('/profile');
```

---

### 🧩 `/components` - Componentes Reutilizáveis

**Propósito**: Componentes React organizados por feature

**Estrutura Padrão**:
```
ComponentName/
  ├── ComponentName.tsx        # Lógica e JSX
  ├── ComponentName.styles.ts  # Estilos (StyleSheet)
  └── index.ts                 # Barrel export
```

**Convenções**:
- **PascalCase** para nomes de pastas e arquivos
- Sempre separar estilos em arquivo `.styles.ts`
- Usar barrel exports para imports limpos
- Suporte a tema (light/dark) quando aplicável

**Exemplo de Uso**:
```typescript
// ✅ Bom (via barrel export)
import { Header } from '@/components/Header';

// ❌ Ruim (importação direta)
import Header from '@/components/Header/Header';
```

---

### 🎨 `/contexts` - Gerenciamento de Estado Global

**Propósito**: React Contexts para estado compartilhado

**Contexts Implementados**:

#### ThemeContext
- **Responsabilidade**: Tema claro/escuro
- **Estado**: `colorScheme`, `isDark`
- **Métodos**: `toggleTheme()`

#### AuthContext ✅
- **Responsabilidade**: Autenticação OAuth
- **Estado**: `user`, `isAuthenticated`, `isLoading`
- **Métodos**: `signInWithGoogle()`, `signInWithGitHub()`, `signOut()`

**Padrão de Uso**:
```typescript
// 1. Criar Context
const MyContext = createContext<MyContextType | undefined>(undefined);

// 2. Provider Component
export function MyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState();

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Hook Customizado
export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}
```

---

### 🛠️ `/services` - Serviços e Lógica de Negócio

**Propósito**: Lógica reutilizável e serviços externos

**Serviços Implementados**:

#### SecureStorage ✅
- **Arquivo**: `SecureStorage.ts`
- **Responsabilidade**: Persistência segura de dados
- **Padrão**: Singleton
- **Métodos Principais**:
  - `saveSession()` - Salvar sessão OAuth
  - `loadSession()` - Carregar sessão
  - `clearSession()` - Limpar dados de autenticação
  - `saveCookieConsent()` - Consentimento de cookies

**Exemplo de Uso**:
```typescript
import { secureStorage } from '@/services/SecureStorage';

// Salvar sessão
await secureStorage.saveSession(user, token);

// Carregar sessão
const session = await secureStorage.loadSession();

// Limpar tudo
await secureStorage.clearSession();
```

---

### 🎨 `/constants` - Constantes e Configurações

**Propósito**: Valores constantes reutilizáveis

**Arquivos**:

#### Colors.ts
```typescript
const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    primary: '#2f95dc',
    // ...
  },
  dark: {
    text: '#fff',
    background: '#000',
    primary: '#fff',
    // ...
  },
};
```

**Uso com Tema**:
```typescript
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

const MyComponent = () => {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return <Text style={{ color: colors.text }}>Olá</Text>;
};
```

---

### 📚 `/docs` - Documentação

**Propósito**: Documentação técnica e de negócio

**Estrutura**:
- **sprints/** - Planejamento e roadmaps
- **politicas/** - Documentos legais (LGPD)
- **arquitetura/** - Documentação técnica

**Documentos Importantes**:
1. `ROADMAP_SPRINT_OAUTH_LOGIN.md` - Plano de 5 dias
2. `GUIA_CONFIGURACAO_OAUTH.md` - Setup para devs
3. `SISTEMA_AUTENTICACAO.md` - Arquitetura técnica
4. `CHANGELOG_SPRINT.md` - Log de progresso
5. `ESTRUTURA_PROJETO.md` - Este arquivo

---

## 🔧 Arquivos de Configuração

### app.json

**Propósito**: Configuração principal do Expo

**Seções Importantes**:
```json
{
  "expo": {
    "name": "reciclamuz",
    "slug": "reciclamuz",
    "scheme": "reciclamuz",           // Deep linking
    "plugins": [
      "expo-router",
      ["expo-auth-session", { ... }]  // ✅ OAuth (Dia 1)
    ],
    "extra": {
      "oauth": { ... }                // ✅ Redirect URIs (Dia 1)
    }
  }
}
```

---

### package.json

**Dependências Principais**:

**Core**:
- `expo` (~54.0.7) - Framework React Native
- `react` (19.1.0) - Biblioteca React
- `react-native` (0.81.4) - React Native core
- `expo-router` (~6.0.4) - Navegação file-based

**Autenticação** ✅:
- `expo-auth-session` (^7.0.8) - OAuth flows
- `expo-web-browser` (~15.0.7) - Auth redirects
- `expo-crypto` (^15.0.7) - Criptografia
- `@react-native-async-storage/async-storage` (^2.2.0) - Persistência

**UI/UX**:
- `react-native-maps` (1.20.1) - Mapas
- `react-native-reanimated` (~4.1.0) - Animações
- `react-native-safe-area-context` (~5.6.0) - Safe areas
- `@expo/vector-icons` (^15.0.2) - Ícones

---

### tsconfig.json

**Configurações TypeScript**:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,              // ✅ Modo strict ativado
    "paths": {
      "@/*": ["./*"]             // ✅ Path alias
    }
  }
}
```

**Convenções**:
- Sempre usar tipos explícitos
- Evitar `any` (usar `unknown` se necessário)
- Usar interfaces para objetos
- Usar types para unions/primitivos

---

### .gitignore

**Arquivos Ignorados**:

```gitignore
# Dependências
node_modules/

# Build
.expo/
dist/
web-build/

# Ambiente
.env                  # ✅ Credenciais locais
.env*.local

# IDE
.vscode/
.cursor/
.idea/

# Claude AI           # ✅ Dia 1
.claude/
*.claude.md
.claudesync/

# Package lock
package-lock.json     # ✅ Não versionar lock
```

---

## 🎯 Convenções de Código

### Nomenclatura

**Arquivos**:
- **Componentes**: `PascalCase.tsx` (ex: `Header.tsx`)
- **Estilos**: `PascalCase.styles.ts` (ex: `Header.styles.ts`)
- **Hooks**: `camelCase.ts` (ex: `useColorScheme.ts`)
- **Services**: `PascalCase.ts` (ex: `SecureStorage.ts`)
- **Constants**: `PascalCase.ts` (ex: `Colors.ts`)

**Variáveis**:
- **Constantes**: `UPPER_SNAKE_CASE`
- **Funções**: `camelCase`
- **Componentes**: `PascalCase`
- **Interfaces**: `PascalCase` (sufixo `Type` ou `Interface`)

### Imports

**Ordem**:
```typescript
// 1. React e libs externas
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. Componentes locais
import { Header } from '@/components/Header';

// 3. Contextos e hooks
import { useAuth } from '@/contexts/AuthContext';

// 4. Services e utils
import { secureStorage } from '@/services/SecureStorage';

// 5. Constants e types
import Colors from '@/constants/Colors';
import type { User } from '@/contexts/AuthContext';

// 6. Estilos
import styles from './Component.styles';
```

---

## 📊 Estatísticas do Projeto

### Tamanho Atual (Dia 1)

```
📁 Total de Arquivos: ~50
📝 Linhas de Código: ~1,200
📚 Linhas de Documentação: ~2,500
🎨 Componentes: 6
🎯 Contexts: 2
🛠️ Services: 1
📄 Rotas: 5 (2 implementadas, 3 planejadas)
```

### Distribuição de Código

```
TypeScript/TSX:  70%
Markdown:        25%
JSON/Config:      5%
```

---

## 🚀 Próximos Passos

### Dia 2 (22/10/2025)
- [ ] Implementar `app/login.tsx`
- [ ] Criar `components/LoginScreen/`
- [ ] Implementar OAuth real (Google e GitHub)
- [ ] Adicionar loading states e error handling

### Dia 3 (23/10/2025)
- [ ] Integrar AuthContext com SecureStorage
- [ ] Implementar `app/profile.tsx`
- [ ] Adicionar proteção de rotas
- [ ] Atualizar Header com estado de autenticação

### Dia 4 (24/10/2025)
- [ ] Criar políticas (privacidade, cookies, termos)
- [ ] Implementar `components/CookieConsent/`
- [ ] Criar `app/settings.tsx`

### Dia 5 (25/10/2025)
- [ ] Testes completos
- [ ] Otimizações
- [ ] Atualizar README principal
- [ ] Code review e merge

---

## 📖 Guias Relacionados

- [Roadmap da Sprint](./sprints/ROADMAP_SPRINT_OAUTH_LOGIN.md)
- [Configuração OAuth](./GUIA_CONFIGURACAO_OAUTH.md)
- [Arquitetura de Autenticação](./arquitetura/SISTEMA_AUTENTICACAO.md)
- [Changelog da Sprint](./CHANGELOG_SPRINT.md)

---

**Última Atualização**: 21 de outubro de 2025 às 17:15 BRT
**Responsável**: Anderson Henrique da Silva - COMP VIII
**Status**: 🟢 Atualizado (Dia 1 completo)
