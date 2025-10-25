import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/auth.slice';
import { RootState } from '@/store/store';
import { customDrawerStyles as styles } from './styles';
import ConfirmationModal from '@/components/common/Modal/ConfirmationModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/Button/CustomButton';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout());
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']} />
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.firstName
                ? profile.firstName.charAt(0).toUpperCase()
                : 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {profile?.firstName || 'User Name'}
            </Text>
            <Text style={styles.userEmail}>{profile?.email || ''}</Text>
          </View>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        style={styles.drawerContent}
        contentContainerStyle={styles.drawerContentContainer}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <CustomButton title="Logout" onPress={handleLogoutPress} />
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Telexa v1.0.0</Text>
        </View>
      </View>
      <SafeAreaView edges={['bottom']} />

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        visible={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        confirmButtonColor="error"
      />
    </View>
  );
};

export default CustomDrawerContent;
