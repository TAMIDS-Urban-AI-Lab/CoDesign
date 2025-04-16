/**
 *
 * @param min inclusive minimum value
 * @param max non-inclusive maximum value
 * @returns a number in the range [min, max)
 *
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
