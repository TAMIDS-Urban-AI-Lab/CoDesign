import { render, screen } from '@testing-library/react-native';

import { mockRNWebView } from '@/mocks/mockWebView';
import { ModalProvider } from '@/components/provider/ModalProvider';

describe('<SuggestionUpload />', () => {
  const { mockWebView } = mockRNWebView();

  beforeEach(() => {
    mockWebView.mockClear();
  });

  const { SuggestionUpload } = require('@/components/report/SuggestionUpload');

  test('renders suggestion upload with message and button', () => {
    // When view the Suggestion Upload component
    render(
      <ModalProvider>
        <SuggestionUpload onChange={jest.fn()} value={''} />
      </ModalProvider>
    );

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
