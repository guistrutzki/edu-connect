import React, { useRef, useEffect } from 'react'
import { View, TouchableOpacity, Animated } from 'react-native'
import { Typography } from '../Typography'
import { RecordingControlsProps } from './RecordingControls.types'
import { styles } from './RecordingControls.styles'

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isProcessing,
  processingStatus,
  recordingDuration,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
  style
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current
  const rotationAnim = useRef(new Animated.Value(0)).current

  // Pulse animation for recording state
  useEffect(() => {
    if (isRecording) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
      pulseAnimation.start()
      return () => pulseAnimation.stop()
    } else {
      pulseAnim.setValue(1)
    }
  }, [isRecording])

  // Rotation animation for processing state
  useEffect(() => {
    if (isProcessing) {
      const rotationAnimation = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      )
      rotationAnimation.start()
      return () => rotationAnimation.stop()
    } else {
      rotationAnim.setValue(0)
    }
  }, [isProcessing])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusText = () => {
    switch (processingStatus) {
      case 'recording':
        return 'Gravando...'
      case 'processing':
        return 'Processando...'
      case 'completed':
        return 'Processamento concluído'
      case 'error':
        return 'Erro no processamento'
      default:
        return 'Pronto para gravar'
    }
  }

  const getButtonText = () => {
    if (isProcessing) return 'Processando...'
    if (isRecording) return 'Parar Gravação'
    return 'Iniciar Gravação'
  }

  const getButtonStyle = () => {
    if (isProcessing) return [styles.recordingButton, styles.processingButton]
    if (isRecording) return [styles.recordingButton, styles.stopButton]
    return styles.recordingButton
  }

  const getMicrophoneStyle = () => {
    if (isProcessing) return [styles.microphoneIcon, styles.processingIcon]
    if (isRecording) return [styles.microphoneIcon, styles.recordingIcon]
    return styles.microphoneIcon
  }

  const handleButtonPress = () => {
    if (isProcessing) return // Disable button during processing
    
    if (isRecording) {
      onStopRecording()
    } else {
      onStartRecording()
    }
  }

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={[styles.container, style]}>
      {/* Microphone Icon */}
      <View style={styles.microphoneIcon}>
        <Animated.View
          style={[
            styles.pulseAnimation,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
        <Animated.View
          style={[
            getMicrophoneStyle(),
            isProcessing && {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <Typography style={styles.microphoneEmoji}>
            {isProcessing ? '⏳' : '🎤'}
          </Typography>
        </Animated.View>
      </View>

      {/* Status and Duration */}
      <View style={styles.statusContainer}>
        <Typography 
          size="$font-description-md" 
          fontWeight="$medium" 
          color={isRecording ? "$color-success" : isProcessing ? "$autism-blue" : "$gray-600"}
          style={styles.statusText}
        >
          {getStatusText()}
        </Typography>
        {recordingDuration > 0 && (
          <Typography 
            size="$font-description-sm" 
            fontWeight="$regular" 
            color="$gray-600"
            style={styles.durationText}
          >
            Duração: {formatDuration(recordingDuration)}
          </Typography>
        )}
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[
            getButtonStyle(),
            isProcessing && styles.disabledButton
          ]}
          onPress={handleButtonPress}
          disabled={isProcessing}
        >
          <Typography 
            size="$font-title-sm" 
            fontWeight="$bold" 
            color="$color-grayscale-1"
            style={styles.buttonText}
          >
            {getButtonText()}
          </Typography>
        </TouchableOpacity>

        {isRecording && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancelRecording}
          >
            <Typography 
              size="$font-description-md" 
              fontWeight="$bold" 
              color="$autism-peach"
              style={styles.cancelButtonText}
            >
              Cancelar
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
