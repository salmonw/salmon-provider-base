interface IBalance {
  usdTotal: number,
  last24HoursChange: IBalancePrice,
  items: IBalanceItem[]
}

interface IBalanceItem {
  mint: string,
  owner: string,
  amount: string,
  decimals: number,
  uiAmount: number,
  symbol: string,
  name: string,
  logo: string,
  address: string,
  usdPrice: number,
  usdBalance: number,
  last24HoursChange: IBalancePrice
}

interface IBalancePrice {
  perc: number,
  usd: number
}

export {
  IBalance,
  IBalanceItem,
  IBalancePrice,
};
