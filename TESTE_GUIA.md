# 🧪 Guia de Teste - Endpoint `/audio/3s`

## 📋 **Situação Atual**

✅ **Frontend implementado** - React Native/Expo com integração ao endpoint `/audio/3s`  
❌ **Backend não implementado** - Precisa ser criado ou usar mock

---

## 🎯 **Opções de Teste**

### **Opção 1: Teste com Backend Real (Recomendado)**

#### **1.1 Criar Backend Simples**

Crie um servidor Node.js básico para testar:

```bash
# Criar pasta do backend
mkdir backend
cd backend

# Inicializar projeto
npm init -y

# Instalar dependências
npm install express multer cors dotenv
npm install -D nodemon

# Criar arquivo .env
echo "PORT=3000" > .env
```

#### **1.2 Implementar Servidor**

Crie `backend/server.js`:

```javascript
const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 300 * 1024, // 300KB
  }
});

// Endpoint /api/audio/3s
app.post('/api/audio/3s', upload.single('audio'), (req, res) => {
  try {
    console.log('🎵 Recebido chunk de áudio:', {
      size: req.file?.size,
      mimetype: req.file?.mimetype,
      timestamp: new Date().toISOString()
    });

    // Simular processamento
    const processingTime = Math.random() * 1000 + 500; // 500-1500ms
    
    // Resposta mockada baseada na documentação
    const response = {
      text: "Olá, como você está? Este é um teste do endpoint 3s.",
      content_emojis: [
        {
          emoji: "👋",
          content: "cumprimento/saudação"
        },
        {
          emoji: "😊",
          content: "bem-estar/positivo"
        },
        {
          emoji: "🧪",
          content: "teste/experimento"
        }
      ],
      confidence: 0.95,
      timestamp: new Date().toISOString(),
      processing_time: Math.round(processingTime),
      chunk_duration: "3s",
      optimized_for: "ultra-fast-streaming",
      cache_hit: Math.random() > 0.5, // 50% chance de cache hit
      cache_size: Math.floor(Math.random() * 100) + 1
    };

    // Headers otimizados
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Processing-Optimized', '3s-ultra-fast');
    res.setHeader('X-Chunk-Size', req.file?.size?.toString() || '0');

    console.log('✅ Resposta enviada:', {
      text: response.text.substring(0, 50) + '...',
      processingTime: response.processing_time + 'ms',
      cacheHit: response.cache_hit
    });

    res.json(response);

  } catch (error) {
    console.error('❌ Erro no endpoint:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Endpoint de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 Endpoint 3s: http://localhost:${PORT}/api/audio/3s`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
```

#### **1.3 Executar Backend**

```bash
# No terminal do backend
npm run dev
# ou
node server.js
```

#### **1.4 Testar Backend**

```bash
# Testar health check
curl http://localhost:3000/health

# Testar endpoint 3s (com arquivo de áudio)
curl -X POST http://localhost:3000/api/audio/3s \
  -F "audio=@caminho/para/arquivo.wav"
```

---

### **Opção 2: Teste com Mock Local**

#### **2.1 Modificar Configuração**

Edite `src/services/audio3sService.ts`:

```typescript
// Adicionar modo de desenvolvimento
private isDevelopment = __DEV__;

public async processChunk(audioUri: string, chunkId: number): Promise<AudioProcessingResult> {
  // Se em desenvolvimento, usar mock
  if (this.isDevelopment) {
    return this.getMockResponse(chunkId);
  }
  
  // Código original da API...
}

private getMockResponse(chunkId: number): AudioProcessingResult {
  const mockTexts = [
    "Olá, como você está?",
    "Vamos aprender matemática hoje.",
    "Que dia lindo para estudar!",
    "Agora vamos fazer exercícios.",
    "Parabéns pelo seu progresso!"
  ];
  
  const mockEmojis = [
    { emoji: "👋", content: "cumprimento" },
    { emoji: "📚", content: "estudo" },
    { emoji: "☀️", content: "dia bonito" },
    { emoji: "✏️", content: "exercícios" },
    { emoji: "🎉", content: "parabéns" }
  ];
  
  const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
  const randomEmojis = mockEmojis.slice(0, Math.floor(Math.random() * 3) + 1);
  
  return {
    chunkId: chunkId.toString(),
    text: randomText,
    confidence: 0.9 + Math.random() * 0.1,
    timestamp: new Date().toISOString(),
    processingTime: Math.random() * 500 + 200,
    emojis: randomEmojis.map(emoji => ({
      emoji: emoji.emoji,
      description: emoji.content
    })),
    metadata: {
      chunkDuration: "3s",
      optimizedFor: "ultra-fast-streaming",
      cacheHit: Math.random() > 0.5,
      cacheSize: Math.floor(Math.random() * 100) + 1,
      apiProcessingTime: Math.random() * 500 + 200
    }
  };
}
```

---

## 🚀 **Como Executar os Testes**

### **Passo 1: Preparar o Ambiente**

```bash
# 1. Instalar dependências do frontend
npm install

# 2. (Opção 1) Iniciar backend
cd backend && npm run dev

# 3. (Opção 2) Ou usar mock local (já configurado)
```

### **Passo 2: Executar o App**

```bash
# Terminal 1: Backend (se usando Opção 1)
cd backend && npm run dev

# Terminal 2: Frontend
npm start
```

### **Passo 3: Testar no Dispositivo**

1. **Abrir o app** no dispositivo/simulador
2. **Navegar** para a tela de gravação
3. **Tocar em "Iniciar Gravação"**
4. **Falar por alguns segundos**
5. **Observar os logs** no console

---

## 📊 **O que Observar nos Testes**

### **Logs do Console (Frontend)**

```
🎙️ Configurando áudio...
✅ Áudio configurado com sucesso
🎬 Iniciando gravação...
🔄 Iniciando processamento de chunks via API 3s...
📦 Processando chunk...
🚀 Enviando chunk 1 para API 3s...
⚡ Processado em 850ms
🎯 Cache hit: false
📊 Cache size: 23
🎉 Chunk 1 processado com sucesso!
📝 Texto: Olá, como você está?
🎯 Confiança: 0.98
😊 Emojis: 2
```

### **Logs do Console (Backend)**

```
🚀 Servidor rodando em http://localhost:3000
🎵 Recebido chunk de áudio: { size: 245760, mimetype: 'audio/opus' }
✅ Resposta enviada: { text: 'Olá, como você está?...', processingTime: '850ms', cacheHit: false }
```

### **Interface do App**

- ✅ **Indicador de gravação** piscando
- ✅ **Timer** mostrando duração
- ✅ **Transcrições** aparecendo a cada 3 segundos
- ✅ **Emojis** sendo exibidos em tempo real
- ✅ **Confiança** sendo mostrada

---

## 🔧 **Troubleshooting**

### **Problema: "Network request failed"**

**Solução:**
```bash
# Verificar se o backend está rodando
curl http://localhost:3000/health

# Verificar configuração no app
# Em src/services/audio3sService.ts, linha 26:
baseUrl: 'http://localhost:3000'  # Para simulador iOS
# ou
baseUrl: 'http://10.0.2.2:3000'   # Para emulador Android
```

### **Problema: "Permission denied"**

**Solução:**
```bash
# Verificar permissões de áudio no dispositivo
# iOS: Settings > Privacy > Microphone
# Android: Settings > Apps > Permissions
```

### **Problema: "File too large"**

**Solução:**
- Verificar se o arquivo de áudio está < 300KB
- Verificar configuração do multer no backend

---

## 📈 **Métricas de Sucesso**

### **Performance Esperada:**
- ⚡ **Tempo de processamento**: < 1000ms
- 🎯 **Taxa de cache hit**: 50-80%
- 📊 **Tamanho do cache**: 1-100 entradas
- 🔄 **Intervalo de chunks**: 3 segundos exatos

### **Funcionalidades:**
- ✅ Gravação contínua
- ✅ Envio automático a cada 3s
- ✅ Processamento em tempo real
- ✅ Exibição de transcrições
- ✅ Exibição de emojis
- ✅ Tratamento de erros
- ✅ Cancelamento de requisições

---

## 🎯 **Próximos Passos**

1. **Testar com backend real** (Opção 1)
2. **Implementar backend completo** com OpenAI APIs
3. **Otimizar performance** baseado nos resultados
4. **Adicionar mais funcionalidades** conforme necessário

---

**🚀 Agora você pode testar a implementação do endpoint `/audio/3s`!**
