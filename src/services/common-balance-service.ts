const getPreviousTokenBalance = (balance: any) => {
  const { usdBalance, last24HoursChange } = balance;
  const percentage = last24HoursChange.perc || 0;
  const tokenBalance = usdBalance / (1 - percentage / 100) || 0;
  return tokenBalance;
};

const getPreviousTotal = (balances) => {
  const total = balances.reduce((
    currentValue,
    next,
  ) => getPreviousTokenBalance(next) + currentValue, 0);
  return total;
};

const getLast24HoursChange = (balances, usdTotal) => {
  const prevUsdTotal = getPreviousTotal(balances);
  const usd24HoursChange = usdTotal - prevUsdTotal;
  const perc24HoursChange = (usd24HoursChange * 100) / prevUsdTotal;
  return {
    usd: usd24HoursChange,
    perc: perc24HoursChange,
  };
};

export {
  getLast24HoursChange,
  getPreviousTotal,
  getPreviousTokenBalance,
};
