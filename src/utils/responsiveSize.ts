import { Dimensions } from 'react-native'

/**
 * Calculates a responsive size based on screen dimensions, pixel density, and screen ratio
 * with 10% limits to prevent extreme scaling
 *
 * @param baseSize The base size to calculate from
 * @returns The calculated responsive size
 *
 * @example
 * ```typescript
 * const fontSize = responsiveSize(20) // Returns responsive size for 20px base
 * const margin = responsiveSize(16) // Returns responsive margin for 16px base
 * ```
 */
export const responsiveSize = (baseSize: number): number => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  // Reference dimensions (iPhone X)
  const referenceScreenWidth = 375
  const referenceScreenHeight = 812

  // Calculate screen size factor based on diagonal
  const referenceDiagonal = Math.sqrt(
    referenceScreenWidth ** 2 + referenceScreenHeight ** 2
  )
  const currentDiagonal = Math.sqrt(screenWidth ** 2 + screenHeight ** 2)
  const sizeFactor = currentDiagonal / referenceDiagonal

  // Calculate the responsive size
  let responsiveSize = baseSize * sizeFactor

  // Apply strict percentage limits
  const maxSize = baseSize * 1.05 // +5%
  const minSize = baseSize * 0.9 // -10%

  // Clamp the result within the specified limits
  responsiveSize = Math.max(minSize, Math.min(maxSize, responsiveSize))

  return Math.round(responsiveSize * 10) / 10
}
