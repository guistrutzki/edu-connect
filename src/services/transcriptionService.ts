import { apiService } from './apiService'
import { AudioProcessingResult, AudioError } from '../types/audio.types'

export class TranscriptionService {
  private processingQueue: Map<string, Promise<AudioProcessingResult>> = new Map()
  private retryAttempts: number = 3
  private retryDelay: number = 1000

  public async processAudioChunk(
    audioUri: string, 
    chunkId: number,
    onProgress?: (progress: number) => void
  ): Promise<AudioProcessingResult> {
    const chunkKey = `chunk_${chunkId}`
    
    // Check if already processing this chunk
    if (this.processingQueue.has(chunkKey)) {
      return this.processingQueue.get(chunkKey)!
    }

    // Create processing promise
    const processingPromise = this.processWithRetry(audioUri, chunkId, onProgress)
    this.processingQueue.set(chunkKey, processingPromise)

    try {
      const result = await processingPromise
      return result
    } finally {
      // Clean up queue
      this.processingQueue.delete(chunkKey)
    }
  }

  private async processWithRetry(
    audioUri: string,
    chunkId: number,
    onProgress?: (progress: number) => void
  ): Promise<AudioProcessingResult> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        onProgress?.(attempt / this.retryAttempts * 100)
        
        const result = await apiService.processAudio(audioUri, chunkId)
        
        // Validate result
        if (!this.isValidResult(result)) {
          throw new Error('Invalid processing result received')
        }

        return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        if (attempt < this.retryAttempts) {
          // Wait before retry
          await this.delay(this.retryDelay * attempt)
        }
      }
    }

    // All retries failed
    const audioError: AudioError = {
      code: 'TRANSCRIPTION_PROCESSING_FAILED',
      message: lastError?.message || 'Failed to process audio transcription',
      timestamp: new Date()
    }
    throw audioError
  }

  private isValidResult(result: any): result is AudioProcessingResult {
    return (
      result &&
      typeof result.text === 'string' &&
      Array.isArray(result.content_emojis) &&
      typeof result.confidence === 'number' &&
      result.text.length > 0 &&
      result.content_emojis.length > 0
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public cancelAllProcessing(): void {
    this.processingQueue.clear()
    apiService.cancelRequest()
  }

  public getProcessingQueueSize(): number {
    return this.processingQueue.size
  }

  public isProcessing(chunkId: number): boolean {
    return this.processingQueue.has(`chunk_${chunkId}`)
  }
}

// Singleton instance
export const transcriptionService = new TranscriptionService()
