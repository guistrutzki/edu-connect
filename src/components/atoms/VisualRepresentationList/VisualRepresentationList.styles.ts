import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../../utils/theme'

export const EmojiImage = styled.Image`
  width: 50px;
  height: 50px;
  background-color: red;
`

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS['$autism-gray'],
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS['$autism-lavender'],
  },
  headerTitle: {
    flex: 1,
  },
  countBadge: {
    backgroundColor: theme.COLORS['$autism-lavender'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    color: theme.COLORS['$gray-900'],
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16
  },
  representationItem: {
    width: 140,
    height: 180,
    marginRight: 16,
    backgroundColor: theme.COLORS['$color-grayscale-1'],
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  latestItem: {
    borderWidth: 2,
    borderColor: theme.COLORS['$autism-mint'],
    backgroundColor: theme.COLORS['$autism-gray'],
  },
  emojiContainer: {
    width: 74,
    height: 74,
    borderRadius: 12,
    backgroundColor: theme.COLORS['$autism-gray'],
    borderWidth: 1,
    borderColor: theme.COLORS['$autism-peach'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 40,
  },
  emojiSvg: {
    width: 60,
    height: 60,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  processingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.COLORS['$autism-blue'],
    marginRight: 6,
  },
  processingText: {
    fontSize: 12,
    fontWeight: '500',
  },
})
