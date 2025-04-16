
# Getting Started with CoDesign

In this guide, you will learn how to:
- **Set up your Development Environment**
- **Prepare for your First Build**
- **When to Rebuild CoDesign**
- **Expo Development Builds: Explained**

---

## Set up your Development Environment

1. (Required) Download [XCode](https://developer.apple.com/xcode/)

    Currently, CoDesign supports only the iOS platform. This requires having a Mac with XCode installed. Once downloaded, no additional configuration is required- Expo will handle the rest!


2. Download [VSCode](https://code.visualstudio.com/) + Extensions

    When opening the project in VSCode, ensure to open the folder that has package.json in it --> CoDesign/codesign

    CoDesign configures ESLint and Prettier to enforce formatting and syntax rules. Add VSCode extensions to autoformat your code and make your life easy:
    - [ ] ESLint formatter
    - [ ] Prettier formatter

    Other useful extensions:
    - [ ] Git Blame - See history of each line
    - [ ] GitLens - Git Supercharged - Visualize git history
    - [ ] Jest - Provides tools for running jest tests


## Preparing for your First Build

Once you have cloned a copy of the repository and opened it in the IDE of your choice, you can prepare for your first build!

1. **Install Dependencies**

   In your terminal, install the project dependencies:

   ```bash
   npm install
   ```

2. **Set up Environment Variables**

    Create a `.env` file in the `/codesign` project directory (the directory where `app.config.ts` lives), and add:

    ```
    MAPBOX_ACCESS_TOKEN="your.token.here"
    USE_MIRAGE=true
    ```

    CoDesign leverages the Mapbox API for map features. You'll need to add your own Mapbox Access Token for your local build.

    - Sign up for an account at [mapbox.com](https://www.mapbox.com/)- it's free
    - Go to your account dashboard
    - Find your default public token (starts with `pk`)
    - Add it to the `MAPBOX_ACCESS_TOKEN` variable in the .env file

    Later on, if you'd like to connect CoDesign with the backend, you can update the .env file to the following:
    ```
    MAPBOX_ACCESS_TOKEN="your.token.here"
    USE_MIRAGE=false
    BASE_URL="backend.url.here"
    ```

3. **Build CoDesign**

    To build and launch the app, run:

    ```bash
    npm run ios
    ```

    You’ll be prompted to choose a device.
     1. Physical Device: Connect a physical iOS device to your laptop to select it from the menu. (Also See: How to Trust Codesign on your Phone)
     2. Simulator: You may launch CoDesign in a Simulator.


    Once selected,
    - Expo will build and launch Codesign automatically
    - Fast Refresh will be enabled, so code changes will reflect instantly


### How to Trust CoDesign on your Phone (iOS)

When CoDesign is built with XCode, it is automatically signed by your own development profile. After CoDesign launches on your phone, your phone will not trust the development profile by default.


1. Trust your Development Profile
   Go to:
   `Settings > General > VPN & Device Management > {Your Development Profile} > Trust`

2. Enable Local Network Access
   When launching CoDesign, grant permission to access the local network.



## When to Rebuild CoDesign

Since Fast Refresh is enabled, Codesign will reload with the latest TypeScript changes to the app.

Since assets and libraries need to be linked to the app at compile time, you'll need to run a clean rebuild any time you:
- Add new images, fonts, or other assets
- Install or link new libraries


```bash
npm run clean-ios // required- cleans cached assets
npm run ios
```


## Expo Development Builds: Explained

CoDesign uses the [Expo development build system](https://docs.expo.dev/develop/development-builds/introduction/), which enables full native module support and a custom runtime.

Other available options and resources:

- [Expo Go](https://expo.dev/go): For lightweight sandbox testing (note: limited functionality)
- [Android emulator setup](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator setup](https://docs.expo.dev/workflow/ios-simulator/)

### Further Resources

- [Expo documentation](https://docs.expo.dev/)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Expo GitHub](https://github.com/expo/expo)
- [Expo Discord Community](https://chat.expo.dev)
