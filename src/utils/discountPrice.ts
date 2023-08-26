export const discountPrice = (
  price: number | string,
  discount: number | string,
): string => {
  const result = Number(price) * 0.01 * Number(discount);
  return String(result);
};
