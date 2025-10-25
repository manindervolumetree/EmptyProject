import { StyleSheet } from 'react-native';

export const customButtonStyles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginRight: 8,
  },
  loadingText: {
    opacity: 0.8,
  },
});
