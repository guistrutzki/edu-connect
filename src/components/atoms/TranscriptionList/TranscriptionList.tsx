import React, { useRef, useEffect } from 'react'
import { View, ScrollView, Animated } from 'react-native'
import { Typography } from '../Typography'
import { TranscriptionListProps } from './TranscriptionList.types'
import { TranscriptionChunk } from '../../../types/audio.types'
import { styles } from './TranscriptionList.styles'

const TranscriptionTextBlock: React.FC<{ 
  text: string, 
  isLatest: boolean, 
  isRecording: boolean 
}> = ({ text, isLatest, isRecording }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View 
      style={[
        {
          marginBottom: 8,
          paddingHorizontal: 4,
        },
        isLatest && {
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12,
        },
        { opacity: fadeAnim }
      ]}
    >
      <Typography 
        size="$font-description-md" 
        fontWeight="$regular" 
        color="$gray-700"
        style={styles.transcriptionText}
      >
        {text}
      </Typography>
    </Animated.View>
  )
}

export const TranscriptionList: React.FC<TranscriptionListProps> = ({
  transcriptionChunks,
  isRecording,
  isProcessing,
  style
}) => {
  const scrollViewRef = useRef<ScrollView>(null)

  // Auto-scroll to bottom when new chunks are added
  useEffect(() => {
    if (transcriptionChunks.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [transcriptionChunks.length])

  const getStatusIndicatorStyle = () => {
    if (isRecording) return [styles.statusIndicator, styles.recordingIndicator]
    if (isProcessing) return [styles.statusIndicator, styles.processingIndicator]
    return [styles.statusIndicator, styles.idleIndicator]
  }

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Typography 
        size="$font-description-md" 
        fontWeight="$medium" 
        color="$gray-600"
        style={styles.emptyStateText}
      >
        {isRecording 
          ? 'Aguardando transcrição...' 
          : 'Nenhuma transcrição ainda. Inicie uma gravação para ver o texto aqui.'
        }
      </Typography>
    </View>
  )

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography 
          size="$font-title-sm" 
          fontWeight="$bold" 
          color="$primary"
          style={styles.headerTitle}
        >
          Transcrição em Tempo Real
        </Typography>
        <View style={getStatusIndicatorStyle()} />
      </View>

      {transcriptionChunks.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.listContainer}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingVertical: 8 }}
        >
          {transcriptionChunks.map((chunk, index) => (
            <TranscriptionTextBlock
              key={chunk.id}
              text={chunk.text}
              isLatest={index === transcriptionChunks.length - 1}
              isRecording={isRecording}
            />
          ))}
        </ScrollView>
      )}

      {isRecording && (
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Typography 
            size="$font-description-xs" 
            fontWeight="$medium" 
            color="$autism-peach"
            style={styles.liveText}
          >
            Gravando ao vivo
          </Typography>
        </View>
      )}
    </View>
  )
}
