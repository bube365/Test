export const formatCurrency = (value) => {
  if (!value && value !== 0) return "USD 0.00";
  return `USD ${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
