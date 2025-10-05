import { ProcessingStatus } from '../../../types/audio.types'

export interface RecordingControlsProps {
  isRecording: boolean
  isProcessing: boolean
  processingStatus: ProcessingStatus
  recordingDuration: number
  onStartRecording: () => void
  onStopRecording: () => void
  onCancelRecording: () => void
  style?: any
}

export interface RecordingButtonProps {
  isRecording: boolean
  isProcessing: boolean
  onPress: () => void
  style?: any
}

export interface CancelButtonProps {
  onPress: () => void
  style?: any
}
