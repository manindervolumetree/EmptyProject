import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
}) => {
  const navigation = useNavigation();

  const handleLeftButtonPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (showBackButton) {
      navigation.goBack();
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={handleLeftButtonPress}
        activeOpacity={0.7}
      >
        {showBackButton ? (
          <Icon
            name="chevron-back-outline"
            size={30}
            color={styles.title.color}
          />
        ) : (
          <Icon name="menu" size={30} color={styles.title.color} />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>
        {rightComponent || <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

export default ScreenHeader;
