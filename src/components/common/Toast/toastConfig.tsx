import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig as RNToastConfig,
} from 'react-native-toast-message';
import { styles } from './styles';
/**
 * Custom toast configuration for react-native-toast-message
 * This allows for customizing the appearance of different toast types
 */
export const toastConfig: RNToastConfig = {
  /**
   * Success toast configuration
   */
  success: props => (
    <BaseToast
      {...props}
      style={[styles.successToast, { minHeight: 60 }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),

  /**
   * Error toast configuration
   */
  error: props => (
    <ErrorToast
      {...props}
      style={[styles.errorToast, { minHeight: 60 }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),

  /**
   * Info toast configuration
   */
  info: props => (
    <InfoToast
      {...props}
      style={[styles.infoToast, { minHeight: 60 }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),

  /**
   * Custom toast configuration example
   * You can create your own toast types with custom UI
   */
  customToast: ({ text1, text2, onPress }) => (
    <TouchableOpacity style={styles.customToast} onPress={onPress}>
      <View style={styles.customToastContent}>
        {text1 && <Text style={styles.customTitle}>{text1}</Text>}
        {text2 && <Text style={styles.customMessage}>{text2}</Text>}
      </View>
    </TouchableOpacity>
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export default ToastComponent;
