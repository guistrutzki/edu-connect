import { AudioProcessingResult, AudioError } from '../types/audio.types'
import { API_CONFIG } from '../config/api'
import { Platform } from 'react-native'

export interface Audio3sResponse {
  text: string
  content_emojis: Array<{
    emoji: string
    content: string
  }>
  confidence: number
  timestamp: string
  processing_time: number
  chunk_duration: string
  optimized_for: string
  cache_hit: boolean
  cache_size: number
}

export interface Audio3sConfig {
  baseUrl: string
  timeout: number
  maxRetries: number
  retryDelay: number
}

export class Audio3sService {
  private config: Audio3sConfig
  private abortController: AbortController | null = null

  constructor(config?: Partial<Audio3sConfig>) {
    this.config = {
      baseUrl: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      maxRetries: API_CONFIG.maxRetries,
      retryDelay: API_CONFIG.retryDelay,
      ...config
    }
    console.log('🔧 Audio3sService configurado com baseUrl:', this.config.baseUrl)
  }

  /**
   * Processa um chunk de áudio de 3 segundos usando o endpoint otimizado
   */
  public async processChunk(audioUri: string, chunkId: number): Promise<AudioProcessingResult> {
    try {
      console.log(`🚀 Processando chunk ${chunkId} via endpoint 3s...`)
      console.log(`📍 URL da API: ${this.config.baseUrl}/api/audio/3s`)
      console.log(`🎵 URI do áudio: ${audioUri}`)
      
      // Cancel any existing request
      if (this.abortController) {
        this.abortController.abort()
      }

      this.abortController = new AbortController()

      // Create form data based on platform
      const formData = new FormData()
      
      if (Platform.OS === 'web') {
        // For web, we need to fetch the audio as a blob
        try {
          console.log(`🌐 Web platform detected, fetching audio blob from: ${audioUri}`)
          const response = await fetch(audioUri)
          const audioBlob = await response.blob()
          
          // Create a File object from the blob
          const audioFile = new File([audioBlob], `chunk_${chunkId}.m4a`, {
            type: 'audio/m4a'
          })
          
          formData.append('audio', audioFile)
          console.log(`📦 Web FormData created with File object:`, {
            name: audioFile.name,
            type: audioFile.type,
            size: audioFile.size
          })
        } catch (error) {
          console.error('❌ Error creating audio blob for web:', error)
          throw new Error(`Failed to create audio blob for web: ${error}`)
        }
      } else {
        // For React Native (iOS/Android), use the uri format
        formData.append('audio', {
          uri: audioUri,
          type: 'audio/m4a',
          name: `chunk_${chunkId}.m4a`,
        } as any)
        console.log(`📱 React Native FormData created with URI:`, audioUri)
      }

      console.log(`📦 FormData criado para chunk ${chunkId}`)
      const startTime = Date.now()

      // Make API request
      console.log(`🌐 Fazendo requisição para: ${this.config.baseUrl}/api/audio/3s`)
      
      // Prepare headers based on platform
      const headers: Record<string, string> = {}
      
      // Only set Content-Type for React Native, let browser handle it for web
      if (Platform.OS !== 'web') {
        headers['Content-Type'] = 'multipart/form-data'
      }
      
      const response = await fetch(`${this.config.baseUrl}/api/audio/3s`, {
        method: 'POST',
        body: formData,
        headers,
        signal: this.abortController.signal,
      })
      
      console.log(`📡 Resposta recebida:`, {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })

      const processingTime = Date.now() - startTime

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: Audio3sResponse = await response.json()
      
      // Log de performance
      console.log(`⚡ Processado em ${result.processing_time}ms`)
      console.log(`🎯 Cache hit: ${result.cache_hit}`)
      console.log(`📊 Cache size: ${result.cache_size}`)

      // Convert to AudioProcessingResult format
      const audioResult: AudioProcessingResult = {
        chunkId: chunkId.toString(),
        text: result.text,
        content_emojis: result.content_emojis,
        confidence: result.confidence,
        timestamp: result.timestamp,
        processingTime: processingTime,
        emojis: result.content_emojis.map(emoji => ({
          emoji: emoji.emoji,
          description: emoji.content
        })),
        metadata: {
          chunkDuration: result.chunk_duration,
          optimizedFor: result.optimized_for,
          cacheHit: result.cache_hit,
          cacheSize: result.cache_size,
          apiProcessingTime: result.processing_time
        }
      }

      return audioResult

    } catch (error) {
      console.error('❌ Erro no processamento 3s:', error)
      
      const audioError: AudioError = {
        code: 'API_3S_PROCESSING_FAILED',
        message: error instanceof Error ? error.message : 'Failed to process audio via 3s API',
        timestamp: new Date()
      }
      throw audioError
    }
  }

  /**
   * Processa um chunk com retry automático
   */
  public async processChunkWithRetry(
    audioUri: string, 
    chunkId: number,
    onRetry?: (attempt: number) => void
  ): Promise<AudioProcessingResult> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          console.log(`🔄 Tentativa ${attempt}/${this.config.maxRetries} para chunk ${chunkId}`)
          onRetry?.(attempt)
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * attempt))
        }

        return await this.processChunk(audioUri, chunkId)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        console.error(`❌ Tentativa ${attempt} falhou:`, lastError.message)
        
        // Don't retry on certain errors
        if (this.shouldNotRetry(lastError)) {
          break
        }
      }
    }

    throw lastError || new Error('Max retries exceeded')
  }

  /**
   * Determina se um erro não deve ser retentado
   */
  private shouldNotRetry(error: Error): boolean {
    const nonRetryableErrors = [
      'Audio recording permission not granted',
      'File too large',
      'Invalid audio format',
      'Network not available'
    ]
    
    return nonRetryableErrors.some(msg => error.message.includes(msg))
  }

  /**
   * Cancela requisições em andamento
   */
  public cancelRequests(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }

  /**
   * Atualiza a configuração do serviço
   */
  public updateConfig(newConfig: Partial<Audio3sConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Obtém a configuração atual
   */
  public getConfig(): Audio3sConfig {
    return { ...this.config }
  }
}

// Instância singleton do serviço
export const audio3sService = new Audio3sService()
