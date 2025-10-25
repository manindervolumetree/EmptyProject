import { t } from '@/i18n/localizations';
import Toast, { ToastShowParams } from 'react-native-toast-message';

/**
 * Toast types supported by react-native-toast-message
 */
export type ToastType = 'success' | 'error' | 'info';

/**
 * Default titles for different toast types
 */
const DEFAULT_TITLES: Record<ToastType, string> = {
  success: t('common.success') || 'Success!',
  error: t('common.error') || 'Failed!',
  info: 'Information',
};

/**
 * Interface for toast configuration
 */
interface ToastConfig {
  title?: string;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  onPress?: () => void;
  props?: Record<string, any>;
}

/**
 * Default toast configuration
 */
const defaultConfig: Partial<ToastConfig> = {
  duration: 3000,
  position: 'top',
};

/**
 * Show a toast notification
 * @param type - Type of toast (success, error, info)
 * @param config - Toast configuration
 */
export const showToast = (type: ToastType, config: ToastConfig): void => {
  const { title, message, duration, position, onPress, props } = {
    ...defaultConfig,
    ...config,
  };

  const toastParams: ToastShowParams = {
    type,
    text1: title || DEFAULT_TITLES[type],
    text2: message,
    visibilityTime: duration,
    position,
    onPress,
    props,
  };

  Toast.show(toastParams);
};

/**
 * Show a success toast notification
 * @param message - Message text
 * @param title - Optional title text (defaults to "Success!")
 * @param config - Additional toast configuration
 */
export const showSuccessToast = (
  message: string,
  title?: string,
  config?: Partial<Omit<ToastConfig, 'title' | 'message'>>,
): void => {
  showToast('success', { title, message, ...config });
};

/**
 * Show an error toast notification
 * @param message - Message text
 * @param title - Optional title text (defaults to "Failed!")
 * @param config - Additional toast configuration
 */
export const showErrorToast = (
  message: string,
  title?: string,
  config?: Partial<Omit<ToastConfig, 'title' | 'message'>>,
): void => {
  showToast('error', { title, message, ...config });
};

/**
 * Show an info toast notification
 * @param message - Message text
 * @param title - Optional title text (defaults to "Information")
 * @param config - Additional toast configuration
 */
export const showInfoToast = (
  message: string,
  title?: string,
  config?: Partial<Omit<ToastConfig, 'title' | 'message'>>,
): void => {
  showToast('info', { title, message, ...config });
};

/**
 * Hide all currently displayed toasts
 */
export const hideToast = (): void => {
  Toast.hide();
};

/**
 * Toast utility functions
 */
const ToastUtil = {
  show: showToast,
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  hide: hideToast,
};

export default ToastUtil;
