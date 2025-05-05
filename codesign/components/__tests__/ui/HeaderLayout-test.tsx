import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { HeaderLayout } from '@/components/ui/HeaderLayout';
import { Text, View } from 'react-native';

describe('HeaderLayout', () => {
  it('renders the title correctly', () => {
    render(
      <HeaderLayout title="Test Title">
        <Text>Child content</Text>
      </HeaderLayout>
    );
    expect(screen.getByText('Test Title')).toBeVisible();
  });

  it('renders children within ThemedScrollView', () => {
    render(
      <HeaderLayout title="Test Title">
        <Text>Child content</Text>
      </HeaderLayout>
    );
    const scrollView = screen.getByTestId('themed-scroll-view');
    const childText = screen.getByText('Child content');
    expect(scrollView).toContainElement(childText);
  });

  it('applies correct styles to children container', () => {
    render(
      <HeaderLayout title="Test Title">
        <Text>Child content</Text>
      </HeaderLayout>
    );
    const scrollView = screen.getByTestId('themed-scroll-view');
    expect(scrollView).toHaveStyle({
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
      padding: 24
    });
  });

  it('renders styled children correctly', () => {
    render(
      <HeaderLayout title="Test Title">
        <View testID="styled-child" style={{ padding: 8 }}>
          <Text>Child content</Text>
        </View>
      </HeaderLayout>
    );
    const styledChild = screen.getByTestId('styled-child');
    expect(styledChild).toHaveStyle({ padding: 8 });
  });

  it('applies custom styles when provided', () => {
    const customStyle = { marginTop: 20 };
    render(
      <HeaderLayout title="Test Title" style={customStyle}>
        <Text>Child content</Text>
      </HeaderLayout>
    );
    const parentView = screen.getByTestId('header-layout-container');
    expect(parentView).toHaveStyle({ marginTop: 20 });
  });

  it('disables scroll to overflow', () => {
    render(
      <HeaderLayout title="Test Title">
        <Text>Child content</Text>
      </HeaderLayout>
    );
    const scrollView = screen.getByTestId('themed-scroll-view');
    expect(scrollView.props.scrollToOverflowEnabled).toBe(false);
  });
});
