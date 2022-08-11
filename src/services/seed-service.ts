import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import { COIN_TYPE_SOL } from '../constants/coin-types';

interface KeyInfo {
  path: string,
  index: number,
  keyPair: Keypair
}

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
  if (coinType === COIN_TYPE_SOL) {
    path += "/0'";
  }
  return path;
}

function generateKeyPairByIndex(seed, coinType, index): KeyInfo {
  const path = generatePath(coinType, index);
  const keyPair = Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
  return { path, index, keyPair };
}

function generateFirstKeyPair(mnemonic, coinType): KeyInfo {
  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  return generateKeyPairByIndex(seed, coinType, 0);
}

function generateDerivedKeyPairs(mnemonic, coinType, count) : KeyInfo[] {
  const derivedKeys = [];
  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  for (let i: number = 0; i < count; i += 1) {
    const { path, index, keyPair } = generateKeyPairByIndex(seed, coinType, i);
    derivedKeys.push({ path, index, keyPair });
  }
  return derivedKeys;
}

export {
  generateMnemonicAndSeed,
  mnemonicToSeed,
  generateFirstKeyPair,
  generateDerivedKeyPairs,
  KeyInfo,
};
