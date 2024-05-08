export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US" /* "vi-VN" / "en-US" / "it-IT"*/, {
    style: "currency",
    currency: "USD" /* "VND" */,
  }).format(amount);
};
