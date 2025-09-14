export const inSplitPaneRange = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;

  return v;
};

export function getPercentNumber(percentString: `${number}%`): number {
  return parseFloat(percentString.replace(/%/g, '').trim()) || 0;
}
