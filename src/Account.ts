export abstract class Account {

    private mnemonic : string;
    private keyPair : any;
    connection?: any;
    path : string;
    index : number;
    publicKey : any;
    networkId : string;
    chain : string;

    setSeedPhrase(mnemonic) {
        this.mnemonic = mnemonic;
    }

    setKeyPair(keyPair) {
        this.keyPair = keyPair;
        this.publicKey = keyPair.publicKey;
    }

    retrieveSecureSeedPhrase() {
        return this.mnemonic;
    }

    retrieveSecureKeyPair() {
        return this.keyPair;
    }
 
    abstract getConnection() : Promise<any>;
    abstract getTokens() : Promise<object[]>;
    abstract getBalance() : Promise<object>;
    abstract getReceiveAddress () : string;
    abstract getOrCreateTokenAccount (toPublicKey: object, token: string) : Promise<object>;
    abstract validateDestinationAccount (address: string) : Promise<object>;
    abstract transfer (destination: string, token: string, amount: number, opts: object) : Promise<object>;
    abstract airdrop (amount: number) : Promise<object>;
    abstract getAllNfts () : Promise<object[]>;
    abstract getAllNftsGrouped () : Promise<object[]>;
    abstract getBestSwapQuote (inToken: string, outToken: string, amount: number, slippage: number) : Promise<object>;
    abstract executeSwapTransaction (routeId : string) : Promise<object>;
    abstract createSwapTransaction (transactionId : string) : Promise<object>;    
    abstract setNetwork (networkId : string) : void;
    abstract getNetworks () : Promise<object[]>;
    abstract getCurrentNetwork () : Promise<object>;
    abstract getChain () : string;
    abstract getDomainFromPublicKey (publicKey: object) : Promise<string>;
    abstract getPublicKeyFromDomain (domain: string) : Promise<object>;  
    abstract getRecentTransactions (lastSignature : string) : Promise<object[]>;
}
