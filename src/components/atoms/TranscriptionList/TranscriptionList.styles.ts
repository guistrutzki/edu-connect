import { StyleSheet } from 'react-native'
import { theme } from '../../../utils/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS['$color-grayscale-1'],
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
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
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  recordingIndicator: {
    backgroundColor: theme.COLORS['$autism-peach'],
  },
  processingIndicator: {
    backgroundColor: theme.COLORS['$autism-blue'],
  },
  idleIndicator: {
    backgroundColor: theme.COLORS['$autism-gray'],
  },
  listContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  textBlock: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  latestTextBlock: {
    backgroundColor: theme.COLORS['$autism-gray'],
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  transcriptionText: {
    lineHeight: 22,
    textAlign: 'left',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.COLORS['$autism-peach'],
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '500',
  },
})