export const formatDate = (date: Date): string => {
  const padTo2Digits = (num: number): string => num.toString().padStart(2, '0');

  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
};
