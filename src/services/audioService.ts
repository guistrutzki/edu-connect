import { 
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync
} from 'expo-audio'
import * as FileSystem from 'expo-file-system'
import { useEffect, useRef, useState, useCallback } from 'react'
import { AudioRecordingState, AudioError } from '../types/audio.types'

export interface AudioServiceCallbacks {
  onChunkReady?: (audioUri: string, chunkId: number) => void
  onError?: (error: AudioError) => void
  onStateChange?: (state: AudioRecordingState) => void
}

export const useAudioService = (callbacks?: AudioServiceCallbacks) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
  const recorderState = useAudioRecorderState(audioRecorder)
  
  const [recordingState, setRecordingState] = useState<AudioRecordingState>({
    isRecording: false,
    isProcessing: false,
    currentChunkId: 1,
    recordingStartTime: null,
    recordingDuration: 0
  })
  
  const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const callbacksRef = useRef(callbacks)

  // Update callbacks ref when callbacks change
  useEffect(() => {
    callbacksRef.current = callbacks
  }, [callbacks])

  // Setup audio mode on mount
  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        console.log('🎙️ Configurando áudio...')
        
        // Request permissions for audio recording
        const status = await AudioModule.requestRecordingPermissionsAsync()
        console.log('📋 Status das permissões:', status)
        
        if (!status.granted) {
          throw new Error('Audio recording permission not granted')
        }

        // Set audio mode
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        })
        
        console.log('✅ Áudio configurado com sucesso')
      } catch (error) {
        console.error('❌ Falha ao configurar áudio:', error)
        const audioError: AudioError = {
          code: 'SETUP_FAILED',
          message: error instanceof Error ? error.message : 'Failed to setup audio mode',
          timestamp: new Date()
        }
        callbacksRef.current?.onError?.(audioError)
      }
    }

    setupAudioMode()
  }, [])

  // Update recording state when recorder state changes
  useEffect(() => {
    setRecordingState(prev => ({
      ...prev,
      isRecording: recorderState.isRecording
    }))
  }, [recorderState.isRecording])

  const startChunkProcessing = useCallback(() => {
    console.log('🔄 Iniciando processamento de chunks...')
    chunkIntervalRef.current = setInterval(async () => {
      if (audioRecorder && recordingState.isRecording) {
        try {
          console.log('📦 Processando chunk...')
          // Create a copy of current recording for processing
          const currentUri = audioRecorder.uri
          console.log('🎵 URI atual:', currentUri)
          
          if (currentUri) {
            // Create a temporary file for this chunk
            const chunkUri = `file:///tmp/chunk_${recordingState.currentChunkId}_${Date.now()}.m4a`
            console.log('📁 Chunk URI:', chunkUri)
            
            // Copy current recording to chunk file
            await FileSystem.copyAsync({
              from: currentUri,
              to: chunkUri
            })
            console.log('✅ Chunk copiado com sucesso')

            // Notify that chunk is ready
            callbacksRef.current?.onChunkReady?.(chunkUri, recordingState.currentChunkId)
            console.log(`🎉 Chunk ${recordingState.currentChunkId} pronto!`)

            // Update chunk ID for next iteration
            setRecordingState(prev => ({
              ...prev,
              currentChunkId: prev.currentChunkId + 1
            }))
          } else {
            console.log('⚠️ URI ainda não disponível')
          }
        } catch (error) {
          console.error('❌ Erro no processamento de chunk:', error)
          const audioError: AudioError = {
            code: 'CHUNK_PROCESSING_FAILED',
            message: error instanceof Error ? error.message : 'Failed to process audio chunk',
            timestamp: new Date()
          }
          callbacksRef.current?.onError?.(audioError)
        }
      }
    }, 3000) // 3 seconds interval
  }, [audioRecorder, recordingState.isRecording, recordingState.currentChunkId])

  const stopChunkProcessing = useCallback(() => {
    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current)
      chunkIntervalRef.current = null
    }
  }, [])

  const startRecording = useCallback(async (): Promise<void> => {
    try {
      console.log('🎬 Iniciando gravação...')
      
      // Request permissions
      const status = await AudioModule.requestRecordingPermissionsAsync()
      console.log('📋 Verificando permissões:', status)
      
      if (!status.granted) {
        throw new Error('Audio recording permission not granted')
      }

      // Stop any existing recording
      if (recorderState.isRecording) {
        console.log('⏹️ Parando gravação existente...')
        await stopRecording()
      }

      console.log('🔧 Preparando recorder...')
      // Prepare to record
      await audioRecorder.prepareToRecordAsync()
      console.log('✅ Recorder preparado')
      
      console.log('▶️ Iniciando gravação...')
      // Start recording
      audioRecorder.record()
      console.log('🎙️ Gravação iniciada!')

      // Update state
      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        recordingStartTime: new Date(),
        currentChunkId: 1,
        recordingDuration: 0
      }))

      // Start chunk processing every 3 seconds
      startChunkProcessing()
      console.log('⏰ Processamento de chunks iniciado')

    } catch (error) {
      console.error('❌ Erro ao iniciar gravação:', error)
      const audioError: AudioError = {
        code: 'RECORDING_START_FAILED',
        message: error instanceof Error ? error.message : 'Failed to start recording',
        timestamp: new Date()
      }
      callbacksRef.current?.onError?.(audioError)
      throw error
    }
  }, [audioRecorder, recorderState.isRecording, startChunkProcessing])

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      if (!recorderState.isRecording) {
        return null
      }

      // Stop chunk processing
      stopChunkProcessing()

      // Stop recording
      await audioRecorder.stop()
      const uri = audioRecorder.uri
      
      // Update state
      setRecordingState(prev => ({
        ...prev,
        isRecording: false,
        isProcessing: false
      }))

      return uri
    } catch (error) {
      const audioError: AudioError = {
        code: 'RECORDING_STOP_FAILED',
        message: error instanceof Error ? error.message : 'Failed to stop recording',
        timestamp: new Date()
      }
      callbacksRef.current?.onError?.(audioError)
      throw error
    }
  }, [audioRecorder, recorderState.isRecording, stopChunkProcessing])

  const cancelRecording = useCallback(async (): Promise<void> => {
    try {
      if (!recorderState.isRecording) {
        return
      }

      // Stop chunk processing
      stopChunkProcessing()

      // Stop and discard recording
      await audioRecorder.stop()
      
      // Update state
      setRecordingState(prev => ({
        ...prev,
        isRecording: false,
        isProcessing: false,
        recordingStartTime: null,
        recordingDuration: 0
      }))
    } catch (error) {
      const audioError: AudioError = {
        code: 'RECORDING_CANCEL_FAILED',
        message: error instanceof Error ? error.message : 'Failed to cancel recording',
        timestamp: new Date()
      }
      callbacksRef.current?.onError?.(audioError)
      throw error
    }
  }, [audioRecorder, recorderState.isRecording, stopChunkProcessing])

  const cleanup = useCallback(async (): Promise<void> => {
    try {
      if (recorderState.isRecording) {
        await cancelRecording()
      }
      stopChunkProcessing()
    } catch (error) {
      console.error('Error during cleanup:', error)
    }
  }, [recorderState.isRecording, cancelRecording, stopChunkProcessing])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  // Notify state changes
  useEffect(() => {
    callbacksRef.current?.onStateChange?.(recordingState)
  }, [recordingState])

  return {
    // Recording methods
    startRecording,
    stopRecording,
    cancelRecording,
    cleanup,
    
    // State
    recordingState,
    isRecording: recordingState.isRecording,
    
    // Recorder instance (for advanced usage)
    audioRecorder,
    recorderState
  }
}
