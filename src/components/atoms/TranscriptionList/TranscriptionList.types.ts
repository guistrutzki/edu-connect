import { TranscriptionChunk } from '../../../types/audio.types'

export interface TranscriptionListProps {
  transcriptionChunks: TranscriptionChunk[]
  isRecording: boolean
  isProcessing: boolean
  style?: any
}
