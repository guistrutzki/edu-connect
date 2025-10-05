import type { StyleProp, ViewStyle } from 'react-native'

import * as icons from '@assets/svgs'
import { theme } from '@utils/theme'

export interface IconSVGProps {
  name: keyof typeof icons
  size?: keyof typeof sizes
  fill?: keyof typeof theme.COLORS
  stroke?: keyof typeof theme.COLORS
  style?: StyleProp<ViewStyle>
  customSize?: {
    width: number
    height: number
  }
}

export type IconsName = keyof typeof icons

export const sizes = {
  XXXS: 14,
  XXS: 18,
  SM: 22,
  MD: 32,
  LG: 40,
} as const
