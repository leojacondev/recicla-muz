# 🔐 Configuração do Google OAuth - ReciclaMuz

**Data**: 27 de outubro de 2025
**Autor**: Anderson Henrique da Silva

---

## 📋 Informações Atuais

**Client ID Atual:**
```
649665515553-9mds5t84g2hb49u6v8paf1b5si1ac3ma.apps.googleusercontent.com
```

**Redirect URI Necessário:**
```
reciclamuz://auth/google
```

---

## 🔧 Passo a Passo para Configurar

### **1. Acessar Google Cloud Console**

Acesse: https://console.cloud.google.com/apis/credentials

### **2. Selecionar o Projeto**

- Certifique-se de estar no projeto correto (ReciclaMuz ou similar)
- O Client ID já existe, então vamos editá-lo

### **3. Editar OAuth 2.0 Client ID**

1. Na lista de credenciais, encontre o Client ID:
   ```
   649665515553-9mds5t84g2hb49u6v8paf1b5si1ac3ma.apps.googleusercontent.com
   ```

2. Clique no ícone de edição (lápis)

### **4. Adicionar Redirect URI**

Na seção **"Authorized redirect URIs"**, adicione:

```
reciclamuz://auth/google
```

**IMPORTANTE**:
- Não use `https://` ou `http://`
- Use exatamente: `reciclamuz://auth/google`
- Isso é um **custom URL scheme** para apps mobile

### **5. Salvar**

Clique em **"Save"** ou **"Salvar"**

---

## ✅ Verificação

Após configurar, você deve ver:

**Authorized redirect URIs:**
- `reciclamuz://auth/google` ✅

---

## 🧪 Como Testar

1. **Reinicie o app:**
   ```bash
   # Pare o servidor (Ctrl+C)
   npx expo start --clear
   ```

2. **Abra o app e clique em "Entrar"**

3. **Clique em "Continuar com Google"**

4. **Deve abrir o navegador e permitir login**

5. **Após login, deve voltar para o app com seus dados**

---

## 🐛 Problemas Comuns

### **Erro: "redirect_uri_mismatch"**

**Causa**: O redirect URI não está configurado no Google Cloud Console

**Solução**: Adicione `reciclamuz://auth/google` exatamente como mostrado acima

---

### **Erro: "invalid_client"**

**Causa**: Client ID incorreto ou não configurado

**Solução**: Verifique se o Client ID no `.env` está correto

---

### **Erro: "access_denied"**

**Causa**: Usuário cancelou o login ou não deu permissão

**Solução**: Normal, tente fazer login novamente

---

## 📝 Notas Adicionais

### **Para Expo Go (desenvolvimento):**

Se estiver testando com Expo Go, o redirect URI é diferente:
```
exp://EXPO_PROJECT_ID/--/auth/google
```

### **Para App Standalone (produção):**

Use o custom scheme:
```
reciclamuz://auth/google
```

---

## 🔗 Links Úteis

- [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- [Documentação Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [OAuth 2.0 do Google](https://developers.google.com/identity/protocols/oauth2)

---

**Status**: ⏳ Pendente de configuração no Google Cloud Console
