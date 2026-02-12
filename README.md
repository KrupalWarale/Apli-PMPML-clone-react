# PMPML App Clone

A React Native clone of the Apli PMPML (Pune Mahanagar Parivahan Mahamandal Limited) mobile application for educational and demonstration purposes.

## 📱 About

This is a UI/UX clone of the official PMPML bus service app, recreated using React Native. The project demonstrates modern mobile app development practices and design implementation.

## ✨ Features

- **Home Screen** - Main dashboard with service options
- **Bus Ticket Booking** - Interactive ticket purchase interface
- **Daily Pass** - Day pass booking functionality
- **Pass Management** - View and manage active passes
- **Bus Routes** - Interactive map showing bus locations
- **Profile** - User profile and app settings
- **Notifications** - Stay updated with service alerts

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build toolchain
- **React Navigation** - Navigation management
- **Leaflet** - Interactive maps

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

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

### Running the App

#### Option 1: Expo Go (Recommended for Quick Testing)
Start the Expo development server:
```bash
npm start
# or
npx expo start
```
Then scan the QR code with:
- **Android**: Expo Go app from Play Store
- **iOS**: Expo Go app from App Store

#### Option 2: Android Emulator/Device
```bash
npm run android
# or
npx expo start --android
```
*Requires Android Studio and Android SDK installed*

#### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
# or
npx expo start --ios
```
*Requires Xcode installed*

#### Option 4: Web Browser
```bash
npm run web
# or
npx expo start --web
```
*Opens the app in your default web browser*

#### Option 5: Development with Tunnel
```bash
npx expo start --tunnel
```
*Useful when on different networks*

### Build Commands

#### Build for Android
```bash
npx expo build:android
```

#### Build for iOS
```bash
npx expo build:ios
```

#### Create Production Build
```bash
eas build --platform android
eas build --platform ios
```
*Requires EAS CLI: `npm install -g eas-cli`*

## 📂 Project Structure

```
PMPMLGithub/
├── App.js                 # Main application component
├── PassScreen.js          # Daily pass display
├── BusTicketScreen.js     # Ticket booking interface
├── DailyPassScreen.js     # Daily pass purchase
├── BusesScreen.js         # Bus routes and map
├── ProfileScreen.js       # User profile
├── NotificationScreen.js  # Notifications
├── TicketsScreen.js       # Ticket history
├── AllPassesScreen.js     # All passes view
├── ViewTicketScreen.js    # Individual ticket view
├── BottomFooter.js        # Navigation footer
├── FAQScreen.js           # FAQ section
└── assets/                # Images and icons
```

## ⚠️ Disclaimer

**IMPORTANT:** This project is created for **educational and demonstration purposes only**.

- This is **NOT** an official PMPML application
- **DO NOT** use this app for actual ticket purchases or bus services
- **DO NOT** use this for any illegal or unauthorized activities
- All payment integrations are **UI mockups only** and non-functional
- For official PMPML services, please use the official Apli PMPML app

This clone is intended to showcase React Native development skills and UI/UX implementation. It does not connect to any real payment gateways or PMPML backend services.

## 📄 License

This project is for educational purposes only. All rights to the PMPML brand, logo, and official app belong to Pune Mahanagar Parivahan Mahamandal Limited.

## 🙏 Acknowledgments

- Original design and concept by PMPML
- Built with React Native and Expo
- UI/UX inspired by the official Apli PMPML app

---

**Note:** If you are from PMPML and have concerns about this educational project, please contact me and I will take appropriate action.

## 📧 Contact Me

Interested in working together or have a project in mind? Feel free to reach out!

**For Work & Collaboration:**  
📩 [androexpertkrupal@gmail.com](mailto:androexpertkrupal@gmail.com)

I'm available for:
- web projects 
- Engeneering projects (software)
- React Native development projects
- Mobile app development (Android/iOS)
- UI/UX implementation
- Freelance work and consulting

Let's build something amazing together! 🚀
