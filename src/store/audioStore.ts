import { create } from 'zustand'
import { 
  VisualRepresentation, 
  TranscriptionChunk, 
  ProcessingStatus, 
  AudioChunk,
  AudioError 
} from '../types/audio.types' 
import { transcriptionService } from '../services/transcriptionService'
import { audio3sService } from '../services/audio3sService'
import { emojiService } from '../services/emojiService'
import { mockTranscriptionChunks, mockVisualRepresentations } from '../utils/mockData'
  
interface AudioState {
  // Recording state
  isRecording: boolean
  isProcessing: boolean
  processingStatus: ProcessingStatus
  currentChunkId: number
  recordingStartTime: Date | null
  recordingDuration: number

  // Data
  transcriptionText: string
  transcriptionChunks: TranscriptionChunk[]
  visualRepresentations: VisualRepresentation[]
  audioChunks: AudioChunk[]
  
  // Error handling
  errors: AudioError[]
  
  // Mock data flag
  useMockData: boolean
  
  // Actions
  updateTranscription: (text: string, chunkId: string, isFinal?: boolean) => void
  addVisualRepresentation: (representation: VisualRepresentation) => void
  addAudioChunk: (chunk: AudioChunk) => void
  updateAudioChunk: (chunkId: number, updates: Partial<AudioChunk>) => void
  addError: (error: AudioError) => void
  clearErrors: () => void
  reset: () => void
  processAudioChunk: (audioUri: string, chunkId: number) => Promise<void>
  processAudioChunk3s: (result: any, chunkId: number) => void
  setRecordingState: (isRecording: boolean) => void
  setProcessingState: (isProcessing: boolean) => void
  setProcessingStatus: (status: ProcessingStatus) => void
  setCurrentChunkId: (chunkId: number) => void
  setRecordingStartTime: (startTime: Date | null) => void
  setRecordingDuration: (duration: number) => void
  loadMockData: () => void
  toggleMockData: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  isRecording: false,
  isProcessing: false,
  processingStatus: 'idle',
  currentChunkId: 1,
  recordingStartTime: null,
  recordingDuration: 0,
  transcriptionText: '',
  transcriptionChunks: [],
  visualRepresentations: [],
  audioChunks: [],
  errors: [],
  useMockData: false,

  // Actions
  processAudioChunk: async (audioUri: string, chunkId: number) => {
    const state = get()
    set({ 
      isProcessing: true,
      processingStatus: 'processing'
    })

    try {
      // Process audio chunk via transcription service
      const result = await transcriptionService.processAudioChunk(audioUri, chunkId)
      
      // Update transcription
      const transcriptionChunk: TranscriptionChunk = {
        id: result.chunkId,
        text: result.text,
        timestamp: new Date(),
        confidence: result.confidence,
        isFinal: true
      }

      set(state => ({
        transcriptionText: state.transcriptionText + (state.transcriptionText ? ' ' : '') + result.text,
        transcriptionChunks: [...state.transcriptionChunks, transcriptionChunk],
        isProcessing: false,
        processingStatus: 'completed'
      }))

      // Add visual representations with context-aware SVG emojis
      result.content_emojis.forEach((item, index) => {
        const contextEmoji = emojiService.getEmojiByContext(item.content)
        const visualRep: VisualRepresentation = {
          id: `${result.chunkId}_${index}`,
          emoji: contextEmoji,
          content: item.content,
          confidence: result.confidence,
          timestamp: new Date()
        }
        get().addVisualRepresentation(visualRep)
      })

      // Update audio chunk
      get().updateAudioChunk(chunkId, {
        status: 'completed',
        transcription: result.text,
        confidence: result.confidence,
        visualRepresentations: result.content_emojis.map((item, index) => {
          const contextEmoji = emojiService.getEmojiByContext(item.content)
          return {
            id: `${result.chunkId}_${index}`,
            emoji: contextEmoji,
            content: item.content,
            confidence: result.confidence,
            timestamp: new Date()
          }
        })
      })

    } catch (error) {
      const audioError: AudioError = {
        code: 'CHUNK_PROCESSING_ERROR',
        message: error instanceof Error ? error.message : 'Failed to process audio chunk',
        timestamp: new Date()
      }
      get().addError(audioError)
      get().updateAudioChunk(chunkId, { status: 'error' })
      set({ 
        isProcessing: false,
        processingStatus: 'error'
      })
    }
  },

  processAudioChunk3s: (result: any, chunkId: number) => {
    try {
      console.log(`🎉 Processando resultado 3s para chunk ${chunkId}:`, result)
      
      // Update transcription
      const transcriptionChunk: TranscriptionChunk = {
        id: result.chunkId,
        text: result.text,
        timestamp: new Date(),
        confidence: result.confidence,
        isFinal: true
      }

      set(state => ({
        transcriptionText: state.transcriptionText + (state.transcriptionText ? ' ' : '') + result.text,
        transcriptionChunks: [...state.transcriptionChunks, transcriptionChunk],
        isProcessing: false,
        processingStatus: 'completed'
      }))

      // Add visual representations with context-aware SVG emojis
      if (result.emojis && result.emojis.length > 0) {
        result.emojis.forEach((item: any, index: number) => {
          const contextEmoji = emojiService.getEmojiByContext(item.description)
          const visualRep: VisualRepresentation = {
            id: `${result.chunkId}_${index}`,
            emoji: contextEmoji,
            content: item.description,
            confidence: result.confidence,
            timestamp: new Date()
          }
          get().addVisualRepresentation(visualRep)
        })
      }

      // Update audio chunk
      get().updateAudioChunk(chunkId, {
        status: 'completed',
        transcription: result.text,
        confidence: result.confidence,
        visualRepresentations: result.emojis?.map((item: any, index: number) => {
          const contextEmoji = emojiService.getEmojiByContext(item.description)
          return {
            id: `${result.chunkId}_${index}`,
            emoji: contextEmoji,
            content: item.description,
            confidence: result.confidence,
            timestamp: new Date()
          }
        }) || []
      })

      console.log(`✅ Chunk ${chunkId} processado com sucesso via API 3s!`)
      
    } catch (error) {
      console.error('❌ Erro ao processar resultado 3s:', error)
      const audioError: AudioError = {
        code: 'CHUNK_3S_PROCESSING_ERROR',
        message: error instanceof Error ? error.message : 'Failed to process 3s API result',
        timestamp: new Date()
      }
      get().addError(audioError)
      get().updateAudioChunk(chunkId, { status: 'error' })
      set({ 
        isProcessing: false,
        processingStatus: 'error'
      })
    }
  },

  setRecordingState: (isRecording: boolean) => {
    set({ isRecording })
  },

  setProcessingState: (isProcessing: boolean) => {
    set({ isProcessing })
  },

  setProcessingStatus: (processingStatus: ProcessingStatus) => {
    set({ processingStatus })
  },

  setCurrentChunkId: (currentChunkId: number) => {
    set({ currentChunkId })
  },

  setRecordingStartTime: (recordingStartTime: Date | null) => {
    set({ recordingStartTime })
  },

  setRecordingDuration: (recordingDuration: number) => {
    set({ recordingDuration })
  },

  updateTranscription: (text: string, chunkId: string, isFinal: boolean = true) => {
    const transcriptionChunk: TranscriptionChunk = {
      id: chunkId,
      text,
      timestamp: new Date(),
      confidence: 1.0, // Default confidence
      isFinal
    }

    set(state => ({
      transcriptionText: state.transcriptionText + (state.transcriptionText ? ' ' : '') + text,
      transcriptionChunks: [...state.transcriptionChunks, transcriptionChunk]
    }))
  },

  addVisualRepresentation: (representation: VisualRepresentation) => {
    set(state => ({
      visualRepresentations: [...state.visualRepresentations, representation]
    }))
  },

  addAudioChunk: (chunk: AudioChunk) => {
    set(state => ({
      audioChunks: [...state.audioChunks, chunk]
    }))
  },

  updateAudioChunk: (chunkId: number, updates: Partial<AudioChunk>) => {
    set(state => ({
      audioChunks: state.audioChunks.map(chunk =>
        chunk.id === chunkId ? { ...chunk, ...updates } : chunk
      )
    }))
  },

  addError: (error: AudioError) => {
    set(state => ({
      errors: [...state.errors, error]
    }))
  },

  clearErrors: () => {
    set({ errors: [] })
  },

  reset: () => {
    set({
      isRecording: false,
      isProcessing: false,
      processingStatus: 'idle',
      currentChunkId: 1,
      recordingStartTime: null,
      recordingDuration: 0,
      transcriptionText: '',
      transcriptionChunks: [],
      visualRepresentations: [],
      audioChunks: [],
      errors: []
    })
  },

  loadMockData: () => {
    set({
      transcriptionChunks: mockTranscriptionChunks,
      visualRepresentations: mockVisualRepresentations,
      transcriptionText: mockTranscriptionChunks.map(chunk => chunk.text).join(' ')
    })
  },

  toggleMockData: () => {
    const state = get()
    if (state.useMockData) {
      // Limpar dados mock
      set({
        useMockData: false,
        transcriptionChunks: [],
        visualRepresentations: [],
        transcriptionText: ''
      })
    } else {
      // Carregar dados mock
      set({
        useMockData: true,
        transcriptionChunks: mockTranscriptionChunks,
        visualRepresentations: mockVisualRepresentations,
        transcriptionText: mockTranscriptionChunks.map(chunk => chunk.text).join(' ')
      })
    }
  },

}))
