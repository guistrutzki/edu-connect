import { areFontsLoaded } from '@utils/fonts'
import { responsiveSize } from '@utils/responsiveSize'
import styledCommonProps from '@utils/styledCommonProps'
import { theme } from '@utils/theme'
import { Platform, type TextStyle } from 'react-native'
import styled from 'styled-components/native'
import {
  FontSize,
  type FontWeight,
  LineHeight,
  type Typography,
} from './Typography.types'

export const Text = styled.Text<any>`
  ${styledCommonProps}
`

const isAndroid = Platform.OS === 'android'

export const getTypographyStyle = (
  typography: Typography,
  fontWeight: FontWeight,
  color: keyof typeof theme.COLORS
): TextStyle => {
  const fontFamily = areFontsLoaded()
    ? theme.FONTS[fontWeight]
    : theme.FALLBACK_FONTS[fontWeight]

  const baseFontSize = Number(FontSize[typography])

  const platformMultiplier = isAndroid ? 1.03 : 1
  const responsiveFontSize = responsiveSize(baseFontSize * platformMultiplier)
  

  return {
    fontSize: responsiveFontSize,
    color: theme.COLORS[color],
    fontFamily,
    includeFontPadding: false,
    textAlignVertical: 'bottom',
  }
}
