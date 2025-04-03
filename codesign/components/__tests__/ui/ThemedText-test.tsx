import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Typography } from '@/constants/styles/Typography';

describe('<ThemedText />', () => {
  test('renders text with no divider by default', () => {
    render(<ThemedText type={'paragraph'}>Hello!</ThemedText>);

    expect(screen.getByText('Hello!')).toBeVisible();
    expect(screen.queryAllByTestId('themed-text-divider')).toHaveLength(0);
  });

  test('renders with correct styles defined by ThemedTextType', () => {
    render(<ThemedText>Default</ThemedText>);

    // Render paragraph style by default
    const defaultElement = screen.getByText('Default');
    expect(defaultElement.props.style).toEqual(
      expect.arrayContaining([Typography.paragraph])
    );

    // Title1 style
    screen.rerender(<ThemedText type={'title1'}>title1</ThemedText>);
    const title1Element = screen.getByText('title1');
    expect(title1Element.props.style).toEqual(
      expect.arrayContaining([Typography.title1])
    );

    // Error style
    screen.rerender(<ThemedText type={'error'}>error</ThemedText>);
    const errorElement = screen.getByText('error');
    expect(errorElement.props.style).toEqual(
      expect.arrayContaining([Typography.error, { color: '#bd1206' }])
    );
  });

  test('renders with divider when withDivider flag is set', () => {
    render(
      <ThemedText type={'paragraph'} withDivider={true}>
        divider
      </ThemedText>
    );
    expect(screen.getByTestId('themed-text-divider')).toBeVisible();
  });
});
