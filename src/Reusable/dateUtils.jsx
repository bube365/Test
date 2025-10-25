export const getDateRangeCategory = (selectedDate) => {
  const now = new Date();
  const date = new Date(selectedDate);

  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isSameDay) return "today";
  if (diffDays <= 7) return "last7days";
  if (
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  )
    return "thismonth";
  if (diffDays <= 90 && date.getFullYear() === now.getFullYear())
    return "last3months";

  return "older";
};

export const getDateRangeText = (rangeCategory) => {
  switch (rangeCategory) {
    case "today":
      return "for Today";
    case "last7days":
      return "for the last 7 days";
    case "thismonth":
      return "for This Month";
    case "last3months":
      return "for the last 3 months";
    default:
      return "for earlier transactions";
  }
};
