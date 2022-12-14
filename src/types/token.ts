interface IToken {
  symbol: string,
  name: string,
  decimals: number,
  logo?: string | undefined,
  address: string,
  chainId: number;
}

interface ITokenBalance {
  mint: string,
  owner: string,
  amount: number;
  decimals: number,
  uiAmount: number;
}

export {
  IToken,
  ITokenBalance,
};
