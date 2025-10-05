import React, { useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { Typography } from '../Typography'
import { VisualRepresentationListProps, VisualRepresentationItemProps } from './VisualRepresentationList.types'
import { VisualRepresentation } from '../../../types/audio.types'
import { styles } from './VisualRepresentationList.styles'

const VisualRepresentationItem: React.FC<VisualRepresentationItemProps> = ({ 
  representation, 
  isLatest 
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])


  return (
    <Animated.View 
      style={[
        styles.representationItem,
        isLatest && styles.latestItem,
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={styles.emojiContainer}>
        {React.createElement(representation.emoji, {
          width: 80,
          height: 80,
          style: styles.emojiSvg
        })}
      </View>
      
      <Typography 
        size="$font-description-md" 
        fontWeight="$medium" 
        color="$gray-700"
        style={styles.contentText}
        numberOfLines={4}
      >
        {representation.content}
      </Typography>
    </Animated.View>
  )
}

export const VisualRepresentationList: React.FC<VisualRepresentationListProps> = ({
  visualRepresentations,
  isProcessing,
  style
}) => {
  const flatListRef = useRef<FlatList>(null)

  // Auto-scroll to end when new items are added
  useEffect(() => {
    if (visualRepresentations.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [visualRepresentations.length])

  const renderRepresentationItem = ({ item, index }: { item: VisualRepresentation; index: number }) => (
    <VisualRepresentationItem
      representation={item}
      isLatest={index === visualRepresentations.length - 1}
    />
  )

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Typography 
        size="$font-description-md" 
        fontWeight="$medium" 
        color="$gray-600"
        style={styles.emptyStateText}
      >
        {isProcessing 
          ? 'Processando representações visuais...' 
          : 'Nenhuma representação visual ainda. Inicie uma gravação para ver emojis e ilustrações aqui.'
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
          Representações Visuais
        </Typography>
        {visualRepresentations.length > 0 && (
          <View style={styles.countBadge}>
            <Typography 
              size="$font-description-xs" 
              fontWeight="$bold" 
              color="$color-grayscale-1"
              style={styles.countText}
            >
              {visualRepresentations.length}
            </Typography>
          </View>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={visualRepresentations}
        renderItem={renderRepresentationItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          visualRepresentations.length === 0 
            ? { flex: 1, justifyContent: 'center' } 
            : { paddingBottom: 40 }
        }
        ListEmptyComponent={renderEmptyState}
      />

      {isProcessing && (
        <View style={styles.processingIndicator}>
          <View style={styles.processingDot} />
          <Typography 
            size="$font-description-xs" 
            fontWeight="$medium" 
            color="$autism-blue"
            style={styles.processingText}
          >
            Processando...
          </Typography>
        </View>
      )}
    </View>
  )
}
