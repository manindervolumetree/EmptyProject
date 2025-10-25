import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  KeyboardTypeOptions,
  Image,
} from 'react-native';
import { colors } from '@/constants/theme/colors';
import { Icons } from '@/constants/icons';
import { customTextFieldStyles as styles } from './styles';

interface CustomTextFieldProps {
  title: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  errorColor?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  showPasswordToggle?: boolean;
  maxLength?: number;
  editable?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  title,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  errorColor,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  showPasswordToggle = false,
  maxLength,
  editable = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle = styles.inputContainer;

    if (!editable) {
      return {
        ...baseStyle,
        borderColor: colors.border.light,
        borderWidth: 1,
        backgroundColor: colors.background.secondary,
      };
    }
    if (error) {
      return {
        ...baseStyle,
        borderColor: colors.primary,
        borderWidth: 1,
      };
    }

    if (isFocused) {
      return {
        ...baseStyle,
        borderColor: colors.primary,
        borderWidth: 1,
      };
    }

    return {
      ...baseStyle,
      borderColor: colors.border.light,
      borderWidth: 1,
    };
  };

  const actualSecureTextEntry = showPasswordToggle
    ? secureTextEntry && !isPasswordVisible
    : secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      {/* Title/Label */}
      <Text style={[styles.title, errorColor && { color: errorColor }]}>
        {title}
      </Text>

      {/* Input Container */}
      <View style={getInputContainerStyle()}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={actualSecureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Password Toggle Button */}
        {showPasswordToggle && isFocused && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Image
              source={
                isPasswordVisible ? Icons.passwordShow : Icons.passwordHide
              }
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={[styles.errorText, errorColor && { color: errorColor }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomTextField;
