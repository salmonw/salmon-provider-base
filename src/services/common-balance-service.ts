import { IBalanceItem } from '../types/balance';

const getPreviousTokenBalance = (balance : IBalanceItem): number | null => {
  const { usdBalance, last24HoursChange } = balance;
  if (!usdBalance || !last24HoursChange?.perc) return null;
  const percentage = last24HoursChange?.perc || 0;
  const tokenBalance = usdBalance / (1 - percentage / 100) || 0;
  return tokenBalance;
};

const getPreviousTotal = (balances: IBalanceItem[]) => {
  const total = balances.reduce((
    currentValue,
    next,
  ) => {
    const previousTokenBalance = getPreviousTokenBalance(next) || 0;
    return previousTokenBalance + currentValue;
  }, 0);
  return total;
};

const getLast24HoursChange = (balances: IBalanceItem[], usdTotal: number) => {
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
