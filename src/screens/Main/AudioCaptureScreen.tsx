import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

export const AudioCaptureScreen = () => {
  const [isRecording, setIsRecording] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
    Alert.alert('Gravação Iniciada', 'Começando a gravar áudio...')
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    Alert.alert('Gravação Parada', 'Áudio enviado para processamento!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Captura de Áudio</Text>
        <Text style={styles.subtitle}>Grave áudio para converter em emojis</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.recordingArea}>
          <View style={[styles.microphoneIcon, isRecording && styles.recordingIcon]}>
            <Text style={styles.microphoneEmoji}>🎤</Text>
          </View>
          
          <Text style={styles.statusText}>
            {isRecording ? 'Gravando...' : 'Toque para gravar'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.stopButton]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Parar' : 'Gravar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Como usar:</Text>
        <Text style={styles.instruction}>1. Toque em "Gravar" para começar</Text>
        <Text style={styles.instruction}>2. Fale sobre o conteúdo educacional</Text>
        <Text style={styles.instruction}>3. Toque em "Parar" para processar</Text>
        <Text style={styles.instruction}>4. Veja os emojis na aba "Emojis"</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  microphoneIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordingIcon: {
    backgroundColor: '#FF3B30',
  },
  microphoneEmoji: {
    fontSize: 40,
  },
  statusText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  recordButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 150,
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  instructions: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
})
