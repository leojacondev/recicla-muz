# 🌟 Sistema de Avaliações de Pontos de Coleta

**Autor**: Anderson Henrique da Silva
**Data de Criação**: 07 de novembro de 2025
**Branch**: `feat/rating-system`
**Status**: ✅ Completo e Testado

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Arquitetura](#arquitetura)
4. [Componentes](#componentes)
5. [Uso](#uso)
6. [Validações e Segurança](#validações-e-segurança)
7. [Testes](#testes)
8. [Melhorias Futuras](#melhorias-futuras)

---

## 🎯 Visão Geral

Sistema completo de avaliações que permite aos usuários autenticados avaliar pontos de coleta com estrelas (1-5) e comentários. Inclui estatísticas em tempo real, distribuição de avaliações e persistência local via AsyncStorage.

### Características Principais

- ✅ Avaliação com 1-5 estrelas e comentário obrigatório
- ✅ Edição e exclusão de avaliações próprias
- ✅ Cálculo automático de média e distribuição
- ✅ Persistência local sem necessidade de backend
- ✅ Validações robustas e controle de permissões
- ✅ Interface responsiva com tema claro/escuro
- ✅ 17 testes unitários automatizados

---

## 🚀 Funcionalidades

### 1. **Criar Avaliação**
- Usuário autenticado pode avaliar qualquer ponto
- Seleciona de 1 a 5 estrelas
- Escreve comentário (10-500 caracteres)
- Prevenção de avaliações duplicadas

### 2. **Editar Avaliação**
- Usuário pode editar suas próprias avaliações
- Atualizar estrelas e/ou comentário
- Registro de data de atualização

### 3. **Excluir Avaliação**
- Confirmação antes de excluir
- Apenas dono pode deletar
- Remoção permanente do AsyncStorage

### 4. **Visualizar Estatísticas**
- Média geral de avaliações
- Total de avaliações
- Distribuição por estrelas (1-5)
- Gráfico de barras visual

### 5. **Listar Avaliações**
- Ordenação por data (mais recente primeiro)
- Avatar e nome do usuário
- Indicador de avaliações próprias
- Data formatada inteligentemente

---

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
recicla-muz/
├── types/
│   └── rating.ts                      # Interfaces TypeScript
├── contexts/
│   └── RatingContext.tsx              # Lógica de gerenciamento
├── components/
│   ├── StarRating/
│   │   ├── StarRating.tsx             # Componente de estrelas
│   │   └── index.ts
│   ├── RatingForm/
│   │   ├── RatingForm.tsx             # Formulário de avaliação
│   │   └── index.ts
│   ├── RatingList/
│   │   ├── RatingList.tsx             # Lista de avaliações
│   │   └── index.ts
│   └── RatingStats/
│       ├── RatingStats.tsx            # Estatísticas
│       └── index.ts
└── __tests__/
    └── contexts/
        └── RatingContext.test.tsx     # Testes unitários
```

### Fluxo de Dados

```
┌─────────────────────────────────────────────────┐
│              RatingProvider                     │
│  (Gerencia estado global de avaliações)        │
└─────────────────────────────────────────────────┘
                      ↓
        ┌─────────────┴─────────────┐
        ↓                           ↓
┌──────────────┐          ┌──────────────────┐
│ AsyncStorage │  ←─────→ │  Estado Local    │
│  (Persist)   │          │  (ratings array) │
└──────────────┘          └──────────────────┘
                                   ↓
        ┌──────────────────────────┴───────────────────┐
        ↓                          ↓                    ↓
┌──────────────┐        ┌──────────────┐    ┌──────────────┐
│ RatingStats  │        │ RatingForm   │    │ RatingList   │
└──────────────┘        └──────────────┘    └──────────────┘
```

---

## 🧩 Componentes

### 1. **RatingContext**
**Arquivo**: `contexts/RatingContext.tsx`

Contexto global que gerencia todas as operações de avaliação.

**Métodos Principais**:

```typescript
// CRUD
createRating(input: CreateRatingInput): Promise<Rating>
updateRating(ratingId: string, input: UpdateRatingInput): Promise<Rating>
deleteRating(ratingId: string): Promise<void>

// Consultas
getRatingsByCollectionPoint(collectionPointId: string): Rating[]
getRatingsByUser(userId: string): Rating[]
getUserRatingForPoint(collectionPointId: string): Rating | null

// Estatísticas
getStatsForCollectionPoint(collectionPointId: string): RatingStats

// Utilitários
refreshRatings(): Promise<void>
```

**Estado**:
```typescript
{
  ratings: Rating[],
  isLoading: boolean,
  error: string | null
}
```

---

### 2. **StarRating**
**Arquivo**: `components/StarRating/StarRating.tsx`

Componente para exibir e selecionar estrelas.

**Props**:
```typescript
interface StarRatingProps {
  rating: number;              // Classificação atual (1-5)
  onRatingChange?: (rating: number) => void;
  size?: number;               // Tamanho dos ícones (padrão: 24)
  readonly?: boolean;          // Modo somente leitura
  showHalfStars?: boolean;     // Exibir meio-estrelas
  color?: string;              // Cor das estrelas preenchidas
  emptyColor?: string;         // Cor das estrelas vazias
}
```

**Exemplo de Uso**:
```tsx
// Modo interativo
<StarRating
  rating={3}
  onRatingChange={(stars) => setRating(stars)}
/>

// Modo somente leitura
<StarRating
  rating={4.5}
  readonly
  showHalfStars
/>
```

---

### 3. **RatingForm**
**Arquivo**: `components/RatingForm/RatingForm.tsx`

Formulário completo para criar/editar avaliações.

**Props**:
```typescript
interface RatingFormProps {
  collectionPointId: string;
  existingRating?: Rating | null;
  onSuccess?: (rating: Rating) => void;
  onCancel?: () => void;
}
```

**Funcionalidades**:
- Seleção de estrelas interativa
- Campo de comentário com contador de caracteres
- Validações em tempo real
- Estados de loading
- Suporte a edição

**Exemplo de Uso**:
```tsx
<RatingForm
  collectionPointId="point123"
  onSuccess={(rating) => console.log('Avaliação criada!', rating)}
  onCancel={() => setShowForm(false)}
/>

// Para edição
<RatingForm
  collectionPointId="point123"
  existingRating={userRating}
  onSuccess={() => setShowForm(false)}
/>
```

---

### 4. **RatingList**
**Arquivo**: `components/RatingList/RatingList.tsx`

Lista paginada de todas as avaliações.

**Props**:
```typescript
interface RatingListProps {
  collectionPointId: string;
  onEditRating?: (rating: Rating) => void;
}
```

**Funcionalidades**:
- Lista ordenada por data
- Avatar e nome do usuário
- Botões de ação para avaliações próprias
- Formatação inteligente de datas
- Estado vazio elegante

**Exemplo de Uso**:
```tsx
<RatingList
  collectionPointId="point123"
  onEditRating={(rating) => {
    setEditingRating(rating);
    setShowForm(true);
  }}
/>
```

---

### 5. **RatingStats**
**Arquivo**: `components/RatingStats/RatingStats.tsx`

Exibe estatísticas agregadas das avaliações.

**Props**:
```typescript
interface RatingStatsProps {
  collectionPointId: string;
  showDistribution?: boolean;
}
```

**Funcionalidades**:
- Média geral destacada
- Total de avaliações
- Gráfico de distribuição por estrelas
- Porcentagens calculadas

**Exemplo de Uso**:
```tsx
<RatingStats
  collectionPointId="point123"
  showDistribution={true}
/>
```

---

## 💻 Uso

### Integração Básica

**1. Adicionar o Provider no Layout**:

```tsx
// app/_layout.tsx
import { RatingProvider } from '@/contexts/RatingContext';

<ThemeProvider>
  <AuthProvider>
    <RatingProvider>
      <App />
    </RatingProvider>
  </AuthProvider>
</ThemeProvider>
```

**2. Usar o Hook nos Componentes**:

```tsx
import { useRating } from '@/contexts/RatingContext';

function MyComponent() {
  const {
    createRating,
    getRatingsByCollectionPoint,
    getStatsForCollectionPoint
  } = useRating();

  // Criar avaliação
  const handleSubmit = async () => {
    await createRating({
      collectionPointId: 'point1',
      stars: 5,
      comment: 'Excelente ponto!'
    });
  };

  // Obter avaliações
  const ratings = getRatingsByCollectionPoint('point1');

  // Obter estatísticas
  const stats = getStatsForCollectionPoint('point1');
}
```

**3. Integração Completa (CollectionPointDetails)**:

```tsx
import { RatingStats } from '@/components/RatingStats';
import { RatingForm } from '@/components/RatingForm';
import { RatingList } from '@/components/RatingList';
import { useRating } from '@/contexts/RatingContext';
import { useAuth } from '@/contexts/AuthContext';

function CollectionPointDetails({ pointId }) {
  const [showForm, setShowForm] = useState(false);
  const { getUserRatingForPoint } = useRating();
  const { isAuthenticated } = useAuth();

  const userRating = getUserRatingForPoint(pointId);

  return (
    <View>
      {/* Estatísticas */}
      <RatingStats collectionPointId={pointId} />

      {/* Botão Avaliar/Editar */}
      {isAuthenticated && (
        <Button
          onPress={() => setShowForm(true)}
          title={userRating ? 'Editar Avaliação' : 'Avaliar'}
        />
      )}

      {/* Formulário */}
      {showForm && (
        <RatingForm
          collectionPointId={pointId}
          existingRating={userRating}
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Lista */}
      <RatingList
        collectionPointId={pointId}
        onEditRating={(rating) => {
          setShowForm(true);
        }}
      />
    </View>
  );
}
```

---

## 🔒 Validações e Segurança

### Validações Implementadas

#### 1. **Criação de Avaliação**
```typescript
✅ Usuário deve estar autenticado
✅ Estrelas entre 1 e 5
✅ Comentário obrigatório (não vazio)
✅ Prevenir duplicatas (1 avaliação por usuário/ponto)
```

#### 2. **Atualização de Avaliação**
```typescript
✅ Usuário deve estar autenticado
✅ Avaliação deve existir
✅ Usuário deve ser o dono da avaliação
✅ Estrelas entre 1 e 5 (se fornecido)
✅ Comentário não vazio (se fornecido)
```

#### 3. **Exclusão de Avaliação**
```typescript
✅ Usuário deve estar autenticado
✅ Avaliação deve existir
✅ Usuário deve ser o dono da avaliação
✅ Confirmação do usuário obrigatória
```

### Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| **Unicidade** | 1 usuário = 1 avaliação por ponto |
| **Autenticação** | Apenas usuários logados podem avaliar |
| **Propriedade** | Apenas dono pode editar/deletar |
| **Comentário** | Mínimo 10 caracteres, máximo 500 |
| **Estrelas** | Obrigatório: 1 a 5 |

### Mensagens de Erro

```typescript
// Validação de estrelas
"Avaliação deve estar entre 1 e 5 estrelas"

// Comentário vazio
"Comentário é obrigatório"

// Duplicata
"Você já avaliou este ponto. Use a opção de editar."

// Permissão negada
"Você não pode editar avaliações de outros usuários"
"Você não pode deletar avaliações de outros usuários"

// Não encontrado
"Avaliação não encontrada"

// Autenticação
"Usuário não autenticado"
```

---

## 🧪 Testes

### Cobertura de Testes

**Arquivo**: `__tests__/contexts/RatingContext.test.tsx`

✅ **17 testes implementados** - Todos passando!

#### Suítes de Teste

**1. Criação de Avaliações** (5 testes)
- ✅ Criar avaliação com sucesso
- ✅ Rejeitar estrelas < 1
- ✅ Rejeitar estrelas > 5
- ✅ Rejeitar comentário vazio
- ✅ Prevenir duplicatas

**2. Atualização de Avaliações** (3 testes)
- ✅ Atualizar avaliação existente
- ✅ Atualizar apenas estrelas
- ✅ Rejeitar atualização de inexistente

**3. Exclusão de Avaliações** (2 testes)
- ✅ Excluir avaliação existente
- ✅ Rejeitar exclusão de inexistente

**4. Consultas de Avaliações** (3 testes)
- ✅ Retornar avaliações por ponto
- ✅ Retornar array vazio quando sem avaliações
- ✅ Retornar avaliação do usuário específico

**5. Estatísticas** (3 testes)
- ✅ Calcular média corretamente
- ✅ Retornar distribuição de estrelas
- ✅ Retornar estatísticas zeradas

**6. Persistência** (1 teste)
- ✅ Persistir no AsyncStorage

### Executar Testes

```bash
# Todos os testes do projeto
npm test

# Apenas testes de rating
npm test -- RatingContext.test.tsx

# Com cobertura
npm run test:coverage
```

---

## 📊 Estatísticas do Sistema

### Métricas de Código

```
📝 Total de Linhas: ~1,800
📁 Arquivos Criados: 14
🧪 Testes: 17 (100% passing)
✅ Commits: 9
🎨 Componentes: 4 principais
```

### Distribuição de Código

| Categoria | Linhas | Porcentagem |
|-----------|--------|-------------|
| Context & Lógica | 300 | 17% |
| Componentes UI | 900 | 50% |
| Testes | 355 | 20% |
| Tipos & Interfaces | 67 | 4% |
| Documentação | 178 | 9% |

---

## 🎨 Design e UX

### Paleta de Cores

```typescript
// Estrelas
Preenchida: #FFD700 (Dourado)
Vazia: #D1D5DB (Cinza claro)

// Botões
Criar: #10B981 (Verde)
Editar: #3B82F6 (Azul)
Excluir: #EF4444 (Vermelho)
Cancelar: #F3F4F6 (Cinza)

// Status
Sucesso: #10B981
Erro: #EF4444
Aviso: #FEF3C7 (Amarelo claro)
```

### Temas

**Tema Claro**:
- Background: #FFFFFF
- Texto: #111827
- Secundário: #6B7280

**Tema Escuro**:
- Background: #1F2937
- Texto: #F9FAFB
- Secundário: #9CA3AF

### Responsividade

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Web (1024px+)

---

## 🚀 Melhorias Futuras

### Curto Prazo (1-2 semanas)
- [ ] Adicionar fotos às avaliações
- [ ] Filtros (mais recentes, melhores, piores)
- [ ] Ordenação customizável
- [ ] Paginação para muitas avaliações

### Médio Prazo (1 mês)
- [ ] Resposta do administrador às avaliações
- [ ] Sistema de denúncia de avaliações
- [ ] Badges para avaliadores frequentes
- [ ] Notificações de novas avaliações

### Longo Prazo (3+ meses)
- [ ] Integração com backend
- [ ] Sincronização multi-dispositivo
- [ ] Analytics de avaliações
- [ ] Moderação automatizada com IA
- [ ] Exportação de relatórios

---

## 📝 Changelog

### [1.0.0] - 2025-11-07

**Adicionado**:
- Sistema completo de avaliações (CRUD)
- Persistência local com AsyncStorage
- Interface completa (4 componentes)
- 17 testes unitários automatizados
- Documentação completa

**Commits**:
1. `feat(types)`: Interfaces TypeScript
2. `feat(contexts)`: RatingContext com AsyncStorage
3. `feat(components)`: StarRating interativo
4. `feat(components)`: Formulário de avaliações
5. `feat(components)`: Lista de avaliações
6. `feat(components)`: Estatísticas de avaliações
7. `feat(app)`: Integração do RatingProvider
8. `feat(components)`: Sistema em CollectionPointDetails
9. `test(contexts)`: Testes unitários completos

---

## 👥 Contribuidores

- **Anderson Henrique da Silva** - Desenvolvimento completo
- **Lurian Letícia dos Reis** - Líder do Projeto
- **Leonardo Jacon dos Reis** - Equipe

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique esta documentação
2. Execute os testes: `npm test`
3. Consulte o código-fonte com comentários

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos no IFSULDEMINAS - Campus Muzambinho.

---

**Última Atualização**: 07 de novembro de 2025
**Versão**: 1.0.0
**Status**: ✅ Produção Ready
