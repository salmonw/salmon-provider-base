import axios from 'axios';

const BASE_ENDPOINT = 'https://api.coingecko.com';
const COINS_ENDPOINT = `${BASE_ENDPOINT}/api/v3/coins/list?include_platform=true`;
const PRICE_ENDPOINT = `${BASE_ENDPOINT}/api/v3/simple/price`;

const SOLANA_PLATFORM = 'solana';
const NEAR_PLATFORM = 'near-protocol';

function chunkArray(array, size) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
}
const joinCoins = (coins) => {
  const ids = coins.map((c) => c.id);
  const chunks = chunkArray(ids, 200);
  const commaCoins = chunks.map((chunk) => ({ coins: chunk.join(',') }));
  return commaCoins;
};

const fetchPrices = async (coinsGroups) => {
  const prices = await Promise.all(
    coinsGroups.map(async (group) => {
      const result = await axios.get(
        `${PRICE_ENDPOINT}?ids=${group.coins}&vs_currencies=usd&include_24hr_change=true`
      );
      return result.data;
    }),
  );
  return prices;
};

const joinArray = (array) => {
  const result = [];
  array.forEach((items) => {
    Object.keys(items).forEach((id) => {
      result[id] = items[id];
    });
  });
  return result;
};

const decorate = (coins, prices) => coins.map((coin) => {
  const { id, symbol, name } = coin;
  const usdPrice = prices[id].usd;
  const perc24HoursChange = prices[id].usd_24h_change;
  return {
    id,
    symbol,
    name,
    usdPrice: usdPrice || null,
    perc24HoursChange: perc24HoursChange || null,
  };
});

const getCoinsByPlatform = async (platform) => {
  const response = await axios.get(COINS_ENDPOINT);
  const coins = response.data.filter((c) => c.platforms[platform]);
  return coins;
};

const getPrices = async (coins) => {
  const coinsGroups = joinCoins(coins);
  const pricesGroups = await fetchPrices(coinsGroups);
  const prices = joinArray(pricesGroups);
  const coinsWithPrice = decorate(coins, prices);
  return coinsWithPrice;
};

const getPricesByPlatform = async (platform) => {
  const coins = await getCoinsByPlatform(platform);
  return getPrices(coins);
};

const getCoinsByIds = async (ids) => {
  const response = await axios.get(`${COINS_ENDPOINT}&ids=${(ids || []).join(',')}`);
  const coins = response.data;
  return coins;
};

const getPricesByIds = async (ids) => {
  const coins = await getCoinsByIds(ids);
  return getPrices(coins);
};

export {
  getPricesByPlatform,
  getPricesByIds,
  SOLANA_PLATFORM,
  NEAR_PLATFORM,
};
