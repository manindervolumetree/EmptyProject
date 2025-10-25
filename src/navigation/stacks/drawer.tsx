import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsStack from './bottomTabs';
import { ScreenNames } from '@/types/enum';
import { fontFamily } from '@/constants/theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawerContent from '@/components/ui/Sidemenu/CustomDrawerContent';
import ProfileScreen from '@/screens/profile';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
          padding: 0,
          margin: 0,
        },
        drawerActiveTintColor: '#6366F1',
        drawerInactiveTintColor: '#6B7280',
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: fontFamily.medium,
        },
      }}
      initialRouteName={ScreenNames.Profile}
    >
      {/* <Drawer.Screen
        name={ScreenNames.BottomTabsStack}
        component={BottomTabsStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home-sharp" size={25} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Icon name="person" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
