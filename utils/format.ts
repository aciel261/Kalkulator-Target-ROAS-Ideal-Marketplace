
export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};
