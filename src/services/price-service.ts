import axios from 'axios';
import { ICoin, ICoinPrice } from '../types/coin';

const BASE_ENDPOINT = 'https://api.coingecko.com';
const COINS_ENDPOINT = `${BASE_ENDPOINT}/api/v3/coins/list?include_platform=true`;
const PRICE_ENDPOINT = `${BASE_ENDPOINT}/api/v3/simple/price`;

const SOLANA_PLATFORM = 'solana';
const NEAR_PLATFORM = 'near-protocol';

function chunkArray(array: string[], size: number): string[][] {
  const results: string[][] = [];
  while (array.length > 0) {
    results.push(array.splice(0, size));
  }
  return results;
}
const joinCoins = (coins: ICoin[]): string[] => {
  const ids: string[] = coins.map((c: ICoin) => c.id);
  const chunks: string[][] = chunkArray(ids, 200);
  const commaCoins: string[] = chunks.map((chunk: string[]) => (chunk.join(',')));
  return commaCoins;
};

const fetchPrices = async (coinsGroups: string[]): Promise<ICoinPrice[]> => {
  const prices = await Promise.all(
    coinsGroups.map(async (group) => {
      const result = await axios.get<ICoinPrice>(
        `${PRICE_ENDPOINT}?ids=${group}&vs_currencies=usd&include_24hr_change=true`,
      );
      return result.data;
    }),
  );
  return prices;
};

const joinArray = (array: ICoinPrice[]): ICoinPrice[] => {
  const result: ICoinPrice[] = [];
  array.forEach((items) => {
    Object.keys(items).forEach((id) => {
      result[id] = items[id];
    });
  });
  return result;
};

const decorate = (coins: ICoin[], prices: ICoinPrice[]) => coins.map((coin): ICoin => {
  const { id, symbol, name } = coin;
  const coinPrice :ICoinPrice = prices[id];
  const usdPrice = coinPrice.usd;
  const perc24HoursChange = coinPrice.usd_24h_change;
  return {
    id,
    symbol,
    name,
    usdPrice: usdPrice || null,
    perc24HoursChange: perc24HoursChange || null,
  };
});

const getCoinsByPlatform = async (platform: string):Promise<ICoin[]> => {
  const response = await axios.get<ICoin[]>(COINS_ENDPOINT);
  const coins = response.data.filter((c:ICoin) => c.platforms[platform]);
  return coins;
};

const getPrices = async (coins: ICoin[]) :Promise<ICoin[]> => {
  const coinsGroups = joinCoins(coins);
  const pricesGroups: ICoinPrice[] = await fetchPrices(coinsGroups);
  const prices = joinArray(pricesGroups);
  const coinsWithPrice = decorate(coins, prices);
  return coinsWithPrice;
};

const getPricesByPlatform = async (platform: string):Promise<ICoin[]> => {
  const coins = await getCoinsByPlatform(platform);
  return getPrices(coins);
};

const getCoinsByIds = async (ids: string[]): Promise<ICoin[]> => {
  const response = await axios.get<ICoin[]>(`${COINS_ENDPOINT}&ids=${(ids).join(',')}`);
  const coins = response.data;
  return coins;
};

const getPricesByIds = async (ids: string[]): Promise<ICoin[]> => {
  const coins = await getCoinsByIds(ids);
  return getPrices(coins);
};

export {
  getPricesByPlatform,
  getPricesByIds,
  SOLANA_PLATFORM,
  NEAR_PLATFORM,
};
