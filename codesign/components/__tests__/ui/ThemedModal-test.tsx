/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { ThemedModal } from '@/components/ui/ThemedModal';
import * as ColorSchemeHook from '@/hooks/useColorScheme';

describe('<ThemedModal />', () => {
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
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('light');

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
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('dark');

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
