# 🚀 Running Instructions

Complete guide for running and building the PMPML App Clone.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/PMPMLGithub.git
cd PMPMLGithub
```

2. Install dependencies
```bash
npm install
```

3. Install additional required packages (if needed)
```bash
npm install react-native-webview
```

## Running the App

### Option 1: Expo Go (Recommended for Quick Testing)
Start the Expo development server:
```bash
npm start
# or
npx expo start
```
Then scan the QR code with:
- **Android**: Expo Go app from Play Store
- **iOS**: Expo Go app from App Store

### Option 2: Android Emulator/Device
```bash
npm run android
# or
npx expo start --android
```
*Requires Android Studio and Android SDK installed*

### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
# or
npx expo start --ios
```
*Requires Xcode installed*

### Option 4: Web Browser
```bash
npm run web
# or
npx expo start --web
```
*Opens the app in your default web browser*

### Option 5: Development with Tunnel
```bash
npx expo start --tunnel
```
*Useful when on different networks*

## Build Commands

### Build for Android
```bash
npx expo build:android
```

### Build for iOS
```bash
npx expo build:ios
```

### Create Production Build
```bash
eas build --platform android
eas build --platform ios
```
*Requires EAS CLI: `npm install -g eas-cli`*

## Troubleshooting

If you encounter any issues:
1. Clear the cache: `npx expo start -c`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Make sure all prerequisites are properly installed
4. Check that your device/emulator is properly connected

---

For more information, visit the [Expo Documentation](https://docs.expo.dev/)
