export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("EN-US").format(digit);
};
