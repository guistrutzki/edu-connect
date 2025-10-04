import type { StyledCommonProps } from '@utils/styledCommonProps'
import { theme } from '@utils/theme'
import type { ReactNode } from 'react'
import type { TextProps } from 'react-native'
import { getTypographyStyle, Text } from './Typography.styles'

// Font mapping for Poppins
const getFontFamily = (fontWeight: keyof typeof theme.fontWeight) => {
  switch (fontWeight) {
    case '$regular':
      return 'Poppins-Regular'
    case '$medium':
      return 'Poppins-Medium'
    case '$semiBold':
      return 'Poppins-SemiBold'
    case '$bold':
      return 'Poppins-Bold'
    default:
      return 'Poppins-Regular'
  }
}

interface TypographyProps extends TextProps, StyledCommonProps {
  children: ReactNode
  size?: keyof typeof theme.typography
  color?: keyof typeof theme.COLORS
  fontWeight?: keyof typeof theme.fontWeight
}

export const Typography = ({
  size = '$font-description-md',
  fontWeight = '$regular',
  color = '$color-grayscale-1',
  style,
  children,
  ...props
}: TypographyProps) => {
  const fontFamily = getFontFamily(fontWeight)
  
  return (
    <Text
      {...props}
      style={[
        getTypographyStyle(
          theme.typography[size],
          theme.fontWeight[fontWeight],
          color
        ),
        { fontFamily },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
