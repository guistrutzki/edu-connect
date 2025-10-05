export interface VisualRepresentation {
  id: string
  emoji: React.ComponentType<any> // SVG component
  content: string
  confidence: number
  timestamp: Date
}

export interface TranscriptionChunk {
  id: string
  text: string
  timestamp: Date
  confidence: number
  isFinal: boolean
}

export interface AudioProcessingResult {
  text: string
  content_emojis: Array<{
    emoji: string
    content: string
  }>
  confidence: number
  chunkId: string
}

export interface AudioRecordingState {
  isRecording: boolean
  isProcessing: boolean
  currentChunkId: number
  recordingStartTime: Date | null
  recordingDuration: number
}

export interface AudioError {
  code: string
  message: string
  timestamp: Date
}

export type ProcessingStatus = 'idle' | 'recording' | 'processing' | 'completed' | 'error'

export interface AudioChunk {
  id: number
  timestamp: Date
  status: ProcessingStatus
  transcription?: string
  emoji?: string
  summary?: string
  confidence?: number
  visualRepresentations?: VisualRepresentation[]
}
