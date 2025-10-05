# 🚀 Guia de Build e Deploy para Web

## 📋 **Scripts Disponíveis**

Adicionei os seguintes scripts no `package.json`:

```json
{
  "scripts": {
    "build:web": "expo export --platform web",
    "build:web:local": "expo export --platform web --output-dir ./dist",
    "preview:web": "npx serve dist",
    "deploy:web": "expo export --platform web && npx serve dist"
  }
}
```

## 🛠️ **Opções de Build**

### **1. Build Básico**
```bash
npm run build:web
```
- Gera os arquivos estáticos na pasta `dist/`
- Pronto para deploy em qualquer servidor web

### **2. Build com Pasta Personalizada**
```bash
npm run build:web:local
```
- Mesmo que o anterior, mas você pode especificar a pasta de saída

### **3. Preview Local**
```bash
npm run preview:web
```
- Faz o build e inicia um servidor local para testar
- Acesse em `http://localhost:3000`

## 🌐 **Opções de Deploy**

### **Opção 1: Vercel (Recomendado)**

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Fazer build:**
```bash
npm run build:web
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configurar `vercel.json`:**
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
  ]
}
```

### **Opção 2: Netlify**

1. **Fazer build:**
```bash
npm run build:web
```

2. **Arrastar a pasta `dist/` para Netlify**
3. **Ou usar Netlify CLI:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### **Opção 3: GitHub Pages**

1. **Instalar gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Adicionar script no package.json:**
```json
{
  "scripts": {
    "deploy:gh": "npm run build:web && gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy:gh
```

### **Opção 4: Firebase Hosting**

1. **Instalar Firebase CLI:**
```bash
npm i -g firebase-tools
```

2. **Inicializar Firebase:**
```bash
firebase init hosting
```

3. **Configurar `firebase.json`:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. **Deploy:**
```bash
npm run build:web
firebase deploy
```

## 🔧 **Configurações Importantes**

### **Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
EXPO_PUBLIC_API_URL=https://edu-connect-api-0pnr.onrender.com
```

### **Configuração do app.json para Web**
```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro",
      "output": "static"
    }
  }
}
```

## 🚀 **Comandos Rápidos**

### **Build e Teste Local:**
```bash
# Build
npm run build:web

# Testar localmente
npx serve dist
```

### **Deploy Rápido (Vercel):**
```bash
# Build + Deploy
npm run build:web
vercel --prod
```

### **Deploy Rápido (Netlify):**
```bash
# Build + Deploy
npm run build:web
netlify deploy --prod --dir=dist
```

## 📁 **Estrutura Após Build**

```
dist/
├── index.html
├── static/
│   ├── js/
│   ├── css/
│   └── media/
├── favicon.png
└── manifest.json
```

## ⚠️ **Considerações Importantes**

1. **HTTPS**: Certifique-se de que o deploy seja feito com HTTPS para funcionar o microfone
2. **CORS**: Verifique se o backend permite requisições do domínio de deploy
3. **Permissões**: O navegador pode pedir permissão para acessar o microfone
4. **Performance**: O build otimiza automaticamente os assets

## 🧪 **Teste Antes do Deploy**

```bash
# Build local
npm run build:web

# Testar
npx serve dist

# Acessar http://localhost:3000
# Testar gravação de áudio
# Verificar se a API está funcionando
```

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique os logs do build
2. Teste localmente primeiro
3. Verifique as configurações de CORS no backend
4. Confirme que as variáveis de ambiente estão corretas
