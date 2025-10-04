# 🎯 Fluxo Simplificado: Áudio → Backend → Emojis

## 🎯 **OBJETIVO ÚNICO**
Capturar áudio em tempo real, enviar para backend que converte em texto via ChatGPT e retorna emojis correspondentes.

## 🔄 **FLUXO SIMPLES**

```
🎤 Áudio → 🌐 Backend → 🤖 ChatGPT → 🎨 Emojis → 📱 Tela
```

### **1. Captura de Áudio (Frontend)**
- Usa Expo Audio Recording
- Envia buffer/streaming para backend
- Interface de gravação

### **2. Processamento (Backend)**
- Recebe áudio via endpoint
- Converte áudio em texto via **OpenAI Whisper API**
- Analisa texto via **ChatGPT API** para extrair emojis
- Retorna emojis correspondentes

### **3. Exibição (Frontend)**
- Recebe emojis do backend
- Exibe em tempo real
- Interface simples e acessível

## 📁 **ESTRUTURA SIMPLIFICADA**

### **Frontend (React Native + Expo)**
```
src/
├── services/
│   ├── AudioService.ts         # Captura e envio de áudio
│   └── ApiService.ts           # Comunicação com backend
├── components/
│   ├── AudioCapture.tsx        # Botão de gravação
│   └── EmojiDisplay.tsx        # Lista de emojis
└── App.tsx                     # Componente principal
```

### **Backend (Node.js + Express)**
```
backend/
├── routes/
│   └── audio.ts                # Endpoint POST /api/audio
├── services/
│   ├── WhisperService.ts       # OpenAI Whisper API
│   └── ChatGPTService.ts       # OpenAI ChatGPT API
└── server.js                   # Servidor principal
```

## 🚀 **IMPLEMENTAÇÃO MÍNIMA**

### **Dependências Frontend:**
- `expo-av` (gravação de áudio)
- `zustand` (estado)
- `fetch` (comunicação com backend)

### **Dependências Backend:**
- `express` (servidor)
- `multer` (upload de arquivos)
- `openai` (Whisper + ChatGPT APIs)
- `cors` (CORS)

### **APIs Externas:**
- **OpenAI Whisper API** - Conversão áudio → texto
- **OpenAI ChatGPT API** - Análise de texto → emojis

### **Funcionalidades:**
- ✅ Gravar áudio no frontend
- ✅ Enviar áudio para backend
- ✅ Converter áudio em texto (Whisper)
- ✅ Analisar texto e extrair emojis (ChatGPT)
- ✅ Retornar emojis para frontend
- ✅ Exibir emojis na tela

## 🎯 **RESULTADO ESPERADO**

1. Usuário clica "Gravar"
2. App captura áudio
3. App envia áudio para backend
4. Backend converte áudio em texto (Whisper)
5. Backend analisa texto e extrai emojis (ChatGPT)
6. Backend retorna emojis para app
7. App exibe emojis na tela
8. Usuário clica "Parar"
9. Histórico fica salvo na tela

## 🔧 **ENDPOINT DO BACKEND**

```typescript
POST /api/audio
Content-Type: multipart/form-data

Body: {
  audio: File (buffer/streaming)
}

Response: {
  text: string,           // Texto transcrito completo
  content_emojis: [{      // Array de objetos com emoji e conteúdo
    emoji: string,        // Código hex do emoji
    content: string       // Resumo descritivo do conteúdo
  }],
  confidence: number      // Confiança da transcrição
}
```

## 🤖 **PROMPT DO CHATGPT**

```
Analise o seguinte texto e extraia:

1. EMOJIS mais relevantes que representam:
   - Emoções expressas
   - Objetos mencionados  
   - Ações descritas
   - Conceitos principais

2. CONTEÚDOS DESCRITIVOS que representam resumos em português:
   - Conceitos educacionais (ex: "Aprendizado de matemática", "Estudo de ciências")
   - Ações de aprendizado (ex: "Explicação de conceitos", "Resolução de exercícios")
   - Objetos do ambiente escolar (ex: "Material didático", "Quadro de aula")
   - Símbolos matemáticos (ex: "Operação de adição", "Cálculo numérico")
   - Elementos visuais (ex: "Ilustração conceitual", "Representação gráfica")

Texto: "{texto_transcrito}"

Retorne um JSON com:
{
  "content_emojis": [
    {"emoji": "1F600", "content": "Bom dia e cumprimento"},
    {"emoji": "1F34E", "content": "Aprendizado de matemática"},
    {"emoji": "2764", "content": "Operações básicas"}
  ]
}
```

## 📋 **REQUISITOS DO BACKEND**

### **Dependências Necessárias:**
```json
{
  "express": "^4.18.0",
  "multer": "^1.4.5",
  "openai": "^4.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0"
}
```

### **Variáveis de Ambiente:**
```env
OPENAI_API_KEY=sk-...
PORT=3000
```

### **Estrutura do Endpoint:**
```javascript
// POST /api/audio
// Content-Type: multipart/form-data
// Body: { audio: File }

// 1. Recebe arquivo de áudio via multer
// 2. Converte áudio em texto via OpenAI Whisper API
// 3. Analisa texto via OpenAI ChatGPT API
// 4. Retorna emojis correspondentes

// Response:
{
  "text": "Bom dia turma! Hoje vamos aprender matemática. Vamos estudar sobre números e operações. Quem pode me dizer quanto é dois mais três?",
  "content_emojis": [
    {"emoji": "1F44B", "content": "Cumprimento e saudação"},
    {"emoji": "1F4DA", "content": "Estudo e aprendizado"},
    {"emoji": "1F522", "content": "Números e matemática"},
    {"emoji": "2795", "content": "Operação de adição"}
  ],
  "confidence": 0.95
}
```

### **Fluxo de Processamento:**
1. **Upload**: Recebe arquivo de áudio via `multer`
2. **Transcrição**: Envia para `OpenAI Whisper API`
3. **Análise**: Envia texto para `OpenAI ChatGPT API` com prompt específico
4. **Resposta**: Retorna texto + emojis + símbolos de conteúdo para o frontend

### **Configurações do Whisper:**
```javascript
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-1",
  language: "pt", // Português
  response_format: "json"
});
```

### **Configurações do ChatGPT:**
```javascript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "Você é um especialista em extrair emojis e símbolos de conteúdo relevantes de textos educacionais. Retorne sempre um JSON válido."
    },
    {
      role: "user", 
      content: `Analise: "${transcribedText}"`
    }
  ],
  max_tokens: 200,
  response_format: { type: "json_object" }
});

// Parse da resposta
const analysis = JSON.parse(completion.choices[0].message.content);
const { content_emojis } = analysis;

// Retorna resposta formatada
return {
  text: transcribedText,
  content_emojis: content_emojis, // Array de objetos com emoji e conteúdo
  confidence: transcription.confidence || 0.95
};
```

**Simples, direto e funcional com IA!**
