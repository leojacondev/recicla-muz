# 🔐 Guia de Configuração OAuth

**Autor**: Anderson Henrique da Silva - COMP VIII
**Criado em**: 21 de outubro de 2025
**Projeto**: Recicla-Muz

---

## 📋 Visão Geral

Este guia ajudará você a configurar autenticação OAuth com Google e GitHub no aplicativo Recicla-Muz.

---

## 🎯 Pré-requisitos

- Conta Google (para Google OAuth)
- Conta GitHub (para GitHub OAuth)
- Projeto Recicla-Muz clonado localmente
- Node.js >= 20.18.1 instalado

---

## 🔵 Configuração Google OAuth

### Passo 1: Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Faça login com sua conta Google
3. Clique em "Select a project" no topo da página

### Passo 2: Criar ou Selecionar Projeto

**Opção A - Criar novo projeto:**
1. Clique em "NEW PROJECT"
2. Nome do projeto: `Recicla-Muz`
3. Clique em "CREATE"

**Opção B - Usar projeto existente:**
1. Selecione o projeto da lista

### Passo 3: Habilitar Google+ API

1. No menu lateral, vá em: **APIs & Services** > **Library**
2. Pesquise por: `Google+ API`
3. Clique em **ENABLE**

### Passo 4: Configurar Tela de Consentimento OAuth

1. Vá em: **APIs & Services** > **OAuth consent screen**
2. Selecione **External** (para teste) ou **Internal** (apenas para sua organização)
3. Clique em **CREATE**

Preencha as informações:
- **App name**: Recicla-Muz
- **User support email**: seu-email@gmail.com
- **Developer contact**: seu-email@gmail.com
4. Clique em **SAVE AND CONTINUE**
5. Em **Scopes**, adicione:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
6. Continue até finalizar

### Passo 5: Criar Credenciais OAuth

1. Vá em: **APIs & Services** > **Credentials**
2. Clique em **+ CREATE CREDENTIALS**
3. Selecione **OAuth client ID**
4. Application type: **Web application**
5. Name: `Recicla-Muz Web Client`

**Authorized redirect URIs** (adicione TODOS):
```
reciclamuz://auth/google
http://localhost:19006/auth/google
https://auth.expo.io/@seu-usuario/reciclamuz
```

6. Clique em **CREATE**
7. **IMPORTANTE**: Copie o **Client ID** gerado

### Passo 6: Adicionar Client ID ao Projeto

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env`:
```bash
EXPO_PUBLIC_GOOGLE_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
```

---

## ⚫ Configuração GitHub OAuth

### Passo 1: Acessar GitHub Developer Settings

1. Acesse: https://github.com/settings/developers
2. Faça login com sua conta GitHub
3. Clique na aba **OAuth Apps**

### Passo 2: Criar Nova OAuth App

1. Clique em **New OAuth App**
2. Preencha o formulário:

**Application name:**
```
Recicla-Muz
```

**Homepage URL:**
```
https://github.com/leojacondev/recicla-muz
```

**Application description** (opcional):
```
Aplicativo de reciclagem para Muzambinho-MG
```

**Authorization callback URL:**
```
reciclamuz://auth/github
```

3. Clique em **Register application**

### Passo 3: Gerar Client Secret

1. Na página da aplicação criada, clique em **Generate a new client secret**
2. **IMPORTANTE**: Copie imediatamente o **Client Secret** (só aparece uma vez!)
3. Copie também o **Client ID**

### Passo 4: Adicionar Credenciais ao Projeto

Edite o arquivo `.env`:
```bash
EXPO_PUBLIC_GITHUB_CLIENT_ID=seu-github-client-id
EXPO_PUBLIC_GITHUB_CLIENT_SECRET=seu-github-client-secret
```

---

## 📱 URIs de Redirecionamento

### Para Desenvolvimento Local

**Google:**
```
reciclamuz://auth/google
http://localhost:19006/auth/google
```

**GitHub:**
```
reciclamuz://auth/github
http://localhost:19006/auth/github
```

### Para Produção (Expo)

**Google:**
```
https://auth.expo.io/@seu-usuario-expo/reciclamuz
```

**GitHub:**
```
https://auth.expo.io/@seu-usuario-expo/reciclamuz
```

---

## ✅ Verificar Configuração

### 1. Verificar variáveis de ambiente

Execute no terminal:
```bash
cat .env
```

Deve aparecer algo como:
```
EXPO_PUBLIC_GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
EXPO_PUBLIC_GITHUB_CLIENT_ID=abc123def456
EXPO_PUBLIC_GITHUB_CLIENT_SECRET=xyz789uvw012
```

### 2. Verificar app.json

Abra o arquivo `app.json` e confirme:
```json
{
  "expo": {
    "scheme": "reciclamuz",
    "plugins": [
      "expo-router",
      [
        "expo-auth-session",
        {
          "scheme": "reciclamuz"
        }
      ]
    ]
  }
}
```

### 3. Testar no desenvolvimento

```bash
npm start
```

Pressione:
- `i` para iOS
- `a` para Android
- `w` para Web

---

## 🐛 Solução de Problemas

### Erro: "redirect_uri_mismatch"

**Problema**: URI de redirecionamento não está configurado corretamente

**Solução**:
1. Verifique se o URI no console (Google/GitHub) é EXATAMENTE igual ao configurado
2. Não pode ter barra `/` no final
3. Deve começar com `reciclamuz://` (sem espaços)

### Erro: "Invalid client"

**Problema**: Client ID ou Secret incorretos

**Solução**:
1. Verifique se copiou as credenciais corretamente
2. Certifique-se de não ter espaços extras
3. Verifique se o arquivo `.env` está na raiz do projeto

### OAuth não abre o navegador

**Problema**: Plugin expo-auth-session não configurado

**Solução**:
```bash
npm install expo-auth-session expo-web-browser
npx expo prebuild --clean
```

### Variáveis de ambiente não funcionam

**Problema**: Variáveis não estão sendo carregadas

**Solução**:
1. Certifique-se que o prefixo é `EXPO_PUBLIC_`
2. Reinicie o Metro bundler: `npm start --clear`
3. Rebuild o app nativo se necessário

---

## 🔒 Segurança

### ❌ NUNCA faça:
- Commitar arquivo `.env` com credenciais reais
- Compartilhar Client Secrets publicamente
- Usar credenciais de produção em desenvolvimento

### ✅ SEMPRE faça:
- Use `.env` apenas localmente
- Configure variáveis de ambiente no Expo EAS para produção
- Rotacione secrets se forem expostos acidentalmente
- Mantenha `.env.example` atualizado (SEM credenciais reais)

---

## 📚 Recursos Adicionais

### Documentação Oficial

**Expo Auth Session:**
- https://docs.expo.dev/versions/latest/sdk/auth-session/

**Google OAuth:**
- https://developers.google.com/identity/protocols/oauth2

**GitHub OAuth:**
- https://docs.github.com/en/developers/apps/building-oauth-apps

### Comandos Úteis

**Verificar variáveis de ambiente disponíveis:**
```bash
npx expo config --type public
```

**Limpar cache e reinstalar:**
```bash
rm -rf node_modules
npm install
npm start --clear
```

---

## 🤝 Suporte

Encontrou problemas? Abra uma issue no GitHub:
https://github.com/leojacondev/recicla-muz/issues

---

**Versão do Documento**: 1.0
**Última Atualização**: 21 de outubro de 2025
