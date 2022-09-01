import { IBalanceItem } from '../types/balance';
import { ICoin } from '../types/coin';
import { IToken, ITokenBalance } from '../types/token';

const decorateBalanceList = (
  items: ITokenBalance[],
  tokens: IToken[],
): IBalanceItem[] => {
  const result = items.map((item) => {
    const token = tokens.find((t) => t.address === item.mint);
    return {
      mint: item.mint,
      owner: item.owner,
      amount: item.amount,
      decimals: item.decimals,
      uiAmount: item.uiAmount,
      symbol: token?.symbol,
      name: token?.name,
      logo: token?.logo,
      address: token?.address,
    };
  });
  const validTokens = result.filter((t) => t.name);
  return validTokens;
};

const getLast24HoursChange = (price: ICoin, usdBalance) => {
  if (price.perc24HoursChange === undefined || price.perc24HoursChange === null) {
    return undefined;
  }

  const perc = price.perc24HoursChange;
  const prevBalance = (1 - perc / 100) * usdBalance;
  const usd = usdBalance - prevBalance;
  return {
    perc,
    usd,
  };
};

const decorateBalancePrices = (items: IBalanceItem[], prices: ICoin[]): IBalanceItem[] => {
  const result = items.map((item) => {
    const price = item.symbol
      ? prices.find((t: ICoin) => t.symbol.toUpperCase() === item.symbol?.toUpperCase())
      : null;
    if (!price) return item;
    const usdBalance = price.usdPrice ? item.uiAmount * price.usdPrice : undefined;
    const last24HoursChange = getLast24HoursChange(price, usdBalance);
    return {
      ...item,
      usdPrice: price?.usdPrice || undefined,
      usdBalance,
      last24HoursChange,
    };
  });
  return result;
};

export {
  decorateBalanceList,
  decorateBalancePrices,
};
