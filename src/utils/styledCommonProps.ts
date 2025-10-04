import type { theme } from './theme'
import { css } from 'styled-components/native'

export interface StyledCommonProps {
  backgroundColor?: keyof typeof theme.COLORS

  // Margins and paddings
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  mh?: number
  mv?: number
  pt?: number
  pb?: number
  pr?: number
  pl?: number
  ph?: number
  pv?: number

  // dimensions
  width?: string
  height?: string
  borderRadius?: string
}

export default css<StyledCommonProps>`
  ${({
    backgroundColor,
    mt,
    mb,
    mr,
    ml,
    mh,
    mv,
    pt,
    pb,
    pr,
    pl,
    ph,
    pv,
    width,
    height,
    borderRadius,
  }: StyledCommonProps) => `
      margin-top: ${mt || 0}px;
      margin-bottom: ${mb || 0}px;
      margin-right: ${mr || 0}px;
      margin-left: ${ml || 0}px;
      margin-horizontal: ${mh || 0}px;
      margin-vertical: ${mv || 0}px;
      padding-top: ${pt || 0}px;
      padding-bottom: ${pb || 0}px;
      padding-right: ${pr || 0}px;
      padding-left: ${pl || 0}px;
      padding-horizontal: ${ph || 0}px;
      padding-vertical: ${pv || 0}px;
      width: ${width ? `${width}px` : 'auto'};
      height: ${height ? `${height}px` : 'auto'};
      background-color: ${backgroundColor || 'transparent'};
      border-radius: ${borderRadius || 0};
`}
`
