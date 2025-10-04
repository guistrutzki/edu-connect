import { useFonts as useExpoFonts } from 'expo-font'

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts({
    'Poppins-Regular': require('@/../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/../assets/fonts/Poppins-Bold.ttf'),
  })

  return fontsLoaded
}
