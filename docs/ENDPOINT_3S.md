# 🚀 Endpoint `/audio/3s` - Ultra-Fast Processing

> **Endpoint otimizado para processamento ultra-rápido de chunks de áudio de 3 segundos**

## 📋 Visão Geral

O endpoint `/audio/3s` é a versão mais otimizada da API EduConnect, projetada especificamente para **streaming em tempo real** com chunks de áudio de 3 segundos. Ele combina:

- ⚡ **Processamento ultra-rápido** (Whisper + ChatGPT)
- 🎯 **Cache inteligente** para reduzir latência
- 📊 **Headers otimizados** para streaming
- 🔍 **Validação rigorosa** de tamanho de arquivo

## 🎯 URL do Endpoint

```
POST http://localhost:3000/api/audio/3s
```

## 📤 Request

### Headers
```
Content-Type: multipart/form-data
```

### Body (Form Data)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `audio` | File | ✅ | Arquivo de áudio (máximo 300KB) |

### Formatos Suportados
- **MP3** - Recomendado para qualidade/velocidade
- **WAV** - Alta qualidade, arquivo maior
- **OPUS** - Otimizado para streaming
- **M4A** - Compatível com iOS

### Limitações
- **Tamanho máximo**: 300KB (≈ 3 segundos de áudio)
- **Duração recomendada**: 2-4 segundos
- **Qualidade**: 16kHz, mono (otimizado para Whisper)

## 📥 Response

### Headers de Resposta
```
Content-Type: application/json
Cache-Control: no-cache
Connection: keep-alive
X-Processing-Optimized: 3s-ultra-fast
X-Chunk-Size: [tamanho_do_arquivo]
```

### Estrutura da Resposta

```json
{
  "text": "string",                    // Texto transcrito
  "content_emojis": [                  // Array de emojis mapeados
    {
      "emoji": "string",               // Unicode do emoji
      "content": "string"              // Descrição/conteúdo
    }
  ],
  "confidence": "number",              // Confiança da transcrição (0-1)
  "timestamp": "string",               // ISO timestamp
  "processing_time": "number",         // Tempo de processamento (ms)
  "chunk_duration": "3s",              // Duração do chunk
  "optimized_for": "ultra-fast-streaming",
  "cache_hit": "boolean",              // Se usou cache
  "cache_size": "number"               // Tamanho atual do cache
}
```

### Exemplo de Resposta

```json
{
  "text": "Olá, como você está?",
  "content_emojis": [
    {
      "emoji": "👋",
      "content": "cumprimento/saudação"
    },
    {
      "emoji": "😊",
      "content": "bem-estar/positivo"
    }
  ],
  "confidence": 0.98,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "processing_time": 850,
  "chunk_duration": "3s",
  "optimized_for": "ultra-fast-streaming",
  "cache_hit": false,
  "cache_size": 23
}
```

## 🔧 Implementação Prática

### JavaScript/TypeScript

```typescript
class EduConnect3s {
  private baseUrl = 'http://localhost:3000/api';
  
  async processChunk(audioBlob: Blob): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'chunk.opus');
    
    try {
      const response = await fetch(`${this.baseUrl}/audio/3s`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      
      const result = await response.json();
      
      // Log de performance
      console.log(`⚡ Processado em ${result.processing_time}ms`);
      console.log(`🎯 Cache hit: ${result.cache_hit}`);
      
      return result;
    } catch (error) {
      console.error('Erro no processamento 3s:', error);
      throw error;
    }
  }
  
  // Método para streaming contínuo
  async startStreaming(audioStream: MediaStream) {
    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm;codecs=opus'
    });
    
    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        try {
          const result = await this.processChunk(event.data);
          this.handleResult(result);
        } catch (error) {
          console.error('Erro no chunk:', error);
        }
      }
    };
    
    // Processar a cada 3 segundos
    mediaRecorder.start(3000);
    
    return mediaRecorder;
  }
  
  private handleResult(result: ApiResponse) {
    // Atualizar UI com texto transcrito
    this.updateTranscription(result.text);
    
    // Exibir emojis
    result.content_emojis.forEach(emoji => {
      this.displayEmoji(emoji.emoji, emoji.content);
    });
    
    // Mostrar confiança
    this.updateConfidence(result.confidence);
  }
}
```

### React Native

```typescript
import { Audio } from 'expo-av';

class EduConnect3sRN {
  private baseUrl = 'http://localhost:3000/api';
  
  async processChunk(audioUri: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/opus',
      name: 'chunk.opus'
    } as any);
    
    try {
      const response = await fetch(`${this.baseUrl}/audio/3s`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro no processamento 3s:', error);
      throw error;
    }
  }
  
  async startRecording(): Promise<void> {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permissão de áudio negada');
      }
      
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: '.opus',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_OPUS,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_OPUS,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.opus',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_OPUS,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
      });
      
      await recording.startAsync();
      
      // Processar chunks a cada 3 segundos
      const interval = setInterval(async () => {
        try {
          const uri = await recording.getURI();
          const result = await this.processChunk(uri);
          this.handleResult(result);
        } catch (error) {
          console.error('Erro no chunk:', error);
        }
      }, 3000);
      
      // Parar após 30 segundos
      setTimeout(async () => {
        clearInterval(interval);
        await recording.stopAndUnloadAsync();
      }, 30000);
      
    } catch (error) {
      console.error('Erro na gravação:', error);
      throw error;
    }
  }
}
```

### Flutter

```dart
import 'package:http/http.dart' as http;
import 'dart:io';
import 'dart:convert';

class EduConnect3sFlutter {
  static const String baseUrl = 'http://localhost:3000/api';
  
  static Future<Map<String, dynamic>> processChunk(List<int> audioBytes) async {
    var request = http.MultipartRequest(
      'POST', 
      Uri.parse('$baseUrl/audio/3s')
    );
    
    request.files.add(
      http.MultipartFile.fromBytes(
        'audio', 
        audioBytes, 
        filename: 'chunk.opus'
      )
    );
    
    try {
      var response = await request.send();
      var responseData = await response.stream.bytesToString();
      
      if (response.statusCode == 200) {
        return json.decode(responseData);
      } else {
        throw Exception('Erro ao processar chunk: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Erro na requisição: $e');
    }
  }
  
  static Future<void> startStreaming() async {
    // Configurar gravação de áudio
    // Processar chunks a cada 3 segundos
    // Enviar para API
  }
}
```

## ⚡ Otimizações de Performance

### 1. **Cache Inteligente**
- **Chave**: Primeiros 50 caracteres do texto
- **Tamanho**: Máximo 100 entradas
- **Estratégia**: LRU (Least Recently Used)
- **Benefício**: Reduz latência em 60-80%

### 2. **Headers Otimizados**
```typescript
// Headers para streaming ultra-rápido
res.setHeader('Content-Type', 'application/json');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
res.setHeader('X-Processing-Optimized', '3s-ultra-fast');
res.setHeader('X-Chunk-Size', buffer.length.toString());
```

### 3. **Validação Rigorosa**
- **Tamanho máximo**: 300KB
- **Validação prévia**: Antes do processamento
- **Resposta rápida**: Para arquivos muito grandes

## 🚨 Tratamento de Erros

### Códigos de Status

| Código | Descrição | Solução |
|--------|-----------|---------|
| `200` | Sucesso | ✅ Processamento concluído |
| `400` | Arquivo não enviado | Enviar arquivo de áudio |
| `400` | Arquivo muito grande | Reduzir tamanho para <300KB |
| `500` | Erro interno | Verificar logs do servidor |

### Exemplo de Tratamento

```typescript
try {
  const result = await processChunk(audioBlob);
  
  if (result.cache_hit) {
    console.log('🎯 Cache hit - resposta ultra-rápida!');
  }
  
  if (result.processing_time > 1000) {
    console.warn('⚠️ Processamento lento:', result.processing_time + 'ms');
  }
  
} catch (error) {
  if (error.message.includes('muito grande')) {
    // Reduzir qualidade do áudio
    this.reduceAudioQuality();
  } else if (error.message.includes('Nenhum arquivo')) {
    // Verificar se o arquivo foi enviado
    this.checkAudioFile();
  } else {
    // Erro genérico
    this.showGenericError();
  }
}
```

## 📊 Monitoramento

### Métricas Importantes

```typescript
// Exemplo de monitoramento
const metrics = {
  processingTime: result.processing_time,
  cacheHitRate: result.cache_hit ? 1 : 0,
  cacheSize: result.cache_size,
  confidence: result.confidence,
  chunkSize: result.chunk_duration
};

// Log de performance
console.log(`⚡ ${metrics.processingTime}ms | 🎯 Cache: ${metrics.cacheHitRate} | 📊 Size: ${metrics.cacheSize}`);
```

### Headers de Debug

```typescript
// Verificar headers de resposta
const headers = response.headers;
console.log('X-Processing-Optimized:', headers.get('X-Processing-Optimized'));
console.log('X-Chunk-Size:', headers.get('X-Chunk-Size'));
```

## 🎯 Casos de Uso Ideais

### 1. **Streaming em Tempo Real**
- Aulas online ao vivo
- Reuniões com transcrição
- Treinamentos interativos

### 2. **Aplicações Móveis**
- Gravação contínua
- Processamento local
- Sincronização com servidor

### 3. **Interfaces de Acessibilidade**
- Suporte para autismo
- Deficiência auditiva
- Deficiência visual

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

```bash
# Otimizações específicas para 3s
CHUNK_SIZE_3S=300000          # 300KB
CACHE_SIZE_3S=100             # 100 entradas
PROCESSING_TIMEOUT_3S=5000    # 5 segundos
```

### Headers Personalizados

```typescript
// Headers customizados para o cliente
const customHeaders = {
  'X-Client-Version': '1.0.0',
  'X-Platform': 'mobile',
  'X-User-ID': 'user123'
};
```

---

**🚀 Endpoint `/audio/3s` - A escolha para processamento ultra-rápido em tempo real!**
