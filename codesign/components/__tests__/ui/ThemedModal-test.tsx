/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { mockUseColorScheme } from '@/mocks/mockUseColorScheme';

describe('<ThemedModal />', () => {
  const { mockedUseColorScheme } = mockUseColorScheme();
  const { ThemedModal } = require('@/components/ui/ThemedModal');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(
      <ThemedModal testID="modal">
        <></>
      </ThemedModal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeVisible();
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
    expect(child).toBeVisible();
  });

  test('applies light color in light theme', () => {
    mockedUseColorScheme.mockReturnValue('light');
    const lightColor = '#ffffff';
    const darkColor = '#000000';

    render(
      <ThemedModal testID="modal" lightColor={lightColor} darkColor={darkColor}>
        <></>
      </ThemedModal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: lightColor }])
    );
  });

  test('applies dark color in dark theme', () => {
    mockedUseColorScheme.mockReturnValue('dark');
    const lightColor = '#ffffff';
    const darkColor = '#000000';

    render(
      <ThemedModal testID="modal" lightColor={lightColor} darkColor={darkColor}>
        <></>
      </ThemedModal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: darkColor }])
    );
  });
});
