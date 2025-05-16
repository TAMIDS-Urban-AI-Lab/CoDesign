
# Getting Started with CoDesign

In this guide, you will learn how to:
- **Set up your Development Environment**
- **Prepare for your First Build**
- **When to Rebuild CoDesign**
- **Prepare for Your First PR**
- **Expo Development Builds: Explained**

---

## Set up your Development Environment

1. (Required) Download [XCode](https://developer.apple.com/xcode/)

    Currently, CoDesign supports only the iOS platform. iOS development requires having a Mac with XCode installed. Once downloaded, no additional configuration is required- Expo will handle the rest!


2. Set up IDE + Extensions

    Recommended IDEs and Code Editors:

    -  [VSCode](https://code.visualstudio.com/) with [Github Copilot](https://code.visualstudio.com/docs/copilot/setup)
    -  [Cursor AI Code Editor](https://www.cursor.com/)
    - [WebStorm](https://www.jetbrains.com/webstorm/) IDE by JetBrains. 

    When opening the project in your IDE, ensure to open the `CoDesign/codesign/` folder that has package.json in it. Otherwise, you will see the following error from ESLint:
    ```
    Unable to resolve path to module '@/hooks/useColorScheme'
    .eslint import/no-unresolved
    ```

    CoDesign configures ESLint and Prettier to enforce formatting and syntax rules. Add VSCode extensions to autoformat your code and make your life easy:
    - [ ] ESLint formatter
    - [ ] Prettier formatter

    Other useful extensions:
    - [ ] Set up [Github Copilot](https://code.visualstudio.com/docs/copilot/setup) or configure your AI tool of choice
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

    To build and launch the app to the iOS simulator, run:

    ```bash
    npm run ios
    ```

### Building CoDesign to a Physical Device
1. Connect your iOS Device to your computer by wire.
2. Run `npx expo run:ios --device`.
3. A menu with available devices will appear. Your device should appear on this list.
4. Select your device from the menu.
5. Once selected,
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

## Prepare for your first PR
Congrats! You've built CoDesign and want to make some code changes.

### Branching Strategy
Before doing anything, always ensure you have the latest version of main using `git pull --rebase`.

Your branch name should follow the format: username/feature-name

Example:

```
git checkout main
git pull --rebase
git checkout -b example-user/my-awesome-feature
```
### Commit Best Practices
#### Code Formatting
Before committing, ensure that your changes follow lint and style rules by running `npm run lint`.

Even better, you can have your editor automate formatting for you. For example, VSCode provides many extensions to auto-format ESLint and Prettier rules.

#### Commit Message
Please read the following to understand best practices for commit messages:
[Good Commit Vs Bad Commit Practices](https://dev.to/sheraz4194/good-commit-vs-bad-commit-best-practices-for-git-1plc)

### Creating a PR
Once you create a PR, fill out all the requirements in the PR template, including:
- Summary
- Description
- Testing

All PRs with changes to business logic MUST include details about what was tested!

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
