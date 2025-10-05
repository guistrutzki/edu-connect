import * as EmojiAssets from '../assets/svgs/index'
import { UNICODE_TO_IMPORT_MAP } from './emojiMappingGenerated'

// Interface para o retorno da API
export interface ApiEmojiResponse {
  text: string
  content_emojis: {
    emoji: string
    content: string
  }[]
  confidence: number
  timestamp: string
  processing_time: number
  chunk_duration: string
  optimized_for: string
  cache_hit: boolean
  cache_size: number
}

// Interface para emoji mapeado
export interface MappedEmoji {
  unicode: string
  content: string
  svgAsset: any
  found: boolean
}

// Função para encontrar o SVG correto baseado no código unicode
const findSvgByUnicode = (unicode: string): any => {
  const normalizedUnicode = unicode.toUpperCase()
  
  // Primeiro, tenta o mapeamento direto
  const importName = UNICODE_TO_IMPORT_MAP[normalizedUnicode]
  if (importName && EmojiAssets[importName as keyof typeof EmojiAssets]) {
    return EmojiAssets[importName as keyof typeof EmojiAssets]
  }
  
  // Se não encontrou no mapeamento direto, tenta busca dinâmica
  const searchPattern = `CODE_${normalizedUnicode}`
  for (const [key, value] of Object.entries(EmojiAssets)) {
    if (key.includes(searchPattern)) {
      return value
    }
  }
  
  return null
}

// Função principal para mapear emojis da API para SVGs
export const mapApiEmojisToSvgs = (apiResponse: ApiEmojiResponse): MappedEmoji[] => {
  return apiResponse.content_emojis.map(emojiData => {
    const svgAsset = findSvgByUnicode(emojiData.emoji)
    
    return {
      unicode: emojiData.emoji,
      content: emojiData.content,
      svgAsset: svgAsset,
      found: svgAsset !== null
    }
  })
}

// Função para obter apenas emojis encontrados
export const getFoundEmojis = (mappedEmojis: MappedEmoji[]): MappedEmoji[] => {
  return mappedEmojis.filter(emoji => emoji.found)
}

// Função para obter emojis não encontrados (para debug)
export const getNotFoundEmojis = (mappedEmojis: MappedEmoji[]): MappedEmoji[] => {
  return mappedEmojis.filter(emoji => !emoji.found)
}

// Função para debug - listar todos os códigos disponíveis
export const listAvailableEmojiCodes = (): string[] => {
  return Object.keys(UNICODE_TO_IMPORT_MAP).sort()
}

// Função para verificar se um código específico está disponível
export const isEmojiCodeAvailable = (unicode: string): boolean => {
  return findSvgByUnicode(unicode) !== null
}
