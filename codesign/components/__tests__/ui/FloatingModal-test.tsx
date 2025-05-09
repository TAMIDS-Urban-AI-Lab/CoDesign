import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { FloatingModal } from '@/components/ui/FloatingModal';

describe('<FloatingModal />', () => {
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    render(
      <FloatingModal closeModal={mockCloseModal}>
        <></>
      </FloatingModal>
    );

    const modal = screen.getByTestId('floating-modal');
    expect(modal).toBeVisible();
  });

  test('renders children correctly', () => {
    const testText = 'Test Content';
    render(
      <FloatingModal closeModal={mockCloseModal}>{testText}</FloatingModal>
    );

    const content = screen.getByTestId('modal-content');
    expect(content).toHaveTextContent(testText);
  });

  test('calls closeModal when background is pressed', () => {
    render(
      <FloatingModal closeModal={mockCloseModal}>
        <></>
      </FloatingModal>
    );

    const background = screen.getByTestId('modal-background');
    fireEvent.press(background);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles to modal container', () => {
    render(
      <FloatingModal closeModal={mockCloseModal}>
        <></>
      </FloatingModal>
    );

    const container = screen.getByTestId('modal-background');
    expect(container).toHaveStyle({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    });
  });

  test('applies correct styles to modal content', () => {
    render(
      <FloatingModal closeModal={mockCloseModal}>
        <></>
      </FloatingModal>
    );

    const content = screen.getByTestId('modal-content');
    expect(content).toHaveStyle({
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 24
    });
  });
});
