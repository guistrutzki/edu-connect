# Debug do Mapeamento de Emojis

Este guia ajuda a identificar e resolver problemas com o mapeamento de emojis.

## Problema Reportado
> "Ele deu errado, não enviou request"

## Possíveis Causas

### 1. Problema de Conectividade com a API
- A API não está rodando
- URL incorreta na configuração
- Problemas de rede

### 2. Problema no Audio3sService
- Erro na criação do FormData
- Problema com o arquivo de áudio
- Erro na requisição HTTP

### 3. Problema no Mapeamento de Emojis
- Códigos de emoji não encontrados nos SVGs
- Erro na conversão para VisualRepresentations

## Como Debuggar

### Passo 1: Testar Conectividade da API

```typescript
import { runConnectivityTests } from '../services/audioServiceTest'

// Execute no console ou em um componente
runConnectivityTests()
```

### Passo 2: Testar com Dados Simulados

```typescript
import { testWithSimulatedData } from '../services/audioEmojiServiceDebug'

// Teste o mapeamento sem fazer requisição HTTP
const result = await testWithSimulatedData()
console.log('Resultado:', result)
```

### Passo 3: Testar Audio3sService Diretamente

```typescript
import { testAudio3sService } from '../services/audioServiceTest'

// Teste se o Audio3sService está funcionando
await testAudio3sService()
```

### Passo 4: Usar o Componente de Teste

```typescript
import SimpleEmojiTest from '../examples/SimpleEmojiTest'

// Use o componente para testar interativamente
<SimpleEmojiTest />
```

## Logs para Verificar

### 1. Logs de Configuração
```
🔧 API Configuration: { platform: 'ios', baseUrl: 'http://192.168.2.101:3000', isDev: true }
```

### 2. Logs de Requisição
```
🚀 Processando chunk 1 via endpoint 3s...
📍 URL da API: http://192.168.2.101:3000/api/audio/3s
🎵 URI do áudio: file://path/to/audio.m4a
📦 FormData criado para chunk 1
🌐 Fazendo requisição para: http://192.168.2.101:3000/api/audio/3s
```

### 3. Logs de Resposta
```
📡 Resposta recebida: { status: 200, statusText: 'OK', ok: true }
⚡ Processado em 5084ms
🎯 Cache hit: false
📊 Cache size: 1
```

### 4. Logs de Mapeamento
```
🎭 Emojis encontrados:
   ✅ 1F600 - alegria e felicidade
   ✅ 1F308 - arco-íris e beleza
   ✅ 1F4AA - força e vitórias
   ✅ 1F389 - celebração e sucesso
```

## Soluções Comuns

### Problema: API não está acessível
**Solução:**
1. Verificar se a API está rodando na porta 3000
2. Verificar o IP na configuração (`src/config/api.ts`)
3. Testar conectividade com `testApiConnectivity()`

### Problema: Arquivo de áudio não encontrado
**Solução:**
1. Verificar se o arquivo existe
2. Verificar permissões de acesso
3. Usar um arquivo de áudio válido

### Problema: Emojis não encontrados
**Solução:**
1. Verificar se os códigos estão nos SVGs
2. Usar `isEmojiCodeAvailable()` para verificar
3. Verificar se os imports estão corretos

### Problema: Erro de rede
**Solução:**
1. Verificar conectividade de rede
2. Verificar se não há firewall bloqueando
3. Testar com diferentes URLs/IPs

## Comandos de Debug

### 1. Verificar configuração da API
```typescript
import { API_CONFIG } from '../config/api'
console.log('Configuração:', API_CONFIG)
```

### 2. Verificar se emoji está disponível
```typescript
import { isEmojiCodeAvailable } from '../services/emojiMappingService'
console.log('1F600 disponível:', isEmojiCodeAvailable('1F600'))
```

### 3. Listar emojis disponíveis
```typescript
import { listAvailableEmojiCodes } from '../services/emojiMappingService'
const codes = listAvailableEmojiCodes()
console.log('Primeiros 10 códigos:', codes.slice(0, 10))
```

### 4. Testar mapeamento direto
```typescript
import { mapApiEmojisToSvgs } from '../services/emojiMappingService'

const testData = {
  text: "teste",
  content_emojis: [{ emoji: "1F600", content: "feliz" }],
  confidence: 0.95,
  timestamp: new Date().toISOString(),
  processing_time: 1000,
  chunk_duration: "3s",
  optimized_for: "ultra-fast-streaming",
  cache_hit: false,
  cache_size: 0
}

const result = mapApiEmojisToSvgs(testData)
console.log('Resultado:', result)
```

## Próximos Passos

1. Execute os testes de conectividade
2. Verifique os logs no console
3. Teste com dados simulados primeiro
4. Se funcionar com dados simulados, o problema é na requisição HTTP
5. Se não funcionar, o problema é no mapeamento de emojis

## Arquivos de Debug Criados

- `src/services/audioEmojiServiceDebug.ts` - Versão debug do serviço
- `src/services/audioServiceTest.ts` - Testes de conectividade
- `src/examples/SimpleEmojiTest.tsx` - Componente de teste interativo
- `src/services/audioEmojiServiceTest.ts` - Testes automatizados
