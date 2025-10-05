import { 
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  setAudioModeAsync,
  RecordingPresets
} from 'expo-audio'
import { useEffect, useRef, useState, useCallback } from 'react'
import { AudioRecordingState, AudioError } from '../types/audio.types'
import { audio3sService } from './audio3sService'

export interface AudioServiceCallbacks {
  onChunkReady?: (audioUri: string, chunkId: number) => void
  onChunkProcessed?: (result: any, chunkId: number) => void
  onError?: (error: AudioError) => void
  onStateChange?: (state: AudioRecordingState) => void
}

export const useAudioService = (callbacks?: AudioServiceCallbacks) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY)
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
  const isCancellingRef = useRef(false)

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
          console.error('❌ Permissão de gravação negada!')
          throw new Error('Audio recording permission not granted')
        }

        // Set audio mode
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        })
        
        console.log('✅ Áudio configurado com sucesso')
        
        // Verificar se o recorder está disponível
        console.log('🔍 Verificando disponibilidade do recorder:', {
          hasRecorder: !!audioRecorder,
          recorderState: recorderState
        })
        
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

  // Removido useEffect problemático que causava cancelamento automático

  // Funções antigas removidas - agora usando loop simples

  const startRecording = useCallback(async (): Promise<void> => {
    try {
      console.log('🎬 Iniciando gravação...')
      
      // Reset cancel flag
      isCancellingRef.current = false
      
      // Request permissions
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        throw new Error('Audio recording permission not granted')
      }

      // Update state
      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        recordingStartTime: new Date(),
        currentChunkId: 1,
        recordingDuration: 0
      }))

      // LOOP SIMPLES - A cada 3 segundos faz uma requisição
      console.log('🔄 Iniciando loop de gravação...')
      const recordingLoop = async () => {
        let chunkId = 1
        let isLooping = true
        
        while (isLooping && !isCancellingRef.current) {
          try {
            console.log(`🎙️ Gravando chunk ${chunkId}...`)
            
            // Preparar e iniciar gravação
            await audioRecorder.prepareToRecordAsync()
            audioRecorder.record()
            
            // Aguardar 3 segundos
            await new Promise(resolve => setTimeout(resolve, 3000))
            
            // Parar gravação
            await audioRecorder.stop()
            const uri = audioRecorder.uri
            
            if (uri) {
              console.log(`🚀 Enviando chunk ${chunkId} para API...`)
              try {
                const result = await audio3sService.processChunk(uri, chunkId)
                console.log(`✅ Chunk ${chunkId} processado:`, result.text)
                callbacksRef.current?.onChunkProcessed?.(result, chunkId)
              } catch (error) {
                console.log(`❌ Erro no chunk ${chunkId}:`, error)
              }
            }
            
            chunkId++
            
            // Verificar se deve continuar
            if (isCancellingRef.current) {
              isLooping = false
            }
            
          } catch (error) {
            console.error(`❌ Erro no loop de gravação:`, error)
            isLooping = false
          }
        }
        
        console.log('🛑 Loop de gravação finalizado')
      }
      
      // Iniciar o loop
      recordingLoop()

    } catch (error) {
      console.error('❌ Erro ao iniciar gravação:', error)
      throw error
    }
  }, [audioRecorder, recordingState.isRecording])

  const stopRecording = useCallback(async (): Promise<string | null> => {
    console.log('🛑 Parando gravação...')
    isCancellingRef.current = true
    
    setRecordingState(prev => ({
      ...prev,
      isRecording: false,
      isProcessing: false
    }))
    
    return null
  }, [])

  const cancelRecording = useCallback(async (): Promise<void> => {
    console.log('🛑 Cancelando gravação...')
    
    // Parar o loop
    isCancellingRef.current = true
    
    // Atualizar estado
    setRecordingState(prev => ({
      ...prev,
      isRecording: false,
      isProcessing: false,
      recordingStartTime: null,
      recordingDuration: 0,
      currentChunkId: 1
    }))
    
    console.log('✅ Gravação cancelada')
  }, [])

  const cleanup = useCallback(async (): Promise<void> => {
    try {
      await cancelRecording()
    } catch (error) {
      console.error('Error during cleanup:', error)
    }
  }, [cancelRecording])

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
