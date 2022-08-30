interface ICoin {
  id: string,
  symbol: string,
  name: string,
  platforms?: Record<string, string>,
  usdPrice: number | null,
  perc24HoursChange: number | null
}

interface ICoinPrice {
  usd: number,
  usd_24h_change: number,
}

export {
  ICoin,
  ICoinPrice,
};
