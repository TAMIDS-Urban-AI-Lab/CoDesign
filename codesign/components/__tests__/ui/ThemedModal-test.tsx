import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { ThemedModal } from '@/components/ui/ThemedModal';

describe('<ThemedModal />', () => {
  test('renders with default props', () => {
    render(
      <ThemedModal testID="modal">
        <></>
      </ThemedModal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeTruthy();
    expect(modal.props.transparent).toBe(false);
    expect(modal.props.animationType).toBe('fade');
  });

  test('renders with transparent background when transparent prop is true', () => {
    render(
      <ThemedModal testID="modal" transparent={true}>
        <></>
      </ThemedModal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal.props.transparent).toBe(true);
  });

  test('renders children correctly', () => {
    render(
      <ThemedModal testID="modal">
        <View testID="child" />
      </ThemedModal>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeTruthy();
  });
});
