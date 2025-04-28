# Testing

- Unit and Component Tests
    - How to Run
    - Debugging
    - Mocking 3rd Party Libraries
- Acceptance Tests
    - Environment Setup
    - How to Run


# Unit and Component Testing
CoDesign leverages 2 testing libraries for unit and component testing: 

  - [Jest](https://jestjs.io/docs/getting-started)
  - [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)

All test files can be found in the __tests__ folder relative to the source files. For example, all component tests are in the components/__tests__/ folder and all api tests are in the api/__tests__ folder.

### How to Run
We recommend running tests in the JavaScript Debug Terminal in VSCode. A debugger process will automatically be attached. [Where to Find JavaScript Debug Terminal](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal)

To run tests, paste the following command:
```
npm run test
```

### Debugging
Once you run the command in the JavaScript Debug Terminal, you can:

- [Set breakpoints to debug](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints)
- Run only specific tests: Jest CLI will provide you a list of options, including 't' to filter by testname pattern and 'p' to filter by filename pattern

### Mocking 3rd Party Libraries
If you are testing a component that leverages a 3rd party library, you may have to mock that library and its imports. This keeps tests fast and predictable.

Example: While testing a component that leverages the '@rnmapbox/maps' library, the following mock must be set up before importing the component:

```
jest.mock('@rnmapbox/maps', () => {
    return {
      __esModule: true,
      // mocked imports should go here
      // example of a mocked Component:
      MarkerView: jest.fn()
    };
  });
```

Some mocks have already been written to be re-usable, please refer to the mocks/ folder for available mocks.

The example below mocks the expo-location library and returns references to the mocked imports:

```
export function mockExpoLocation() {
  const mockedGetCurrentPositionAsync = jest.fn()
  jest.mock('expo-location', () => {
      jest.mock('expo-location', () => {
      return {
        __esModule: true,
        requestForegroundPermissionsAsync: jest.fn(() =>
          Promise.resolve({
            status: 'granted'
          })
        ),
        getCurrentPositionAsync: mockedGetCurrentPositionAsync
      };
    });
  });

  return { mockedGetCurrentPositionAsync, requestForegroundPermissionsAsync };
}
```

Now, you can easily setup a new test with this setup function. In order to verify expected behavior, you can check if your component called the 3rd party function. Make sure to reset the mock before each test.

```
describe('component that uses expo-location', () => {
  // Mock expo-location library
  { mockedGetCurrentPositionAsync } = mockExpoLocation();

  // make sure to reset the mock before each test
  beforeEach(() => mockedGetCurrentPositionAsync.mockClear())

  test('when Example Button is pressed, it should get the current location', () => {
    ... test logic goes here...

    // Verify expected behavior
    expect(mockedGetCurrentPositionAsync).toHaveBeenCalledTimes(1);
  })
})
```

# E2E Tests

Codesign uses [Maestro](https://docs.maestro.dev/) for end-to-end testing, which uses yaml formatting. Maestro only uses the iOS simulator/android emulator for testing. Locate E2E tests in the e2e/ folder.

## Environment Setup

- Ensure to have [XCode and the iOS Simulator installed](https://docs.expo.dev/workflow/ios-simulator/)
- Download Maestro by running the following command: 
  ``` 
  curl -fsSL "https://get.maestro.mobile.dev" | bash
  ```
  For more details, refer to [Installing Maestro](https://docs.maestro.dev/getting-started/installing-maestro)
- Maestro requires a Java Runtime Environment: [Download Java 11 for Mac](https://www.oracle.com/java/technologies/downloads/?er=221886#java11-mac)
- Running `maestro` in the terminal should now successfully display maestro list of commands


# How to Run E2E Tests

  - **Pre-requisite: Build Codesign and install to Simulator** - In terminal, run `npm run sim-ios` to build and run Codesign on the iOS Simulator (device will be iPhone 15).

  - **Run Maestro test:** `maestro test e2e/create-and-view-report.yaml` Maestro run the test using the simulator that was opened in the previous step and output each step.


# Debugging
[Maestro Studio](https://docs.maestro.dev/getting-started/maestro-studio) provides helpful tools to run test commands and for debugging. Ensure to have Codesign open on the iOS Simulator, then in a separate terminal, run:
```
maestro studio
```
