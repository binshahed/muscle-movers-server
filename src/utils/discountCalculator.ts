export const discountCalculator = (
  price: number,
  discountPercentage: number,
) => {
  return Number(((price * (100 - discountPercentage)) / 100).toFixed(2));
};
