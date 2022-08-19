import { getPricesByPlatform, SOLANA_PLATFORM, NEAR_PLATFORM } from '../src/services/price-service';

test('price-get-solana-prices', async () => {
  const prices = await getPricesByPlatform(SOLANA_PLATFORM);
  expect(prices.length).toBeGreaterThan(0);
});

test('price-get-near-prices', async () => {
  const prices = await getPricesByPlatform(NEAR_PLATFORM);
  expect(prices.length).toBeGreaterThan(0);
});
