import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAudioService } from '../services/audioService'

export const AudioTest: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([])
  
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
    console.log(message)
  }

  const {
    isRecording,
    recordingState,
    audioRecorder,
    recorderState,
    startRecording,
    stopRecording,
    cancelRecording
  } = useAudioService({
    onChunkReady: (audioUri: string, chunkId: number) => {
      addLog(`🎵 Chunk ${chunkId} pronto: ${audioUri}`)
    },
    onError: (error) => {
      addLog(`❌ Erro: ${error.message}`)
      Alert.alert('Erro', error.message)
    },
    onStateChange: (state) => {
      addLog(`📊 Estado: ${JSON.stringify(state)}`)
    }
  })

  const handleStartRecording = async () => {
    try {
      addLog('🎬 Tentando iniciar gravação...')
      await startRecording()
      addLog('✅ Gravação iniciada com sucesso!')
    } catch (error) {
      addLog(`❌ Erro ao iniciar: ${error}`)
    }
  }

  const handleStopRecording = async () => {
    try {
      addLog('⏹️ Parando gravação...')
      const uri = await stopRecording()
      addLog(`✅ Gravação parada. URI: ${uri}`)
    } catch (error) {
      addLog(`❌ Erro ao parar: ${error}`)
    }
  }

  const handleCancelRecording = async () => {
    try {
      addLog('🚫 Cancelando gravação...')
      await cancelRecording()
      addLog('✅ Gravação cancelada')
    } catch (error) {
      addLog(`❌ Erro ao cancelar: ${error}`)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Teste de Áudio</Text>
      
      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.status}>
          Status: {isRecording ? '🔴 GRAVANDO' : '⏸️ PARADO'}
        </Text>
        <Text style={styles.details}>
          Recorder State: {recorderState.isRecording ? 'Recording' : 'Stopped'}
        </Text>
        <Text style={styles.details}>
          URI: {audioRecorder?.uri || 'N/A'}
        </Text>
        <Text style={styles.details}>
          Chunk ID: {recordingState.currentChunkId}
        </Text>
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={handleStartRecording}
          disabled={isRecording}
        >
          <Text style={styles.buttonText}>▶️ Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={handleStopRecording}
          disabled={!isRecording}
        >
          <Text style={styles.buttonText}>⏹️ Parar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancelRecording}
          disabled={!isRecording}
        >
          <Text style={styles.buttonText}>🚫 Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearLogs}
        >
          <Text style={styles.buttonText}>🗑️ Limpar Logs</Text>
        </TouchableOpacity>
      </View>

      {/* Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>📋 Logs ({logs.length}):</Text>
        <View style={styles.logs}>
          {logs.slice(-10).map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))}
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  cancelButton: {
    backgroundColor: '#FF9800',
  },
  clearButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  logs: {
    flex: 1,
  },
  logText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
})
