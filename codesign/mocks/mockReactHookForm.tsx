export function mockReactHookForm() {
  const mockedFormData: any = {};
  let isFormMocked = false;
  const mockFormData = (newData: any) => {
    Object.keys(newData).forEach((key) => (mockedFormData[key] = newData[key]));
    isFormMocked = true;
  };

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

  const resetFormToDefault = () => {
    mockedFormState.errors = {};
    mockedFormState.isSubmitting = false;
    mockedFormState.isValidating = false;
    mockedFormState.isDirty = false;
    mockedFormState.isValid = true;
    mockedFormState.dirtyFields = {};
    Object.keys(mockedFormData).forEach((key) => {
      delete mockedFormData[key];
    });
    isFormMocked = false;
  };

  const mockedUseForm = jest.fn(function <T>({
    defaultValues
  }: {
    defaultValues: T;
  }) {
    type FormValues = keyof typeof defaultValues;
    const formData = isFormMocked
      ? { ...mockedFormData }
      : { ...defaultValues };

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
