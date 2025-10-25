import React from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gredientBackgroundStyles } from './styles';
import { colors as colorConstants } from '@/constants/theme/colors';

interface GradientBackgroundProps {
  colors?: string[];
  style?: ViewStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = [
    colorConstants.primaryLight,
    colorConstants.primary,
    colorConstants.primaryDark,
  ],
  style,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[gredientBackgroundStyles.container, style]}
    />
  );
};

export default GradientBackground;
