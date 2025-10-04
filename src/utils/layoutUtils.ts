import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const isTablet = width >= 768
export const isSmallDevice = width < 375
