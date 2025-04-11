import { render, screen } from '@testing-library/react-native';
import { EditProfile } from '@/components/profile/EditProfile';

describe('<EditProfile/>', () => {
  const defaultProps = {
    displayName: 'Scott Banazone'
  };

  test('shows the display name, profile picture, and action buttons', () => {
    render(<EditProfile {...defaultProps} />);
    expect(screen.getByText('Scott Banazone')).toBeVisible();
    expect(screen.getByText('Edit Display Name')).toBeVisible();
    expect(screen.getByText('Choose Profile Picture')).toBeVisible();
    expect(screen.getByTestId('profile-image')).toBeVisible();
  });
});
