export function mockReactHookForm() {
  let formData: any;
  const mockedFormState = {
    errors: {},
    isSubmitting: false,
    isValidating: false,
    isDirty: false,
    isValid: true,
    dirtyFields: {}
  };

  const mockFormState = (newState: any) => {
    Object.keys(newState).forEach(
      (key) => (mockedFormState[key] = newState[key])
    );
  };

  const resetFormStateToDefault = () => {
    mockedFormState.errors = {};
    mockedFormState.isSubmitting = false;
    mockedFormState.isValidating = false;
    mockedFormState.isDirty = false;
    mockedFormState.isValid = true;
    mockedFormState.dirtyFields = {};
  };

  const mockFormData = (newData: any) => {
    Object.keys(newData).forEach((key) => (formData[key] = newData[key]));
  };

  const mockedUseForm = jest.fn(function <T>({
    defaultValues
  }: {
    defaultValues?: T;
  }) {
    formData = defaultValues ?? ({} as T);
    type FormValues = keyof typeof formData;

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
          formData = defaultValues;
        }
      }),
      formState: mockedFormState
    };
  });

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
    resetFormStateToDefault,
    mockFormData
  };
}
