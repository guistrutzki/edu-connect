# Debug do Mapeamento de Emojis

Este guia ajuda a identificar e resolver problemas com o mapeamento de emojis.

## ✅ Sistema Atualizado

O sistema de mapeamento foi completamente refatorado e agora usa um mapeamento direto e eficiente com 2417 emojis disponíveis.

## Como Debuggar

### Passo 1: Usar o Componente de Teste

```typescript
import { EmojiMappingTest } from '../components/EmojiMappingTest'

// Use o componente para testar o mapeamento
<EmojiMappingTest />
```

### Passo 2: Testar Mapeamento Diretamente

```typescript
import { mapApiEmojisToSvgs, getFoundEmojis } from '../services/emojiMappingService'

// Teste o mapeamento com dados da API
const mappedEmojis = mapApiEmojisToSvgs(apiResponse)
const foundEmojis = getFoundEmojis(mappedEmojis)
console.log('Emojis encontrados:', foundEmojis.length)
```

### Passo 3: Verificar Códigos Disponíveis

```typescript
import { listAvailableEmojiCodes } from '../services/emojiMappingService'

// Liste todos os códigos disponíveis
const availableCodes = listAvailableEmojiCodes()
console.log('Total de códigos:', availableCodes.length)
```

## Logs para Verificar

### 1. Logs de Mapeamento (Novo Sistema)
```
🎭 Resultado do mapeamento (NOVO SISTEMA):
  - Total mapeados: 4
  - Encontrados: 4
  - Não encontrados: 0
  - Taxa de sucesso: 100.0%
```

### 2. Logs de Emojis Encontrados
```
✅ 1F642 - sorriso e felicidade
✅ 1F4AC - conversa e comunicação
✅ 1F64C - interação e celebração
✅ 1F60A - alegria e satisfação
```

### 3. Logs do Store
```
✅ Mapeamento de emojis no store: 4/4 encontrados
```

## Soluções Comuns

### Problema: Emojis não encontrados
**Solução:**
1. Verificar se os códigos estão no mapeamento gerado
2. Usar `isEmojiCodeAvailable()` para verificar
3. Verificar se os imports estão corretos

### Problema: Apenas emojis felizes aparecem
**Solução:**
1. Verificar se o `audioStore.ts` está usando o novo sistema
2. Verificar se não há cache antigo
3. Reiniciar o aplicativo

## Comandos de Debug

### 1. Verificar se emoji está disponível
```typescript
import { isEmojiCodeAvailable } from '../services/emojiMappingService'
console.log('1F642 disponível:', isEmojiCodeAvailable('1F642'))
```

### 2. Listar emojis disponíveis
```typescript
import { listAvailableEmojiCodes } from '../services/emojiMappingService'
const codes = listAvailableEmojiCodes()
console.log('Primeiros 10 códigos:', codes.slice(0, 10))
```

### 3. Testar mapeamento direto
```typescript
import { mapApiEmojisToSvgs } from '../services/emojiMappingService'

const testData = {
  text: "Como vocês estão por aí?",
  content_emojis: [
    { emoji: "1F642", content: "sorriso e felicidade" },
    { emoji: "1F4AC", content: "conversa e comunicação" },
    { emoji: "1F64C", content: "interação e celebração" },
    { emoji: "1F60A", content: "alegria e satisfação" }
  ],
  confidence: 0.95,
  timestamp: new Date().toISOString(),
  processing_time: 5297,
  chunk_duration: "3s",
  optimized_for: "ultra-fast-streaming",
  cache_hit: false,
  cache_size: 1
}

const result = mapApiEmojisToSvgs(testData)
console.log('Resultado:', result)
```

## Arquivos do Sistema Atualizado

- `src/services/emojiMappingService.ts` - Serviço principal de mapeamento
- `src/services/emojiMappingGenerated.ts` - Mapeamento automático com 2417 emojis
- `src/components/EmojiMappingTest.tsx` - Componente de teste
- `src/store/audioStore.ts` - Store atualizado para usar o novo sistema

## Próximos Passos

1. Use o componente `EmojiMappingTest` para verificar o mapeamento
2. Verifique os logs no console
3. Se todos os emojis estão sendo encontrados, o sistema está funcionando
4. Se ainda há problemas, verifique se o store está usando o novo sistema