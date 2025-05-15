# Welcome to Codesign

Codesign enables students and faculty to provide feedback reports about Texas A&M's on-site facilities and eventually, use Augmented Reality to design and imagine a better community space.

## Current Features

- View all reports on a map
- Submit a new feedback report
  - Include photos from Photo Library
  - Select report location on a map

## Getting started

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Mapbox Access Key

In order to use Mapbox's API, you must sign up for a Mapbox account and configure the access key in the project:

- Create an account at [mapbox.com](https://www.mapbox.com/)
- In Mapbox Account page, there will be a default public token (starts with 'pk')
- Create a .env file in /codesign project folder (the folder that contains the app.config.ts file) and add the following line:

```
MAPBOX_ACCESS_TOKEN="your.token.here"
```

### 3. Build and Run the App (iOS)

```bash
 npm run ios
```

What happens next?

- You'll see a prompt to select a device (either an iOS Simulator or a physical device).
- Once selected, Expo will build Codesign and launch it on the device.
- Fast Refresh will be enabled, so any code changes you make will immediately reflect in the app.

### 4. Set up Physical Device (iOS)

- Trust your Development Profile
  - Go to `Settings > General > VPN & Device Management > {Development Profile} > Select 'Trust' option`
- Enable Local Network Access
  - When opening Codesign, select `Allow device to access Local Network`

### 5. Adding new Dependencies or Assets

When you add images, fonts, or install new dependencies (e.g., a new library), you need to create a new build. Follow these steps:

```bash
   npm run clean-ios // Clean cached files
   npm run ios // Rebuild the iOS app
```

# Expo Resources

Options for running the app:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/) <- Used by Codesign
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- [Info on Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Info on iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
