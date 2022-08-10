import { BN } from 'bn.js';

const parseAmount = (amount, decimals, precision = 5) => {
  const bigNumber = new BN(amount);
  const divider = new BN(10).pow(new BN(decimals));
  const integer = bigNumber.div(divider);
  const fraction = bigNumber.mod(divider).toString().substring(0, precision);
  return parseFloat(`${integer}.${fraction}`);
};

const formatAmount = (amount, decimals) => {
  return new BN(amount).div(new BN(10).pow(new BN(decimals))).toString();
};

export { parseAmount, formatAmount };
