import { AudioProcessingResult, AudioError } from '../types/audio.types'

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retryAttempts: number
  retryDelay: number
}

export class ApiService {
  private config: ApiConfig
  private abortController: AbortController | null = null

  constructor(config?: Partial<ApiConfig>) {
    this.config = {
      baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: 30000, // 30 seconds
      retryAttempts: 3,
      retryDelay: 1000, // 1 second
      ...config
    }
  }

  public async processAudio(
    audioUri: string, 
    chunkId: number,
    onProgress?: (progress: number) => void
  ): Promise<AudioProcessingResult> {
    try {
      // Cancel any existing request
      if (this.abortController) {
        this.abortController.abort()
      }

      this.abortController = new AbortController()

      // Create form data
      const formData = new FormData()
      formData.append('audio', {
        uri: audioUri,
        type: 'audio/m4a',
        name: `chunk_${chunkId}.m4a`,
      } as any)
      formData.append('chunkId', chunkId.toString())
      formData.append('timestamp', new Date().toISOString())

      // Make API request with retry logic
      return await this.retryRequest(async () => {
        const response = await fetch(`${this.config.baseUrl}/api/audio`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: this.abortController?.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        // Validate response format
        if (!this.isValidAudioProcessingResult(result)) {
          throw new Error('Invalid response format from API')
        }

        return {
          ...result,
          chunkId: chunkId.toString()
        }
      })

    } catch (error) {
      const audioError: AudioError = {
        code: 'API_PROCESSING_FAILED',
        message: error instanceof Error ? error.message : 'Failed to process audio via API',
        timestamp: new Date()
      }
      throw audioError
    }
  }

  public async getTranscriptionResult(chunkId: string): Promise<AudioProcessingResult> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/transcription/${chunkId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: this.abortController?.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!this.isValidAudioProcessingResult(result)) {
        throw new Error('Invalid response format from API')
      }

      return {
        ...result,
        chunkId
      }

    } catch (error) {
      const audioError: AudioError = {
        code: 'API_TRANSCRIPTION_FETCH_FAILED',
        message: error instanceof Error ? error.message : 'Failed to fetch transcription result',
        timestamp: new Date()
      }
      throw audioError
    }
  }

  public async pollTranscriptionResult(
    chunkId: string,
    maxAttempts: number = 10,
    interval: number = 2000
  ): Promise<AudioProcessingResult> {
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        const result = await this.getTranscriptionResult(chunkId)
        return result
      } catch (error) {
        attempts++
        if (attempts >= maxAttempts) {
          throw error
        }
        
        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, interval))
      }
    }

    throw new Error('Max polling attempts reached')
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await requestFn()
    } catch (error) {
      if (attempt < this.config.retryAttempts) {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * attempt))
        return this.retryRequest(requestFn, attempt + 1)
      }
      throw error
    }
  }

  private isValidAudioProcessingResult(result: any): result is AudioProcessingResult {
    return (
      result &&
      typeof result.text === 'string' &&
      Array.isArray(result.content_emojis) &&
      typeof result.confidence === 'number' &&
      result.content_emojis.every((item: any) => 
        typeof item.emoji === 'string' && typeof item.content === 'string'
      )
    )
  }

  public cancelRequest(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }

  public updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Singleton instance
export const apiService = new ApiService()
