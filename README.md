![Salmon logo](logo.png?raw=true)
# Provider Base

This module provides tools to implement a blockchain provider. 

For example:

- Solana - https://github.com/salmonw/salmon-provider-solana
- NEAR - https://github.com/salmonw/salmon-provider-near

---
## Table of Contents ## 

- [Instalation and usage](#instalation)
  
- [Collaborating](#collaborating)

- [Extending account](#extending-account)  

- [Account definition](#Account-definition)  

- [Common services](#common-services)  

---
## <a id="instalation"></a> Instalation and usage

### Yarn

```
$ yarn add @salmon/provider-base.js
```

### npm

```
$ npm install --save @salmon/provider-base.js
```


---
## <a id="collaborating"></a> Collaborating
---
## <a id="extending-account"></a>  Extending account

To create a new blockchain provider is necesary to extend the class account and implement the basic functions.

---
## <a id="account-definition"></a> Account definition

https://github.com/salmonw/salmon-provider-base/blob/main/src/Account.ts

getTokens()
---
Returns all available tokens for this blockchain.

getBalance()
---
Returns the full balance for this account including the total balance

getReceiveAddress()
---
Returns the public key of the account

validateDestinationAccount(address)
---
Checks if the destination account exists and is valid.
It could return an error if the account address is wrong

A warning it the address is right but it has no funds or some other issue

Success if the account is right and have funds

example:
```js
const INVALID_ADDRESS = {
  type: 'ERROR',
  code: 'INVALID_ADDRESS',
};
const EMPTY_ACCOUNT = {
  type: 'WARNING',
  code: 'EMPTY_ACCOUNT',
};
const NO_FUNDS = {
  type: 'WARNING',
  code: 'NO_FUNDS',
};

const VALID_ACCOUNT = {
  type: 'SUCCESS',
  code: 'VALID_ACCOUNT',
};
```

transfer(destination, token, amount, opts)
---
Transfer tokens to another account. 
The field opts could be used to send specific parameters depending on the blockchain.

setNetwork(networkId)
---
Set the current network for the account.

example:
devnet, mainnet

getCurrentNetork()
---
Returns the current network for the account

getChain()
---
Returns the account blockchain.
example: SOLANA, NEAR

getRecentTransactions(lastSignature)
---
Returns the list of transaction parsed for display.

If lastSignature if provided the function will return transactions previous to this transaction.

## <a id="common-services"> Common services

## License

The project adopts the license [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.html).