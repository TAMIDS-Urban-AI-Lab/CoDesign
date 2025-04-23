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

  test('should throw an error when min is greater than max', () => {
    const min = 10;
    const max = 5;
    expect(() => getRandomInt(min, max)).toThrow(
      'Min should be less than or equal to max'
    );
  });
});
