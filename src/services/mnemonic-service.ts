import * as bip39 from 'bip39';
import { COIN_TYPE_SOL } from '../constants/coin-types';

async function generateMnemonicAndSeed(strength = 128) {
  const mnemonic = bip39.generateMnemonic(strength);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return { mnemonic, seed: Buffer.from(seed).toString('hex') };
}

async function mnemonicToSeed(mnemonic: string): Promise<string> {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid seed words');
  }
  const seed: Buffer = await bip39.mnemonicToSeed(mnemonic);
  return Buffer.from(seed).toString('hex');
}

function generatePath(coinType: number, index: number) {
  let path = `m/44'/${coinType}'/${index}'`;
  if (coinType === COIN_TYPE_SOL) {
    path += "/0'";
  }
  return path;
}

export {
  generateMnemonicAndSeed,
  mnemonicToSeed,
  generatePath,
};
