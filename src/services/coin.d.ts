interface ICoin {
  id: string,
  symbol: string,
  name: string,
  platforms?: Record<string, string>,
  usdPrice: number,
  perc24HoursChange: number
}

interface ICoinPrice {
  usd: number,
  usd_24h_change: number,
}

export {
  ICoin,
  ICoinPrice,
};
