import { Audio3sService, Audio3sResponse } from './audio3sService'
import { 
  mapApiEmojisToSvgs, 
  getFoundEmojis, 
  MappedEmoji,
  ApiEmojiResponse 
} from './emojiMappingService'
import { AudioProcessingResult, VisualRepresentation } from '../types/audio.types'
import { 
  convertMappedEmojisToVisualRepresentations,
  combineVisualRepresentations,
  deduplicateVisualRepresentations
} from '../utils/emojiToVisualRepresentation'

// Interface estendida que inclui emojis mapeados
export interface AudioEmojiResult extends AudioProcessingResult {
  mappedEmojis?: MappedEmoji[]
  foundEmojis?: MappedEmoji[]
  visualRepresentations?: VisualRepresentation[]
  emojiMappingSuccess?: boolean
  success?: boolean
  error?: string
}

export class AudioEmojiService {
  private audioService: Audio3sService

  constructor(audioService?: Audio3sService) {
    this.audioService = audioService || new Audio3sService()
  }

  /**
   * Processa um chunk de áudio e mapeia os emojis retornados para SVGs
   */
  public async processAudioWithEmojis(audioUri: string, chunkId: number): Promise<AudioEmojiResult> {
    try {
      console.log(`🎵🎭 Processando áudio com mapeamento de emojis - Chunk ${chunkId}`)
      
      // Primeiro, processa o áudio
      const audioResult = await this.audioService.processChunk(audioUri, chunkId)
      
      // O Audio3sService retorna diretamente um AudioProcessingResult
      // Se não há emojis, retorna resultado sem mapeamento
      if (!audioResult.content_emojis || audioResult.content_emojis.length === 0) {
        console.log('❌ Nenhum emoji encontrado no áudio')
        return {
          ...audioResult,
          mappedEmojis: [],
          foundEmojis: [],
          visualRepresentations: [],
          emojiMappingSuccess: false,
          success: true
        }
      }

      // Converte a resposta para o formato esperado pelo mapeamento
      const apiResponse: ApiEmojiResponse = {
        text: audioResult.text,
        content_emojis: audioResult.content_emojis,
        confidence: audioResult.confidence,
        timestamp: audioResult.timestamp || new Date().toISOString(),
        processing_time: audioResult.processingTime || 0,
        chunk_duration: audioResult.metadata?.chunkDuration || '3s',
        optimized_for: audioResult.metadata?.optimizedFor || 'ultra-fast-streaming',
        cache_hit: audioResult.metadata?.cacheHit || false,
        cache_size: audioResult.metadata?.cacheSize || 0
      }

      // Mapeia os emojis para SVGs
      const mappedEmojis = mapApiEmojisToSvgs(apiResponse)
      const foundEmojis = getFoundEmojis(mappedEmojis)
      
      // Converte emojis encontrados para VisualRepresentations
      const visualRepresentations = convertMappedEmojisToVisualRepresentations(
        foundEmojis,
        new Date(apiResponse.timestamp)
      )

      console.log(`✅ Mapeamento de emojis concluído:`)
      console.log(`   - Total de emojis: ${mappedEmojis.length}`)
      console.log(`   - Emojis encontrados: ${foundEmojis.length}`)
      console.log(`   - VisualRepresentations criadas: ${visualRepresentations.length}`)
      console.log(`   - Emojis não encontrados: ${mappedEmojis.length - foundEmojis.length}`)

      // Log dos emojis encontrados
      if (foundEmojis.length > 0) {
        console.log('🎭 Emojis encontrados:')
        foundEmojis.forEach(emoji => {
          console.log(`   ✅ ${emoji.unicode} - ${emoji.content}`)
        })
      }

      // Log dos emojis não encontrados (para debug)
      const notFoundEmojis = mappedEmojis.filter(emoji => !emoji.found)
      if (notFoundEmojis.length > 0) {
        console.log('❓ Emojis não encontrados:')
        notFoundEmojis.forEach(emoji => {
          console.log(`   ❌ ${emoji.unicode} - ${emoji.content}`)
        })
      }

      return {
        ...audioResult,
        mappedEmojis,
        foundEmojis,
        visualRepresentations,
        emojiMappingSuccess: true,
        success: true
      }

    } catch (error) {
      console.error('❌ Erro no processamento de áudio com emojis:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        text: '',
        content_emojis: [],
        confidence: 0,
        chunkId: chunkId.toString(),
        mappedEmojis: [],
        foundEmojis: [],
        visualRepresentations: [],
        emojiMappingSuccess: false
      }
    }
  }

  /**
   * Processa múltiplos chunks de áudio com mapeamento de emojis
   */
  public async processMultipleChunksWithEmojis(
    audioUris: string[], 
    startChunkId: number = 0
  ): Promise<AudioEmojiResult[]> {
    console.log(`🎵🎭 Processando ${audioUris.length} chunks com mapeamento de emojis`)
    
    const results: AudioEmojiResult[] = []
    
    for (let i = 0; i < audioUris.length; i++) {
      const chunkId = startChunkId + i
      const result = await this.processAudioWithEmojis(audioUris[i], chunkId)
      results.push(result)
    }
    
    // Log do resumo geral
    const totalEmojis = results.reduce((sum, result) => sum + (result.mappedEmojis?.length || 0), 0)
    const totalFound = results.reduce((sum, result) => sum + (result.foundEmojis?.length || 0), 0)
    const successfulChunks = results.filter(result => result.success).length
    
    console.log(`📊 Resumo do processamento:`)
    console.log(`   - Chunks processados: ${results.length}`)
    console.log(`   - Chunks com sucesso: ${successfulChunks}`)
    console.log(`   - Total de emojis: ${totalEmojis}`)
    console.log(`   - Emojis encontrados: ${totalFound}`)
    
    return results
  }

  /**
   * Obtém apenas os emojis encontrados de todos os chunks processados
   */
  public getUniqueFoundEmojis(results: AudioEmojiResult[]): MappedEmoji[] {
    const allFoundEmojis = results
      .filter(result => result.foundEmojis)
      .flatMap(result => result.foundEmojis!)
    
    // Remove duplicatas baseado no unicode
    const uniqueEmojis = allFoundEmojis.filter((emoji, index, self) => 
      index === self.findIndex(e => e.unicode === emoji.unicode)
    )
    
    console.log(`🎭 Emojis únicos encontrados: ${uniqueEmojis.length}`)
    return uniqueEmojis
  }

  /**
   * Combina todas as representações visuais de múltiplos chunks processados
   */
  public combineAllVisualRepresentations(results: AudioEmojiResult[]): VisualRepresentation[] {
    const allVisualRepresentations = results
      .filter(result => result.visualRepresentations)
      .flatMap(result => result.visualRepresentations!)
    
    // Remove duplicatas e ordena por timestamp
    const uniqueRepresentations = deduplicateVisualRepresentations(allVisualRepresentations)
    
    console.log(`🎨 Representações visuais combinadas: ${uniqueRepresentations.length}`)
    return uniqueRepresentations
  }
}
