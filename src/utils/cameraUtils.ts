import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting Android camera permission:', err);
      return false;
    }
  } else if (Platform.OS === 'ios') {
    try {
      const status = await check(PERMISSIONS.IOS.CAMERA);

      if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.DENIED) {
        const reqStatus = await request(PERMISSIONS.IOS.CAMERA);
        return reqStatus === RESULTS.GRANTED;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error requesting iOS camera permission:', err);
      return false;
    }
  }

  return false;
};
