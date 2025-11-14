ReciclaMuz

Aplicativo mobile para identificação e localização de pontos de coleta de lixo em Muzambinho-MG.

📋 Sobre o Projeto

O ReciclaMuz é um aplicativo desenvolvido para facilitar a identificação e localização de pontos de coleta de lixo na cidade de Muzambinho. O projeto visa promover a sustentabilidade ambiental e facilitar o descarte correto de resíduos, contribuindo para uma cidade mais limpa e ecologicamente responsável.

🎯 Público-Alvo

- Moradores da cidade de Muzambinho
- Visitantes e turistas
- Empresas e estabelecimentos comerciais
- Instituições de ensino e órgãos públicos
- Qualquer pessoa interessada em contribuir com o meio ambiente através do descarte correto de resíduos

✨ Principais Funcionalidades

- 🔐 **Sistema de Login**: Autenticação OAuth (Google/GitHub) com persistência de sessão
- 📍 **Mapa Interativo**: Visualização de todos os pontos de coleta de lixo na cidade
- 🗂️ **Categorização de Resíduos**: Identificação dos tipos de materiais aceitos em cada ponto
- 📱 **Interface Intuitiva**: Design responsivo e fácil de usar
- ⭐ **Sistema de Avaliações**:
  - Avalie pontos de coleta com 1-5 estrelas
  - Adicione comentários detalhados
  - Edite ou exclua suas avaliações
  - Veja estatísticas e distribuição de avaliações
  - Persistência local sem necessidade de backend
- 👨‍💼 **Painel Administrativo**: Administradores podem criar, editar e gerenciar pontos de coleta
- 🏫 **Rodapé Institucional**: Identificação como projeto acadêmico com informações da equipe e instituição

👥 Equipe

 Líder do Projeto:  Lurian Letícia dos Reis

 Membros da Equipe: 
- Anderson Henrique da Silva
- Leonardo Jacon dos Reis

🛠️ Tecnologias Utilizadas

   Core
-  Framework:  React Native 0.81.4
-  React:  19.1.0
-  Expo:   54.0.7
-  Linguagem:  TypeScript 5.9.2

   Navegação e Roteamento
-  Expo Router:   6.0.4
-  React Navigation:  7.1.8
-  React Navigation Native Stack:  7.3.26
-  React Navigation Bottom Tabs:  7.4.7

   Animações e UI
-  React Native Reanimated:   4.1.0
-  React Native Worklets:  0.5.1
-  React Native Screens:   4.16.0
-  React Native Safe Area Context:   5.6.0
-  Expo Vector Icons:  ^15.0.2

Outros
-  Expo Status Bar:   3.0.8
-  Expo Splash Screen:   31.0.10
-  Expo Font:   14.0.8
-  Expo Linking:   8.0.8
-  Expo Constants:   18.0.8

Plataformas Suportadas
- ✅ iOS
- ✅ Android  
- ✅ Web

🚀 Como Executar o Projeto

Pré-requisitos

- Node.js (>= 20.19.4)
- npm ou yarn
- Expo Go (para testar em dispositivo físico)

Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd reciclamuz
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

 Comandos Disponíveis

```bash
npm start           Inicia o servidor de desenvolvimento
npm run android     Abre no emulador/dispositivo Android
npm run ios         Abre no simulador iOS (apenas macOS)
npm run web         Abre no navegador
npm test            Executa os testes unitários
npm run test:watch  Executa os testes em modo watch
npm run test:coverage Executa os testes com relatório de cobertura
```

Testando no Dispositivo

1. Instale o aplicativo  Expo Go  no seu smartphone:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Após executar `npm start`, escaneie o QR code que aparecer no terminal com o Expo Go

📁 Estrutura do Projeto

```
reciclamuz/
├── .maestro/               Testes E2E com Maestro
├── __tests__/              Testes unitários e de componentes
│   ├── components/         Testes de componentes React
│   └── contexts/           Testes de contextos
├── app/                    Rotas e telas do aplicativo (Expo Router)
├── assets/                 Imagens, fontes e outros recursos
│   └── images/            Ícones e imagens
├── components/             Componentes reutilizáveis
├── contexts/               Contextos React (Auth, Theme, etc)
├── services/               Serviços e utilitários
├── app.json               Configurações do Expo
├── jest.config.js         Configuração do Jest
├── jest.setup.js          Setup dos testes
├── package.json           Dependências do projeto
└── tsconfig.json          Configurações do TypeScript
```

🧪 Testes

O projeto possui uma suite completa de testes automatizados:

### Testes Unitários e de Componentes (Jest)

Executar todos os testes:
```bash
npm test
```

Executar com cobertura:
```bash
npm run test:coverage
```

**Cobertura de Testes:**
- ✅ Contextos (AuthContext, ThemeContext)
- ✅ Componentes (HomeScreen)
- 📊 **23 testes** passando com sucesso

### Testes E2E (Maestro)

Instale o Maestro:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Execute os testes E2E:
```bash
# Executar todos os testes
maestro test .maestro/

# Executar teste específico
maestro test .maestro/app-launch.yaml
```

**Cenários de Teste E2E:**
- ✅ Lançamento da aplicação
- ✅ Navegação entre abas
- ✅ Fluxo de login
- ✅ Banner de consentimento de cookies
- ✅ Navegação pelas políticas

Para mais detalhes sobre os testes, consulte [.maestro/README.md](.maestro/README.md)

## 🌟 Sistema de Avaliações

O ReciclaMuz agora conta com um sistema completo de avaliações que permite aos usuários fornecerem feedback sobre os pontos de coleta.

### Recursos Principais

- **Avaliação com Estrelas**: Classifique pontos de 1 a 5 estrelas
- **Comentários**: Compartilhe sua experiência detalhada
- **Estatísticas em Tempo Real**: Veja média e distribuição de avaliações
- **Gerenciamento**: Edite ou exclua suas próprias avaliações
- **Persistência Local**: Funciona sem necessidade de backend

### Documentação Técnica

Para informações detalhadas sobre implementação, arquitetura e uso do sistema de avaliações, consulte:
- 📖 [Documentação Completa do Sistema de Avaliações](docs/features/SISTEMA_AVALIACOES.md)

### Componentes Disponíveis

```typescript
import { RatingStats } from '@/components/RatingStats';    // Estatísticas
import { RatingForm } from '@/components/RatingForm';      // Formulário
import { RatingList } from '@/components/RatingList';      // Lista
import { StarRating } from '@/components/StarRating';      // Estrelas
import { useRating } from '@/contexts/RatingContext';      // Hook
```

### Testes

O sistema possui **17 testes automatizados** com 100% de aprovação:

```bash
npm test -- RatingContext.test.tsx
```

## 🏫 Rodapé Institucional

O ReciclaMuz possui um rodapé institucional que identifica o projeto como acadêmico e exibe informações da equipe e instituição.

### Componentes

- **Footer**: Rodapé compacto com logo, nome do projeto e botão "Sobre"
- **AboutModal**: Modal completo com informações institucionais detalhadas
- **ScreenWithFooter**: Wrapper para adicionar o rodapé em qualquer tela

### Informações Exibidas

- Logo e nome completo do IFSULDEMINAS
- Identificação como projeto acadêmico
- Nome do curso e departamento
- Informações do professor orientador
- Equipe de desenvolvimento com fotos e funções
- Ano letivo e versão do aplicativo

### Como Adicionar Imagens

1. **Logo da Instituição**: Adicione em `/assets/images/ifsuldeminas-logo.png`
2. **Fotos da Equipe**: Adicione em `/assets/images/team/`:
   - `anderson.jpg`
   - `leonardo.jpg`
   - `lurian.jpg`
3. Descomente as linhas de imagens em `constants/institutionalInfo.ts`

### Uso em Telas

```typescript
import { ScreenWithFooter } from '@/components/ScreenWithFooter';

export default function MyScreen() {
  return (
    <ScreenWithFooter>
      {/* Conteúdo da tela */}
    </ScreenWithFooter>
  );
}
```

### Testes

O sistema possui **15 testes automatizados** para Footer e AboutModal:

```bash
npm test -- Footer.test.tsx
npm test -- AboutModal.test.tsx
```

 📱 Funcionalidades em Desenvolvimento

- Integração com sistema de mapas avançado
- Sistema de notificações push
- Gamificação para incentivar reciclagem
- Dashboard com estatísticas de coleta
- Fotos nas avaliações
- Resposta do administrador às avaliações

🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

📄 Licença

Este projeto foi desenvolvido para fins acadêmicos. 



Para mais informações sobre o projeto, entre em contato com a equipe de desenvolvimento.


Desenvolvido com 💚 pela equipe ReciclaMuz

