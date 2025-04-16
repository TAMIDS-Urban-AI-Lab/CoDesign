export function mockReactHookForm() {
  const mockedUseForm = jest.fn(function <T>({
    defaultValues
  }: {
    defaultValues?: T;
  }) {
    const formData = defaultValues ?? ({} as T);
    type FormValues = keyof typeof formData;
    return {
      control: formData,
      handleSubmit: jest.fn(),
      setValue: jest.fn((formField: FormValues, value: any) => {
        formData[formField] = value;
      }),
      watch: jest.fn((formField: FormValues) => {
        return formData[formField];
      }),
      reset: jest.fn(),
      formState: {
        errors: {},
        isSubmitting: false,
        isValidating: false,
        isDirty: false,
        isValid: true,
        dirtyFields: {}
      }
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
    const inputValue = defaultValue ?? null;
    const onChange = jest.fn((newValue: any) => {
      control[name] = newValue;
    });
    return render({ field: { onChange, value: inputValue } });
  });

  jest.mock('react-hook-form', () => {
    const actualReactHookForm = jest.requireActual('react-hook-form');
    return {
      ...actualReactHookForm,
      useForm: mockedUseForm,
      Controller: mockedController
    };
  });

  return {
    mockedUseForm,
    mockedController
  };
}
