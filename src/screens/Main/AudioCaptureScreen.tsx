import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Typography } from '../../components/atoms/Typography'
import { theme } from '../../utils/theme'

interface AudioChunk {
  id: number
  timestamp: Date
  status: 'processing' | 'completed' | 'error'
  transcription?: string
  emoji?: string
  summary?: string
}

export const AudioCaptureScreen = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [chunks, setChunks] = useState<AudioChunk[]>([])
  const [currentChunkId, setCurrentChunkId] = useState(1)
  const [processingStatus, setProcessingStatus] = useState<string>('Pronto para gravar')
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const recordingStartTime = useRef<Date | null>(null)

  const handleStartRecording = () => {
    setIsRecording(true)
    setProcessingStatus('Gravando...')
    recordingStartTime.current = new Date()
    
    // Start 3-second interval processing
    intervalRef.current = setInterval(() => {
      processAudioChunk()
    }, 3000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setProcessingStatus('Parando gravação...')
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Process final chunk if recording was active
    if (recordingStartTime.current) {
      processAudioChunk()
    }
    
    setTimeout(() => {
      setProcessingStatus('Gravação finalizada')
    }, 1000)
  }

  const processAudioChunk = () => {
    const newChunk: AudioChunk = {
      id: currentChunkId,
      timestamp: new Date(),
      status: 'processing'
    }
    
    setChunks(prev => [...prev, newChunk])
    setCurrentChunkId(prev => prev + 1)
    setProcessingStatus(`Processando chunk ${currentChunkId}...`)
    
    // Simulate backend processing (3 seconds)
    setTimeout(() => {
      setChunks(prev => prev.map(chunk => 
        chunk.id === newChunk.id 
          ? {
              ...chunk,
              status: 'completed',
              transcription: 'Exemplo de transcrição do áudio capturado',
              emoji: '📚',
              summary: 'Conteúdo educacional sobre matemática básica'
            }
          : chunk
      ))
      setProcessingStatus('Chunk processado com sucesso')
    }, 3000)
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <LinearGradient
      colors={[theme.COLORS['$autism-gradient-2-start'], theme.COLORS['$autism-gradient-2-end']]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Typography 
            size="$font-brand" 
            fontWeight="$bold" 
            color="$primary"
            style={styles.title}
          >
            Captura de Áudio
          </Typography>
          <Typography 
            size="$font-description-lg" 
            fontWeight="$medium" 
            color="$gray-600"
            style={styles.subtitle}
          >
            Processamento em tempo real a cada 3 segundos
          </Typography>
        </View>

        {/* Recording Area */}
        <View style={styles.recordingArea}>
          <View style={[styles.microphoneIcon, isRecording && styles.recordingIcon]}>
            <Text style={styles.microphoneEmoji}>🎤</Text>
          </View>
          
          <Typography 
            size="$font-description-md" 
            fontWeight="$medium" 
            color={isRecording ? "$color-success" : "$gray-600"}
            style={styles.statusText}
          >
            {processingStatus}
          </Typography>
        </View>

        {/* Control Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.stopButton]}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            <Typography 
              size="$font-title-sm" 
              fontWeight="$bold" 
              color="$color-grayscale-1"
              style={styles.recordButtonText}
            >
              {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Processing Status */}
        {chunks.length > 0 && (
          <View style={styles.statusSection}>
            <Typography 
              size="$font-title-sm" 
              fontWeight="$bold" 
              color="$primary"
              style={styles.sectionTitle}
            >
              Status do Processamento
            </Typography>
            <View style={styles.statusCard}>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-700"
              >
                Chunks processados: {chunks.filter(c => c.status === 'completed').length}/{chunks.length}
              </Typography>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-700"
              >
                Status atual: {processingStatus}
              </Typography>
            </View>
          </View>
        )}

        {/* Audio Chunks History */}
        {chunks.length > 0 && (
          <View style={styles.chunksSection}>
            <Typography 
              size="$font-title-sm" 
              fontWeight="$bold" 
              color="$primary"
              style={styles.sectionTitle}
            >
              Histórico de Processamento
            </Typography>
            {chunks.map((chunk) => (
              <View key={chunk.id} style={styles.chunkCard}>
                <View style={styles.chunkHeader}>
                  <Typography 
                    size="$font-description-sm" 
                    fontWeight="$bold" 
                    color="$primary"
                  >
                    Chunk #{chunk.id}
                  </Typography>
                  <View style={[styles.statusIndicator, 
                    chunk.status === 'completed' && styles.completedIndicator,
                    chunk.status === 'processing' && styles.processingIndicator,
                    chunk.status === 'error' && styles.errorIndicator
                  ]}>
                    <Typography 
                      size="$font-description-xs" 
                      fontWeight="$medium" 
                      color="$color-grayscale-1"
                    >
                      {chunk.status === 'completed' ? '✓' : 
                       chunk.status === 'processing' ? '⏳' : '✗'}
                    </Typography>
                  </View>
                </View>
                
                {chunk.status === 'completed' && (
                  <View style={styles.chunkContent}>
                    <View style={styles.chunkRow}>
                      <Typography 
                        size="$font-description-xs" 
                        fontWeight="$medium" 
                        color="$gray-600"
                      >
                        Emoji: {chunk.emoji}
                      </Typography>
                    </View>
                    <Typography 
                      size="$font-description-xs" 
                      fontWeight="$regular" 
                      color="$gray-700"
                      style={styles.transcription}
                    >
                      {chunk.transcription}
                    </Typography>
                    <Typography 
                      size="$font-description-xs" 
                      fontWeight="$regular" 
                      color="$gray-600"
                      style={styles.summary}
                    >
                      {chunk.summary}
                    </Typography>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

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
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
  recordingArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  microphoneIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.COLORS['$autism-gray'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recordingIcon: {
    backgroundColor: theme.COLORS['$autism-mint'],
  },
  microphoneEmoji: {
    fontSize: 40,
  },
  statusText: {
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  recordButton: {
    backgroundColor: theme.COLORS['$autism-lavender'],
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    minWidth: 200,
    shadowColor: theme.COLORS['$autism-lavender'],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  stopButton: {
    backgroundColor: theme.COLORS['$autism-peach'],
    shadowColor: theme.COLORS['$autism-peach'],
  },
  recordButtonText: {
    textAlign: 'center',
  },
  statusSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: theme.COLORS['$autism-gray'],
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chunksSection: {
    marginBottom: 30,
  },
  chunkCard: {
    backgroundColor: theme.COLORS['$autism-gray'],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chunkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIndicator: {
    backgroundColor: theme.COLORS['$autism-mint'],
  },
  processingIndicator: {
    backgroundColor: theme.COLORS['$autism-blue'],
  },
  errorIndicator: {
    backgroundColor: theme.COLORS['$autism-peach'],
  },
  chunkContent: {
    marginTop: 8,
  },
  chunkRow: {
    marginBottom: 8,
  },
  transcription: {
    marginBottom: 8,
    lineHeight: 18,
  },
  summary: {
    lineHeight: 16,
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
})
