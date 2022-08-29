import { INetwork, INetworkConfigItem } from './types/config';

abstract class Account<KP, PK, CN> {
  private mnemonic: string;

  private keyPair: KP;

  connection?: CN;

  path: string;

  index: number;

  publicKey: PK;

  networkId: string;

  chain: string;

  constructor(mnemonic: string, keyPair: KP, path: string, index: number, networkId: string) {
    this.setSeedPhrase(mnemonic);
    this.setKeyPair(keyPair);
    this.setPublicKey(keyPair);
    this.path = path;
    this.index = index;
    this.networkId = networkId;
  }

  setSeedPhrase(mnemonic: string): void {
    this.mnemonic = mnemonic;
  }

  setKeyPair(keyPair: KP): void {
    this.keyPair = keyPair;
  }
  abstract setPublicKey(publicKey: KP): void;

  retrieveSecureSeedPhrase(): string {
    return this.mnemonic;
  }

  retrieveSecureKeyPair(): KP {
    return this.keyPair;
  }

  abstract getConnection(): Promise<CN>;
  abstract getTokens(): Promise<object[]>;
  abstract getBalance(): Promise<object>;
  abstract getReceiveAddress(): string;
  abstract validateDestinationAccount(address: string): Promise<object>;
  abstract transfer(
    destination: string,
    token: string,
    amount: number
  ): Promise<string>;
  abstract airdrop(amount: number): Promise<object>;
  abstract getAllNfts(): Promise<object[]>;
  abstract getAllNftsGrouped(): Promise<object[]>;
  abstract getBestSwapQuote(
    nToken: string,
    outToken: string,
    amount: number,
    slippage: number
  ): Promise<object>;
  abstract executeSwapTransaction(routeId: string): Promise<object>;
  abstract createSwapTransaction(transactionId: string): Promise<string>;
  abstract setNetwork(networkId: string): void;
  static getNetworks(): Promise<INetwork[]> {
    throw new Error('not implemented!');
  }

  abstract getCurrentNetwork(): Promise<INetworkConfigItem>;
  abstract getChain(): string;
  abstract getRecentTransactions(lastSignature: string): Promise<object[]>;
  static restoreAccount(mnemonic: string, networkId: string) {
    throw new Error('not implemented!');
  }

  static restoreDerivedAccounts(
    mnemonic: string,
    networkId: string,
  ) {
    throw new Error('not implemented!');
  }
}

export { Account };
