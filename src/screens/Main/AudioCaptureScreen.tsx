import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typography } from '../../components/atoms/Typography'
import { TranscriptionList } from '../../components/atoms/TranscriptionList'
import { VisualRepresentationList } from '../../components/atoms/VisualRepresentationList'
import { RecordingControls } from '../../components/atoms/RecordingControls'
import { useAudioStore } from '../../store/audioStore'
import { useAudioService } from '../../services/audioService'
import { theme } from '../../utils/theme'

export const AudioCaptureScreen = () => {
  const insets = useSafeAreaInsets()
  const {
    isRecording: storeIsRecording,
    isProcessing,
    processingStatus,
    recordingDuration,
    transcriptionChunks,
    visualRepresentations,
    errors,
    processAudioChunk,
    setRecordingState,
    setProcessingState,
    setProcessingStatus,
    setCurrentChunkId,
    setRecordingStartTime,
    setRecordingDuration,
    clearErrors,
    reset,
    useMockData,
    loadMockData,
    toggleMockData
  } = useAudioStore()

  // Use the audio service hook
  const {
    startRecording,
    stopRecording,
    cancelRecording,
    recordingState,
    isRecording: hookIsRecording
  } = useAudioService({
    onChunkReady: async (audioUri: string, chunkId: number) => {
      // Process the audio chunk through the store
      await processAudioChunk(audioUri, chunkId)
    },
    onError: (error) => {
      // Handle errors through the store
      useAudioStore.getState().addError(error)
    },
    onStateChange: (state) => {
      // Update store state when audio service state changes
      setRecordingState(state.isRecording)
      setCurrentChunkId(state.currentChunkId)
      setRecordingStartTime(state.recordingStartTime)
      setRecordingDuration(state.recordingDuration)
    }
  })

  // Use the hook's recording state as the source of truth
  const isRecording = hookIsRecording

  // Function to get button color based on status
  const getNewRecordingButtonColor = () => {
    if (processingStatus === 'completed') {
      return theme.COLORS['$color-success'] // Green for completed
    } else if (processingStatus === 'error') {
      return theme.COLORS['$autism-peach'] // Red/Orange for error
    } else {
      return theme.COLORS['$autism-lavender'] // Default purple
    }
  }

  // Handle errors
  useEffect(() => {
    if (errors.length > 0) {
      const latestError = errors[errors.length - 1]
      Alert.alert(
        'Erro',
        latestError.message,
        [
          {
            text: 'OK',
            onPress: () => clearErrors()
          }
        ]
      )
    }
  }, [errors, clearErrors])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        cancelRecording()
      }
    }
  }, [isRecording, cancelRecording])

  // Show only transcription and visual representation when recording
  if (isRecording || isProcessing || transcriptionChunks.length > 0 || visualRepresentations.length > 0) {
    return (
      <LinearGradient
        colors={[theme.COLORS['$autism-gradient-2-start'], theme.COLORS['$autism-gradient-2-end']]}
        style={styles.container}
      >
        <View style={[styles.recordingContent, { paddingTop: insets.top + 20 }]}>
          {/* Recording Status Header */}
          <View style={styles.recordingHeader}>
            <Typography 
              size="$font-title-md" 
              fontWeight="$bold" 
              color="$primary"
              style={styles.recordingTitle}
            >
              {isRecording ? 'Gravando...' : isProcessing ? 'Processando...' : 'Gravação Finalizada'}
            </Typography>
            {isRecording && (
              <Typography 
                size="$font-description-sm" 
                fontWeight="$medium" 
                color="$autism-peach"
                style={styles.recordingDuration}
              >
                {Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:
                {Math.floor(recordingDuration % 60).toString().padStart(2, '0')}
              </Typography>
            )}
          </View>

          {/* Dual Lists Layout - Full Screen */}
          <View style={styles.fullScreenListsContainer}>
            {/* Vertical List - Real-time Transcription */}
            <TranscriptionList
              transcriptionChunks={transcriptionChunks}
              isRecording={isRecording}
              isProcessing={isProcessing}
              style={styles.fullScreenTranscriptionList}
            />

            {/* Horizontal List - Visual Representations */}
            <VisualRepresentationList
              visualRepresentations={visualRepresentations}
              isProcessing={isProcessing}
              style={styles.fullScreenVisualRepresentationList}
            />
          </View>

          {/* Minimal Controls */}
          <View style={styles.minimalControls}>
            {isRecording ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelRecording}
              >
                <Typography 
                  size="$font-description-md" 
                  fontWeight="$bold" 
                  color="$color-grayscale-1"
                >
                  Cancelar Gravação
                </Typography>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.newRecordingButton,
                  { 
                    backgroundColor: getNewRecordingButtonColor(),
                    shadowColor: getNewRecordingButtonColor()
                  }
                ]}
                onPress={() => {
                  // Reset the store to go back to initial state
                  reset()
                }}
              >
                <Typography 
                  size="$font-description-md" 
                  fontWeight="$bold" 
                  color="$color-grayscale-1"
                >
                  Nova Gravação
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    )
  }

  // Show initial screen with controls when not recording
  return (
    <LinearGradient
      colors={[theme.COLORS['$autism-gradient-2-start'], theme.COLORS['$autism-gradient-2-end']]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <Typography 
              size="$font-title-md" 
              fontWeight="$bold" 
              color="$primary"
              style={styles.title}
            >
              Gravação Inteligente
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-600"
              style={styles.subtitle}
            >
              Transforme sua voz em texto e representações visuais em tempo real
            </Typography>
          </View>

          {/* Recording Controls */}
          <RecordingControls
            isRecording={isRecording}
            isProcessing={isProcessing}
            processingStatus={processingStatus}
            recordingDuration={recordingDuration}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onCancelRecording={cancelRecording}
          />

          {/* Mock Data Controls */}
          <View style={styles.mockControls}>
            <TouchableOpacity
              style={[
                styles.mockButton,
                useMockData && styles.mockButtonActive
              ]}
              onPress={toggleMockData}
            >
              <Typography 
                size="$font-description-sm" 
                fontWeight="$bold" 
                color={useMockData ? "$color-grayscale-1" : "$autism-blue"}
                style={styles.mockButtonText}
              >
                {useMockData ? '📊 Dados Mock Ativos' : '🎭 Carregar Dados Mock'}
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Typography 
              size="$font-title-sm" 
              fontWeight="$bold" 
              color="$primary"
              style={styles.instructionTitle}
            >
              Como usar:
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-700"
              style={styles.instruction}
            >
              1. Toque em "Iniciar Gravação" para começar
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-700"
              style={styles.instruction}
            >
              2. Fale sobre o conteúdo educacional
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-700"
              style={styles.instruction}
            >
              3. O áudio é processado automaticamente a cada 3 segundos
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-700"
              style={styles.instruction}
            >
              4. Toque em "Parar Gravação" para finalizar
            </Typography>
            <Typography 
              size="$font-description-sm" 
              fontWeight="$regular" 
              color="$gray-700"
              style={styles.instruction}
            >
              5. Use "Cancelar" para interromper a gravação a qualquer momento
            </Typography>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  listsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  transcriptionList: {
    flex: 1,
    minHeight: 300,
    marginBottom: 16,
  },
  visualRepresentationList: {
    minHeight: 160,
  },
  instructions: {
    backgroundColor: theme.COLORS['$autism-gray'],
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    marginBottom: 8,
    lineHeight: 20,
  },
  // New styles for recording screen
  recordingContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 20,
  },
  recordingHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS['$autism-lavender'],
    paddingHorizontal: 20,
  },
  recordingTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  recordingDuration: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  fullScreenListsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  fullScreenTranscriptionList: {
    height: 250,
    marginBottom: 16,
  },
  fullScreenVisualRepresentationList: {
    height: 260,
  },
  minimalControls: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.COLORS['$autism-peach'],
    borderWidth: 2,
    borderColor: theme.COLORS['$autism-peach'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 160,
    alignItems: 'center',
    shadowColor: theme.COLORS['$autism-peach'],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  newRecordingButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 160,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mockControls: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mockButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.COLORS['$autism-blue'],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  mockButtonActive: {
    backgroundColor: theme.COLORS['$autism-blue'],
    borderColor: theme.COLORS['$autism-blue'],
  },
  mockButtonText: {
    textAlign: 'center',
  },
})
