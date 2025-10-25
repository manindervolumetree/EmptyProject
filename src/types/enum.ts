export enum ToastEnum {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  NotPrefer = 'not_prefer',
}

export const GenderLabels: Record<Gender, string> = {
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
  [Gender.Other]: 'Other',
  [Gender.NotPrefer]: 'Prefer not to say',
};

export enum ScreenNames {
  VersionCheck = 'VersionCheck',
  DrawerStack = 'DrawerStack',
  BottomTabsStack = 'BottomTabsStack',
  Login = 'Login',
  SignUp = 'Signup',
  ForgotPassword = 'ForgotPassword',
  OtpVerification = 'OtpVerification',
  ResetPassword = 'ResetPassword',
  ChangePassword = 'ChangePassword',
  ProfileChangePassword = 'ProfileChangePassword',
  Profile = 'Profile',
  CountrySelectionScreen = 'CountrySelectionScreen',
}
