# Testing

- Unit and Component Testing
    - Running Tests
    - Debugging Tests
    - Mocking 3rd Party Libraries

## Unit and Component Testing
CoDesign leverages 2 testing libraries: Jest and React Native Testing Library.

### Running tests
We recommend running tests in the JavaScript Debug Terminal. A debugger process will automatically be attached. [Where to Find JavaScript Debug Terminal](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal)

To run tests, paste the following command:
```
npm run test
```

### Debugging Tests
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

