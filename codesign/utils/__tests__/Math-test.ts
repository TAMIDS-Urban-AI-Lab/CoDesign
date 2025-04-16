import { getRandomInt } from '../Math';

describe('getRandomInt()', () => {
  test('should return a number within the specified range', () => {
    const min = 1;
    const max = 10;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  });

  test('should return the same number when min and max are equal', () => {
    const min = 5;
    const max = 5;
    const result = getRandomInt(min, max);
    expect(result).toBe(5);
  });
});
