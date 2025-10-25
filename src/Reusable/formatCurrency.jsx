// export const formatCurrency = (value) => {
//   if (!value && value !== 0) return "USD 0.00";
//   return `USD ${Number(value).toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

//  const formatAmount = (amount) => {
//     return `USD ${Math.abs(amount).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

export const formatAmount = (value, options = { absolute: false }) => {
  if (!value && value !== 0) return "USD 0.00";
  const amount = options.absolute ? Math.abs(value) : Number(value);
  return `USD ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
