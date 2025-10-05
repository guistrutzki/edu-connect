import * as icons from '@assets/svgs'
import { theme } from '@utils/theme'

import type { IconSVGProps } from './IconSVG.types'
import { sizes } from './IconSVG.types'

export const IconSVG = ({
  name,
  size = 'SM',
  fill,
  stroke,
  customSize,
  style,
}: IconSVGProps): React.JSX.Element => {
  const IconComponent = icons[name]

  return (
    <IconComponent
      width={customSize ? customSize.width : sizes[size]}
      height={customSize ? customSize.height : sizes[size]}
      {...(fill ? { fill: theme.COLORS[fill] } : {})}
      {...(stroke ? { stroke: theme.COLORS[stroke] } : {})}
      style={style}
    />
  )
}
