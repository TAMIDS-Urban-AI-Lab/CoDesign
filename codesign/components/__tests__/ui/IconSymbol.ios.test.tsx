import { render, screen } from '@testing-library/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';

describe('IconSymbol', () => {
  it('renders correctly with default props', () => {
    render(<IconSymbol name="star.fill" color="#000000" />);
    const symbolElement = screen.getByTestId('icon-symbol');
    expect(symbolElement).toBeTruthy();
  });

  it('applies custom size', () => {
    const customSize = 32;
    render(<IconSymbol name="star.fill" color="#000000" size={customSize} />);
    const symbolElement = screen.getByTestId('icon-symbol');
    expect(symbolElement.props.style).toEqual([
      { width: 24, height: 24 },
      [{ width: customSize, height: customSize }, undefined]
    ]);
  });

  it('applies custom weight', () => {
    render(<IconSymbol name="star.fill" color="#000000" weight="bold" />);
    const symbolElement = screen.getByTestId('icon-symbol');
    expect(symbolElement.props.weight).toBe('bold');
  });

  it('applies custom color', () => {
    const customColor = '#FF0000';
    render(<IconSymbol name="star.fill" color={customColor} />);
    const symbolElement = screen.getByTestId('icon-symbol');
    expect(symbolElement.props.tintColor).toBe(customColor);
  });

  it('applies custom style', () => {
    const customStyle = { margin: 10 };
    render(<IconSymbol name="star.fill" color="#000000" style={customStyle} />);
    const symbolElement = screen.getByTestId('icon-symbol');
    expect(symbolElement.props.style).toEqual([
      { width: 24, height: 24 },
      [{ width: 24, height: 24 }, customStyle]
    ]);
  });
});
