import { VisualRepresentation } from '../types/audio.types'
import { MappedEmoji } from '../services/emojiMappingService'

/**
 * Converte emojis mapeados para o formato VisualRepresentation
 * usado pelo componente VisualRepresentationList
 */
export const convertMappedEmojisToVisualRepresentations = (
  mappedEmojis: MappedEmoji[],
  baseTimestamp: Date = new Date()
): VisualRepresentation[] => {
  return mappedEmojis
    .filter(emoji => emoji.found) // Apenas emojis encontrados
    .map((emoji, index) => ({
      id: `emoji-${emoji.unicode}-${Date.now()}-${index}`,
      emoji: emoji.svgAsset, // O componente SVG já mapeado
      content: emoji.content,
      confidence: 0.95, // Confiança padrão para emojis encontrados
      timestamp: new Date(baseTimestamp.getTime() + index * 100) // Timestamps sequenciais
    }))
}

/**
 * Converte um único emoji mapeado para VisualRepresentation
 */
export const convertSingleMappedEmojiToVisualRepresentation = (
  mappedEmoji: MappedEmoji,
  timestamp: Date = new Date()
): VisualRepresentation | null => {
  if (!mappedEmoji.found) {
    return null
  }

  return {
    id: `emoji-${mappedEmoji.unicode}-${Date.now()}`,
    emoji: mappedEmoji.svgAsset,
    content: mappedEmoji.content,
    confidence: 0.95,
    timestamp
  }
}

/**
 * Combina múltiplas listas de VisualRepresentation em uma única lista ordenada por timestamp
 */
export const combineVisualRepresentations = (
  ...representationLists: VisualRepresentation[][]
): VisualRepresentation[] => {
  return representationLists
    .flat()
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

/**
 * Remove duplicatas de VisualRepresentation baseado no conteúdo e unicode
 */
export const deduplicateVisualRepresentations = (
  representations: VisualRepresentation[]
): VisualRepresentation[] => {
  const seen = new Set<string>()
  
  return representations.filter(representation => {
    // Cria uma chave única baseada no conteúdo e no ID do emoji
    const key = `${representation.content}-${representation.id.split('-')[1]}`
    
    if (seen.has(key)) {
      return false
    }
    
    seen.add(key)
    return true
  })
}
