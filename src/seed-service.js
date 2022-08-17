const bip39 = require('bip39');
const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');
const coinTypes = require('../constants/coin-types');

async function generateMnemonicAndSeed(strength = 128) {
  const mnemonic = bip39.generateMnemonic(strength);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return { mnemonic, seed: Buffer.from(seed).toString('hex') };
}

async function mnemonicToSeed(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid seed words');
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return Buffer.from(seed).toString('hex');
}

function generatePath(coinType, index) {
  let path = `m/44'/${coinType}'/${index}'`;
  if (coinType === coinTypes.SOL) {
    path += "/0'";
  }
  return path;
}

function generateKeyPairByIndex(seed, coinType, index) {
  const path = generatePath(coinType, index);
  const keyPair = Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
  return { path, index, keyPair };
}

function generateFirstKeyPair(mnemonic, coinType) {
  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  return generateKeyPairByIndex(seed, coinType, 0);
}

function generateDerivedKeyPairs(mnemonic, coinType, count) {
  const derivedKeys = [];
  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  for (let i = 0; i < count; i++) {
    const { path, index, keyPair } = generateKeyPairByIndex(seed, coinType, i);
    derivedKeys.push({ path, index, keyPair });
  }
  return derivedKeys;
}

module.exports = {
  generateMnemonicAndSeed,
  mnemonicToSeed,
  generateFirstKeyPair,
  generateDerivedKeyPairs,
};
