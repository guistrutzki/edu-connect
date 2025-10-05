import { VisualRepresentation } from '../../../types/audio.types'

export interface VisualRepresentationListProps {
  visualRepresentations: VisualRepresentation[]
  isProcessing: boolean
  style?: any
}

export interface VisualRepresentationItemProps {
  representation: VisualRepresentation
  isLatest: boolean
}
