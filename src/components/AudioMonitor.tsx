import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAudioService } from '../services/audioService'
import { useAudioStore } from '../store/audioStore'

export const AudioMonitor: React.FC = () => {
  const [currentUri, setCurrentUri] = useState<string | null>(null)
  const [chunks, setChunks] = useState<Array<{id: number, uri: string, timestamp: Date}>>([])
  
  const { 
    isRecording, 
    recordingState, 
    audioRecorder, 
    recorderState,
    startRecording,
    stopRecording 
  } = useAudioService({
    onChunkReady: (audioUri: string, chunkId: number) => {
      console.log(`🎵 Chunk ${chunkId} pronto:`, audioUri)
      setChunks(prev => [...prev, {
        id: chunkId,
        uri: audioUri,
        timestamp: new Date()
      }])
    },
    onStateChange: (state) => {
      console.log('📊 Estado da gravação:', state)
    },
    onError: (error) => {
      console.error('❌ Erro na gravação:', error)
    }
  })

  const { transcriptionChunks, visualRepresentations } = useAudioStore()

  // Monitorar URI atual durante a gravação
  useEffect(() => {
    if (isRecording && audioRecorder) {
      const interval = setInterval(() => {
        if (audioRecorder.uri) {
          setCurrentUri(audioRecorder.uri)
          console.log('🎙️ URI atual:', audioRecorder.uri)
        }
      }, 1000) // Verificar a cada segundo

      return () => clearInterval(interval)
    }
  }, [isRecording, audioRecorder])

  const handleStartRecording = async () => {
    try {
      setChunks([])
      setCurrentUri(null)
      await startRecording()
      console.log('▶️ Gravação iniciada')
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error)
    }
  }

  const handleStopRecording = async () => {
    try {
      const finalUri = await stopRecording()
      console.log('⏹️ Gravação finalizada:', finalUri)
      setCurrentUri(finalUri)
    } catch (error) {
      console.error('Erro ao parar gravação:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Monitor de Áudio</Text>
      
      {/* Status da Gravação */}
      <View style={styles.statusContainer}>
        <Text style={styles.status}>
          Status: {isRecording ? '🔴 GRAVANDO' : '⏸️ PARADO'}
        </Text>
        <Text style={styles.details}>
          Duração: {Math.floor(recordingState.recordingDuration / 60).toString().padStart(2, '0')}:
          {Math.floor(recordingState.recordingDuration % 60).toString().padStart(2, '0')}
        </Text>
        <Text style={styles.details}>
          Chunk atual: {recordingState.currentChunkId}
        </Text>
      </View>

      {/* URI Atual */}
      {currentUri && (
        <View style={styles.uriContainer}>
          <Text style={styles.uriLabel}>URI Atual:</Text>
          <Text style={styles.uri} numberOfLines={2}>
            {currentUri}
          </Text>
        </View>
      )}

      {/* Chunks Processados */}
      <View style={styles.chunksContainer}>
        <Text style={styles.chunksTitle}>
          Chunks Processados ({chunks.length}):
        </Text>
        {chunks.map((chunk) => (
          <View key={chunk.id} style={styles.chunkItem}>
            <Text style={styles.chunkText}>
              Chunk {chunk.id}: {chunk.uri.split('/').pop()}
            </Text>
            <Text style={styles.chunkTime}>
              {chunk.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>

      {/* Transcrições */}
      <View style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionTitle}>
          Transcrições ({transcriptionChunks.length}):
        </Text>
        {transcriptionChunks.map((chunk) => (
          <Text key={chunk.id} style={styles.transcriptionText}>
            {chunk.text}
          </Text>
        ))}
      </View>

      {/* Representações Visuais */}
      <View style={styles.visualContainer}>
        <Text style={styles.visualTitle}>
          Emojis ({visualRepresentations.length}):
        </Text>
        <View style={styles.emojiContainer}>
          {visualRepresentations.map((rep) => (
            <View key={rep.id} style={styles.emoji}>
              {React.createElement(rep.emoji, {
                width: 24,
                height: 24
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isRecording ? styles.stopButton : styles.startButton]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? '⏹️ Parar' : '▶️ Iniciar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  uriContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  uriLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  uri: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  chunksContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  chunksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chunkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chunkText: {
    fontSize: 12,
    flex: 1,
  },
  chunkTime: {
    fontSize: 12,
    color: '#666',
  },
  transcriptionContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  transcriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transcriptionText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  visualContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
    marginBottom: 4,
  },
  controls: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
