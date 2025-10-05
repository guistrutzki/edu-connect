import { StyleSheet } from 'react-native'
import { theme } from '../../../utils/theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  recordingButton: {
    backgroundColor: theme.COLORS['$autism-lavender'],
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 180,
    alignItems: 'center',
    shadowColor: theme.COLORS['$autism-lavender'],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  stopButton: {
    backgroundColor: theme.COLORS['$autism-peach'],
    shadowColor: theme.COLORS['$autism-peach'],
  },
  processingButton: {
    backgroundColor: theme.COLORS['$autism-blue'],
    shadowColor: theme.COLORS['$autism-blue'],
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.COLORS['$autism-peach'],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginLeft: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.COLORS['$autism-peach'],
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 4,
  },
  durationText: {
    textAlign: 'center',
    opacity: 0.8,
  },
  microphoneIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.COLORS['$autism-gray'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'visible',
  },
  recordingIcon: {
    backgroundColor: theme.COLORS['$autism-mint'],
  },
  processingIcon: {
    backgroundColor: theme.COLORS['$autism-blue'],
  },
  microphoneEmoji: {
    fontSize: 32,
  },
  pulseAnimation: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.COLORS['$autism-mint'],
    opacity: 0.3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loadingSpinner: {
    marginRight: 8,
  },
})
