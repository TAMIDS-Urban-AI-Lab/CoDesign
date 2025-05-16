/**
 * Mock implementation for react-hook-form library
 * Provides test utilities for form handling with customizable state and behavior
 */

export function mockReactHookForm() {
  // Mock form data getter
  const getMockedForm = jest.fn().mockReturnValue({});
  let isFormMocked = false;

  /** Sets custom form data for testing */
  const mockFormData = (mockData: any) => {
    getMockedForm.mockReturnValueOnce(mockData);
    isFormMocked = true;
  };

  /** Default form state values */
  const mockedFormState = {
    errors: {},
    isSubmitting: false,
    isValidating: false,
    isDirty: false,
    isValid: true,
    dirtyFields: {}
  };

  /** Updates form state with new values */
  const mockFormState = (newState: any) => {
    Object.keys(newState).forEach(
      (key) => (mockedFormState[key] = newState[key])
    );
  };

  /** Resets form state to initial values */
  const resetFormToDefault = () => {
    mockedFormState.errors = {};
    mockedFormState.isSubmitting = false;
    mockedFormState.isValidating = false;
    mockedFormState.isDirty = false;
    mockedFormState.isValid = true;
    mockedFormState.dirtyFields = {};
    isFormMocked = false;
  };

  /** Mock implementation of useForm hook */
  const mockedUseForm = jest.fn(function <T>({
    defaultValues
  }: {
    defaultValues: T;
  }) {
    type FormValues = keyof typeof defaultValues;
    const formData = isFormMocked
      ? { ...getMockedForm() }
      : { ...defaultValues };

    if (isFormMocked && Object.keys(formData).length === 0) {
      throw new Error(
        'Unexpected behavior. Check for leaks between tests. Ensure to call resetFormToDefault() after each test.'
      );
    }

    return {
      control: formData,
      handleSubmit: jest.fn((callbackFn: (data: T) => void) => {
        const hasErrors = Object.keys(mockedFormState.errors).length > 0;
        if (!hasErrors) {
          callbackFn(formData);
        }
      }),
      setValue: jest.fn((formField: FormValues, value: any) => {
        formData[formField] = value;
      }),
      watch: jest.fn((formField: FormValues) => {
        return formData[formField];
      }),
      reset: jest.fn((newValues?: T) => {
        if (newValues) {
          Object.keys(newValues as object).forEach((key) => {
            const formKey = key as FormValues;
            formData[formKey] = newValues[formKey];
          });
        } else {
          Object.keys(defaultValues as object).forEach((key) => {
            const formKey = key as FormValues;
            formData[formKey] = defaultValues[formKey];
          });
        }
      }),
      formState: mockedFormState
    };
  });

  /** Mock implementation of Controller component */
  const mockedController = jest.fn(function <T>({
    render,
    defaultValue,
    control,
    name
  }: {
    render: any;
    defaultValue: any;
    control: T;
    name: keyof T;
  }) {
    const inputValue = defaultValue ? control[name] : null;
    const onChange = jest.fn((newValue: any) => {
      control[name] = newValue;
    });
    return render({ field: { onChange, value: inputValue } });
  });

  jest.mock('react-hook-form', () => {
    const actualReactHookForm = jest.requireActual('react-hook-form');
    return {
      __esModule: true,
      ...actualReactHookForm,
      useForm: mockedUseForm,
      Controller: mockedController
    };
  });

  return {
    mockedUseForm,
    mockedController,
    mockFormState,
    mockFormData,
    resetFormToDefault
  };
}
