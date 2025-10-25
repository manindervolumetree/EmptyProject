import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';
import { customButtonStyles as styles } from './styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.buttonContainer;

    if (disabled || loading) {
      return {
        ...baseStyle,
        backgroundColor: colors.button.disabled,
      };
    }

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.primary,
        };
      case 'primary':
      default:
        return {
          ...baseStyle,
          backgroundColor: colors.button.primary,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = {
      fontSize: typography.button.fontSize,
      fontFamily: typography.button.fontFamily,
      textAlign: 'center' as const,
    };

    if (disabled || loading) {
      return {
        ...baseStyle,
        color: colors.text.tertiary,
      };
    }

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          color: colors.primary,
        };
      case 'primary':
      default:
        return {
          ...baseStyle,
          color: colors.button.text,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[getButtonStyle(), style]}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={
              variant === 'secondary' ? colors.primary : colors.button.text
            }
            style={styles.loadingIndicator}
          />
        )}
        <Text
          style={[getTextStyle(), textStyle, loading && styles.loadingText]}
        >
          {loading ? 'Loading...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
