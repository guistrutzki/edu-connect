import React from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import LottieView from 'lottie-react-native'

interface LottieAnimationProps {
  source: any
  autoPlay?: boolean
  loop?: boolean
  style?: any
  speed?: number
  progress?: number
}

const { width: screenWidth } = Dimensions.get('window')

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  autoPlay = true,
  loop = true,
  style,
  speed = 0.8,
}) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        style={styles.animation}
        resizeMode="contain"
        colorFilters={[
          { keypath: 'Shape Layer 1', color: '#FE5000' }, // Red
          { keypath: 'Shape Layer 2', color: '#FFC20E' }, // Yellow
          { keypath: 'Shape Layer 3', color: '#74D2E7' }, // Blue
          { keypath: 'Shape Layer 4', color: '#2DDE98' }, // Green
          { keypath: 'Shape Layer 5', color: '#FE5000' }, // Red
          { keypath: 'Shape Layer 6', color: '#FFC20E' }, // Yellow
          { keypath: 'Shape Layer 7', color: '#74D2E7' }, // Blue
          { keypath: 'Shape Layer 8', color: '#2DDE98' }, // Green
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    maxWidth: 450,
    maxHeight: 450,
  },
})
