import numbro from "numbro";
import { ethers } from "ethers";

export const FormatEther = async (amount: any,dc:number) => {
  const _amount = await ethers.utils.parseUnits(amount.toString(),dc);

  return _amount.toString();
};




// using a currency library here in case we want to add more in future
export const formatDollarAmount = (
  num: number | undefined,
  digits = 2,
  round = true
) => {
  if (num === 0) return "$0.00";
  if (!num) return "-";
  if (num < 0.001 && digits <= 3) {
    return "<$0.001";
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: "M",
      billion: "B",
    },
  });
};

// using a currency library here in case we want to add more in future
export const formatAmount = (num: number | undefined, digits = 2) => {
  if (num === 0) return "0";
  if (!num) return "-";
  if (num < 0.001) {
    return "<0.001";
  }
  return numbro(num).format({
    average: true,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: "M",
      billion: "B",
    },
  });
};

export const formatAmountFORout = (number: number, digits = 4) => {
  if (number === null || number === undefined) {
    return "0";
  } else if (number < 1000) {
    const formattedNumber = number.toFixed(digits);
    return formattedNumber.toString();
  } else if (number >= 1000 && number < 1000000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}K`;
  } else if (number >= 1000000 && number < 1000000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return `${formattedNumber}M`;
  } else {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return `${formattedNumber}B`;
  }
};

export const ConvertEthTonormal = async (amount: string, dl: number) => {
  const _amount = await ethers.utils.formatUnits(amount, dl);
  return _amount;
};

export function formatNumber(number: number) {
  if (number === null || number === undefined) {
    return "0";
  } else if (number < 1000) {
    const formattedNumber = number.toFixed(0);
    return formattedNumber.toString();
  } else if (number >= 1000 && number < 1000000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}K`;
  } else if (number >= 1000000 && number < 1000000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return `${formattedNumber}M`;
  } else {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return `${formattedNumber}B`;
  }
}
export const truncateAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) {
    return address;
  }
  return `${match[1]}…${match[2]}`;
};

export const hexToInt = (s: any) => {
  const bn = ethers.BigNumber.from(s);
  return parseInt(bn.toString());
};

export const CountParser = (value:number, fixTo = 2) => {
  if (+value < 1000) {
      if (Number.isInteger(value)) {
          return value;
      } else {
          return Number(value.toFixed(fixTo));
      }
  } else if (+value < 1000000) {
      return (value / 1000).toFixed(1) + "k";
  } else {
      return (value / 1000000).toFixed(1) + "M";
  }
};
