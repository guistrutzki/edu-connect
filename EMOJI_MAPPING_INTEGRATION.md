# Integração de Mapeamento de Emojis

Este documento explica como usar o sistema de mapeamento de emojis que conecta a API de áudio com os SVGs de emojis do projeto.

## Visão Geral

O sistema permite:
1. Processar áudio e receber códigos de emoji da API
2. Mapear esses códigos para os SVGs corretos do projeto
3. Exibir as representações visuais no componente `VisualRepresentationList`

## Arquivos Criados

### 1. `src/services/emojiMappingService.ts`
Serviço principal que mapeia códigos de emoji da API para SVGs.

**Principais funções:**
- `mapApiEmojisToSvgs()` - Mapeia emojis da API para SVGs
- `findSvgByUnicode()` - Encontra SVG baseado no código unicode
- `isEmojiCodeAvailable()` - Verifica se um código está disponível

### 2. `src/services/audioEmojiService.ts`
Serviço integrado que combina processamento de áudio com mapeamento de emojis.

**Principais funções:**
- `processAudioWithEmojis()` - Processa áudio e mapeia emojis
- `processMultipleChunksWithEmojis()` - Processa múltiplos chunks
- `combineAllVisualRepresentations()` - Combina representações visuais

### 3. `src/utils/emojiToVisualRepresentation.ts`
Utilitários para converter emojis mapeados para o formato `VisualRepresentation`.

**Principais funções:**
- `convertMappedEmojisToVisualRepresentations()` - Converte emojis para representações visuais
- `deduplicateVisualRepresentations()` - Remove duplicatas

### 4. `src/components/EmojiDisplayExample.tsx`
Componente de exemplo mostrando como exibir emojis mapeados.

### 5. `src/examples/AudioEmojiIntegrationExample.tsx`
Exemplo completo de integração com o `VisualRepresentationList`.

## Como Usar

### 1. Processamento Básico de Áudio com Emojis

```typescript
import { AudioEmojiService } from '../services/audioEmojiService'

const audioEmojiService = new AudioEmojiService()

// Processar um chunk de áudio
const result = await audioEmojiService.processAudioWithEmojis(audioUri, chunkId)

if (result.success && result.visualRepresentations) {
  // Usar as representações visuais no componente
  setVisualRepresentations(prev => [...prev, ...result.visualRepresentations!])
}
```

### 2. Integração com VisualRepresentationList

```typescript
import { VisualRepresentationList } from '../components/atoms/VisualRepresentationList/VisualRepresentationList'

// No seu componente
<VisualRepresentationList
  visualRepresentations={visualRepresentations}
  isProcessing={isProcessing}
/>
```

### 3. Processamento de Múltiplos Chunks

```typescript
// Processar múltiplos chunks
const results = await audioEmojiService.processMultipleChunksWithEmojis(audioUris, 0)

// Combinar todas as representações visuais
const combinedRepresentations = audioEmojiService.combineAllVisualRepresentations(results)
```

## Exemplo de Retorno da API

```json
{
  "text": "Fala pessoal, esse aqui é um teste, estou muito feliz...",
  "content_emojis": [
    {
      "emoji": "1F600",
      "content": "alegria e felicidade"
    },
    {
      "emoji": "1F308",
      "content": "arco-íris e beleza"
    },
    {
      "emoji": "1F4AA",
      "content": "força e vitórias"
    },
    {
      "emoji": "1F389",
      "content": "celebração e sucesso"
    }
  ],
  "confidence": 0.95,
  "timestamp": "2025-10-05T11:06:41.868Z"
}
```

## Mapeamento de Códigos

O sistema mapeia códigos como:
- `1F600` → `EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600`
- `1F308` → `EMOJI_TRAVEL_PLACES_SKY_WEATHER_CODE_1F308`
- `1F4AA` → `EMOJI_PEOPLE_BODY_HAND_FINGERS_PARTIAL_CODE_1F4AA`
- `1F389` → `EMOJI_ACTIVITIES_EVENT_CODE_1F389`

## Logs e Debug

O sistema fornece logs detalhados:
- ✅ Emojis encontrados e mapeados
- ❌ Emojis não encontrados
- 📊 Estatísticas de processamento
- 🎨 Contagem de representações visuais

## Tratamento de Erros

- Emojis não encontrados são filtrados automaticamente
- Erros de processamento são capturados e logados
- Fallbacks são fornecidos para casos de erro

## Performance

- Mapeamento é feito em memória (rápido)
- Duplicatas são removidas automaticamente
- Processamento pode ser feito em paralelo para múltiplos chunks

## Próximos Passos

1. Integrar com o sistema de gravação existente
2. Adicionar cache para emojis frequentemente usados
3. Implementar fallbacks para emojis não encontrados
4. Adicionar animações para novos emojis
