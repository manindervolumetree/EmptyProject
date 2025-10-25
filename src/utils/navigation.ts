import { ScreenNames } from '@/types/enum';
import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';

// Define the RootStackParamList type to use with your navigation
export type RootStackParamList = {
  [ScreenNames.Login]: undefined;
  [ScreenNames.SignUp]: undefined;
  [ScreenNames.ForgotPassword]: undefined;
  [ScreenNames.DrawerStack]: undefined;
  [ScreenNames.ChangePassword]: undefined;
  [ScreenNames.ResetPassword]: { token?: string; email?: string };
  [ScreenNames.OtpVerification]: {
    email?: string;
    type?: 'forgot-password' | 'signup';
  };
  [ScreenNames.ProfileChangePassword]: undefined;
  [ScreenNames.CountrySelectionScreen]: {
    onSelectCountry: (country: any) => void;
    selectedCountry?: string;
    title?: string;
  };
};

// Create a strongly typed navigation reference
export const NavigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Navigate to a screen
 * @param name - Name of the screen to navigate to
 * @param params - Parameters to pass to the screen
 */
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (NavigationRef.isReady()) {
    NavigationRef.navigate(name as any, params as any);
  } else {
    console.warn('Navigation attempted before navigator was ready');
  }
}

/**
 * Go back to the previous screen
 */
export function goBack() {
  if (NavigationRef.isReady() && NavigationRef.canGoBack()) {
    NavigationRef.goBack();
  } else {
    console.warn('Cannot go back or navigator not ready');
  }
}

/**
 * Reset the navigation state to the provided state
 * @param routes - Array of routes to set
 * @param index - Index of the active route
 */
export function reset(
  routes: { name: keyof RootStackParamList; params?: any }[],
  index: number = 0,
) {
  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  } else {
    console.warn('Navigation reset attempted before navigator was ready');
  }
}

/**
 * Replace the current screen with a new one
 * @param name - Name of the screen to replace with
 * @param params - Parameters to pass to the screen
 */
export function replace<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.replace(name as string, params));
  } else {
    console.warn('Navigation replace attempted before navigator was ready');
  }
}

/**
 * Push a new screen onto the stack
 * @param name - Name of the screen to push
 * @param params - Parameters to pass to the screen
 */
export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.push(name as string, params));
  } else {
    console.warn('Navigation push attempted before navigator was ready');
  }
}

/**
 * Pop the current screen from the stack
 * @param count - Number of screens to pop (default: 1)
 */
export function pop(count: number = 1) {
  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.pop(count));
  } else {
    console.warn('Navigation pop attempted before navigator was ready');
  }
}

/**
 * Pop to the top screen of the stack
 */
export function popToTop() {
  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.popToTop());
  } else {
    console.warn('Navigation popToTop attempted before navigator was ready');
  }
}

/**
 * Get the current route name
 * @returns The name of the current route or undefined if not available
 */
export function getCurrentRouteName(): string | undefined {
  if (NavigationRef.isReady()) {
    return NavigationRef.getCurrentRoute()?.name;
  }
  return undefined;
}

/**
 * Get the current route params
 * @returns The params of the current route or undefined if not available
 */
export function getCurrentRouteParams(): any | undefined {
  if (NavigationRef.isReady()) {
    return NavigationRef.getCurrentRoute()?.params;
  }
  return undefined;
}

// Navigation utility object for named exports
const NavigationUtil = {
  navigate,
  goBack,
  reset,
  replace,
  push,
  pop,
  popToTop,
  getCurrentRouteName,
  getCurrentRouteParams,
};

export default NavigationUtil;
