# 🚀 Deploy na Vercel - Guia Completo

## ⚡ **Scripts Prontos para Vercel**

Adicionei os seguintes scripts no `package.json`:

```json
{
  "scripts": {
    "vercel:build": "expo export --platform web --output-dir ./dist",
    "vercel:deploy": "npm run vercel:build && vercel --prod",
    "vercel:dev": "npm run vercel:build && vercel"
  }
}
```

## 🛠️ **Instalação e Configuração**

### **1. Instalar Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login na Vercel**
```bash
vercel login
```

### **3. Configurar Projeto (Primeira vez)**
```bash
vercel
```
- Escolha o nome do projeto
- Configure as opções conforme necessário

## 🚀 **Comandos de Deploy**

### **Deploy de Produção (Recomendado)**
```bash
npm run vercel:deploy
```
- Faz o build e deploy direto para produção
- URL será: `https://seu-projeto.vercel.app`

### **Deploy de Desenvolvimento**
```bash
npm run vercel:dev
```
- Faz o build e deploy para preview
- URL será: `https://seu-projeto-git-branch.vercel.app`

### **Apenas Build (sem deploy)**
```bash
npm run vercel:build
```
- Gera apenas os arquivos na pasta `dist/`

## 📁 **Arquivos de Configuração**

### **vercel.json** (já criado)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔧 **Variáveis de Ambiente**

### **Criar arquivo .env na raiz:**
```env
EXPO_PUBLIC_API_URL=https://edu-connect-api-0pnr.onrender.com
```

### **Configurar na Vercel:**
1. Acesse o dashboard da Vercel
2. Vá em Settings > Environment Variables
3. Adicione:
   - `EXPO_PUBLIC_API_URL` = `https://edu-connect-api-0pnr.onrender.com`

## 📋 **Passo a Passo Completo**

### **Primeira vez:**
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Configurar projeto
vercel

# 4. Deploy
npm run vercel:deploy
```

### **Deploys futuros:**
```bash
# Deploy direto para produção
npm run vercel:deploy
```

## 🧪 **Teste Local Antes do Deploy**

```bash
# Build local
npm run vercel:build

# Testar localmente
npx serve dist

# Acessar http://localhost:3000
# Testar gravação de áudio
```

## 🌐 **URLs do Deploy**

Após o deploy, você terá:
- **Produção**: `https://seu-projeto.vercel.app`
- **Preview**: `https://seu-projeto-git-branch.vercel.app`

## ⚠️ **Considerações Importantes**

1. **HTTPS**: A Vercel fornece HTTPS automaticamente
2. **Microfone**: Funciona apenas em HTTPS
3. **CORS**: Verifique se o backend permite requisições do domínio da Vercel
4. **Performance**: A Vercel otimiza automaticamente os assets

## 🔍 **Debugging**

### **Ver logs do build:**
```bash
vercel logs
```

### **Ver logs em tempo real:**
```bash
vercel logs --follow
```

### **Verificar status:**
```bash
vercel ls
```

## 🚨 **Troubleshooting**

### **Erro de build:**
```bash
# Limpar cache
rm -rf dist/
npm run vercel:build
```

### **Erro de CORS:**
- Verifique se o backend permite requisições do domínio da Vercel
- Adicione o domínio nas configurações de CORS do backend

### **Erro de microfone:**
- Certifique-se de que está acessando via HTTPS
- Verifique as permissões do navegador

## 📞 **Comandos Úteis**

```bash
# Ver informações do projeto
vercel inspect

# Remover deploy
vercel remove

# Ver domínios
vercel domains

# Ver variáveis de ambiente
vercel env ls
```

## ✅ **Checklist Final**

- [ ] Vercel CLI instalado
- [ ] Login realizado
- [ ] Projeto configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Build testado localmente
- [ ] Deploy realizado
- [ ] Aplicação funcionando
- [ ] Microfone testado
- [ ] API funcionando
