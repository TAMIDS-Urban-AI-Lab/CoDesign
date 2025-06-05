import { render, screen } from '@testing-library/react-native';

import { SuggestionUpload } from '@/components/report/SuggestionUpload';

describe('<SuggestionUpload />', () => {
  test('renders suggestion upload with message and button', () => {
    // When view the Suggestion Upload component
    render(<SuggestionUpload onChange={jest.fn()} value={''} />);

    // Then show the suggestion message
    expect(
      screen.getByText('Would you like to suggest an improvement?')
    ).toBeVisible();

    // and show the SUGGEST button
    expect(screen.getByText('SUGGEST')).toBeVisible();

    // and show the sparkles image
    expect(screen.getByTestId('suggestion-sparkles-image')).toBeVisible();
  });
});
