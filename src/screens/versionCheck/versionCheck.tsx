import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import { ScreenNames } from '@/types/enum';
import { styles } from './styles';
import {
  checkVersionRequest,
  clearVersionInfo,
} from '@/store/slices/auth.slice';
import { RootState } from '@/store/store';

const VersionCheckScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [showUpdateScreen, setShowUpdateScreen] = useState(false);
  const { versionCheckCompleted, versionInfo, token } = useSelector(
    (state: RootState) => state.auth,
  );
  const isLoggedIn = !!token;

  useEffect(() => {
    const version = DeviceInfo.getVersion();
    dispatch(checkVersionRequest({ version }));
  }, [dispatch]);

  const navigateToNextScreen = () => {
    if (isLoggedIn) {
      navigation.replace(ScreenNames.DrawerStack);
    } else {
      navigation.replace(ScreenNames.Login);
    }
  };

  useEffect(() => {
    if (versionCheckCompleted && versionInfo) {
      const hasUpdate = versionInfo.isCritical || versionInfo.isNormalUpdate;

      if (hasUpdate) {
        setShowUpdateScreen(true);
      } else {
        navigateToNextScreen();
      }
    }
  }, [versionCheckCompleted, versionInfo, navigation, isLoggedIn]);

  const handleUpdate = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/trapinsights/id123456789', // Replace with actual App Store URL
      android: 'https://play.google.com/store/apps/details?id=com.trapinsights', // Replace with actual Play Store URL
    });

    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  const handleLaterAction = () => {
    navigateToNextScreen();
    dispatch(clearVersionInfo());
  };

  // Show loading screen while checking version
  if (!versionCheckCompleted) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Show update screen if update is available
  if (showUpdateScreen && versionInfo) {
    const isCritical = versionInfo.isCritical;

    return (
      <View style={styles.container}>
        <View style={styles.updateContainer}>
          <Text style={styles.updateTitle}>
            {isCritical ? 'Critical Update Required' : 'Update Available'}
          </Text>
          <Text style={styles.updateMessage}>
            {isCritical
              ? 'A critical update is required to continue using the app. Please update now.'
              : 'A new version of the app is available. Would you like to update?'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>Update Now</Text>
            </TouchableOpacity>

            {!isCritical && (
              <TouchableOpacity
                style={[styles.button, styles.laterButton]}
                onPress={handleLaterAction}
              >
                <Text style={styles.laterButtonText}>Later</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  // Default loading state
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default VersionCheckScreen;
