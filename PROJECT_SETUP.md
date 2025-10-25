# React Native Project Setup Guide

This guide provides step-by-step instructions to set up a new React Native project with all necessary dependencies and configurations.

## Project Initialization

Create a new React Native project using the community CLI:

```bash
npx @react-native-community/cli init
```

## Dependencies Installation

Install all required dependencies:

```bash
npm install @hookform/resolvers @react-native-community/datetimepicker @react-native-google-signin/google-signin @react-native/new-app-screen @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/native @react-navigation/native-stack @reduxjs/toolkit axios i18n-js moment react react-hook-form react-native react-native-date-picker react-native-gesture-handler react-native-image-picker react-native-linear-gradient react-native-localize react-native-mmkv react-native-permissions react-native-reanimated react-native-safe-area-context react-native-screens react-native-toast-message react-native-vector-icons react-native-webview react-native-worklets react-redux redux redux-persist redux-saga yup react-native-nitro-modules react-native-device-info
```

## Dev Dependencies

Install development dependencies:

```bash
npm install --save-dev babel-plugin-module-resolver react-native-dotenv
```

## Configuration

### TypeScript Configuration (tsconfig.json)

Add path mapping to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Babel Configuration (babel.config.js)

Update your `babel.config.js` with the following plugins:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
```

### iOS Podfile Configuration (ios/Podfile)

For react-native-permissions, update your `ios/Podfile`:

```ruby
def node_require(script)
  # Resolve script with node to allow for hoisting
  require Pod::Executable.execute_command('node', ['-p',
    "require.resolve('#{script}',{paths: [process.argv[1]]},)", __dir__]).strip
end

# Use it to require both react-native's and this package's scripts:
node_require('react-native/scripts/react_native_pods.rb')
node_require('react-native-permissions/scripts/setup.rb')

platform :ios, min_ios_version_supported
prepare_react_native_project!

setup_permissions([
  # 'AppTrackingTransparency',
  # 'Bluetooth',
  # 'Calendars',
  # 'CalendarsWriteOnly',
  'Camera',
  # 'Contacts',
  # 'FaceID',
  # 'LocationAccuracy',
  'LocationAlways',
  'LocationWhenInUse',
  'MediaLibrary',
  # 'Microphone',
  # 'Motion',
  'Notifications',
  'PhotoLibrary',
  # 'PhotoLibraryAddOnly',
  # 'Reminders',
  # 'Siri',
  # 'SpeechRecognition',
  # 'StoreKit',
])
```

### Android Configuration (android/app/build.gradle)

For react-native-vector-icons, edit `android/app/build.gradle` (NOT `android/build.gradle`) and add:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

To customize the fonts being copied, use:

```gradle
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Specify font files
]
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### iOS Info.plist Configuration (ios/ProjectName/Info.plist)

For react-native-vector-icons, add the following fonts to your `Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>FontAwesome6_Brands.ttf</string>
  <string>FontAwesome6_Regular.ttf</string>
  <string>FontAwesome6_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>
```

### App.tsx Setup

Replace your `App.tsx` content with:

```tsx
import RootStack from '@/navigation/rootStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import ToastComponent from '@/components/common/Toast/toastConfig';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
        <ToastComponent />
      </PersistGate>
    </Provider>
  );
}

export default App;
```

## Getting Started

### Step 1: Start the Metro Server

```bash
npm start
```

### Step 2: Run the Application

#### For Android

```bash
npm run android
```

#### For iOS

```bash
npm run ios
```

## Project Folder Structure

The project follows this organized folder structure:

### Root Structure

```
Soriz/
├── android/
│   └── app/
│       └── src/
│           └── main/
│               ├── java/com/soriz/
│               │   ├── MainActivity.kt
│               │   └── MainApplication.kt
│               ├── res/
│               │   ├── drawable/
│               │   ├── mipmap-*/
│               │   └── values/
│               └── AndroidManifest.xml
├── ios/
├── src/
└── node_modules/
```

### Source Directory Structure

```
src/
├── assets/
│   └── icons/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── CustomButton/
│   │   │   │   ├── CustomButton.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.ts
│   │   ├── Input/
│   │   │   ├── CustomTextField/
│   │   │   │   ├── CustomTextField.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.ts
│   │   ├── Loading/
│   │   │   └── GradientBackground/
│   │   │       ├── GradientBackground.tsx
│   │   │       ├── index.ts
│   │   │       └── styles.ts
│   │   ├── Modal/
│   │   │   ├── ConfirmationModal/
│   │   │   │   ├── ConfirmationModal.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.ts
│   │   └── Toast/
│   │       ├── toastConfig.tsx
│   │       └── styles.ts
│   └── ui/
│       └── Sidemenu/
│           ├── CustomDrawerContent.tsx
│           ├── index.ts
│           └── styles.ts
├── constants/
│   ├── theme/
│   ├── endpoints.ts
│   └── icons.ts
├── i18n/
│   ├── localization/
│   ├── localization.type.ts
│   └── localizations.ts
├── navigation/
│   ├── stacks/
│   └── rootStack.tsx
├── screens/
│   ├── auth/
│   ├── changePassword/
│   ├── countrySelection/
│   ├── profile/
│   └── versionCheck/
├── store/
│   ├── sagas/
│   ├── slices/
│   ├── rootReducer.ts
│   ├── rootSaga.ts
│   └── store.ts
├── types/
│   ├── enum.ts
│   ├── env.d.ts
│   ├── react-native-vector-icons.d.ts
│   ├── request.ts
│   └── response.ts
└── utils/
    ├── validation/
    ├── axios.ts
    ├── cameraUtils.ts
    ├── mmkv.ts
    ├── navigation.ts
    └── toast.ts
```

### Component Organization Pattern

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx    # Main component file
├── index.ts            # Export file for clean imports
└── styles.ts           # Component-specific styles
```

### Additional Folders to Create (if needed)

```
src/
├── services/
│   ├── api/
│   ├── storage/
│   └── permissions/
├── hooks/
└── assets/
    ├── images/
    └── fonts/
```

### Component Development Guidelines

When creating new components:

1. Create a folder with the component name in PascalCase
2. Include the main component file (ComponentName.tsx)
3. Add an index.ts file for clean imports: `export { default } from './ComponentName';`
4. Create a styles.ts file for component-specific styling
5. Follow consistent naming conventions across all components

## Project Structure Overview

This setup includes:

- **Navigation**: React Navigation with stack, drawer, and bottom tabs
- **State Management**: Redux Toolkit with Redux Persist and Redux Saga
- **Forms**: React Hook Form with Yup validation
- **UI Components**: Vector icons, linear gradients, image picker
- **Internationalization**: i18n-js with react-native-localize
- **Storage**: MMKV for fast storage
- **Authentication**: Google Sign-In integration
- **Utilities**: Moment.js, Axios for API calls, device info
- **Development**: Path aliases and environment variables support

## Additional Setup Required

After installation, you may need to:

1. Configure platform-specific settings for some libraries
2. Set up your Redux store structure
3. Create your navigation stack
4. Configure toast notifications
5. Set up environment variables in `.env` file

Refer to individual library documentation for platform-specific setup instructions.

## Dependencies Overview

### Core Navigation

- `@react-navigation/native` - Core navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Bottom tab navigator
- `@react-navigation/drawer` - Drawer navigator

### State Management

- `@reduxjs/toolkit` - Modern Redux with simplified API
- `react-redux` - React bindings for Redux
- `redux-persist` - Persist Redux state
- `redux-saga` - Side effect management

### Forms & Validation

- `react-hook-form` - Performant forms library
- `@hookform/resolvers` - Validation resolvers
- `yup` - Schema validation

### UI & Components

- `react-native-vector-icons` - Icon library
- `react-native-linear-gradient` - Gradient components
- `react-native-toast-message` - Toast notifications
- `react-native-safe-area-context` - Safe area handling

### Utilities

- `axios` - HTTP client
- `moment` - Date manipulation
- `react-native-mmkv` - Fast key-value storage
- `react-native-device-info` - Device information
- `react-native-localize` - Localization utilities
- `i18n-js` - Internationalization

### Media & Permissions

- `react-native-image-picker` - Image selection
- `react-native-permissions` - Permission handling
- `react-native-date-picker` - Date picker component

### Authentication

- `@react-native-google-signin/google-signin` - Google authentication

### Development

- `babel-plugin-module-resolver` - Path aliasing
- `react-native-dotenv` - Environment variables
