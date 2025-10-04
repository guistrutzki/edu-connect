import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import * as Font from 'expo-font'

/**
 * Load Poppins font family for the app using Google Fonts
 * This should be called during app initialization
 */
export const loadFonts = async (): Promise<void> => {
  try {
    // Load Poppins fonts from Google Fonts
    await Font.loadAsync({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold,
    })
    console.log('✅ Poppins fonts loaded successfully from Google Fonts')
  } catch (error) {
    console.warn('⚠️ Failed to load Poppins fonts from Google Fonts:', error)
  }
}

/**
 * Check if fonts are loaded
 */
export const areFontsLoaded = (): boolean => {
  return (
    Font.isLoaded('Poppins_400Regular') &&
    Font.isLoaded('Poppins_500Medium') &&
    Font.isLoaded('Poppins_700Bold')
  )
}

/**
 * Hook to use Poppins fonts in components
 * This is the recommended way to use Google Fonts with expo-font
 */
export const usePoppinsFonts = () => {
  return useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })
}
