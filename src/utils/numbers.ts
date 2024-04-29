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

export function calculateStakingPercentage(
  totalBalance: string,
  stakedAmount: string
) {
  if (Number(totalBalance) <= 0) {
    return 100;
  }

  const stakingPercentage = (Number(stakedAmount) / Number(totalBalance)) * 100;

  // Cap the staking percentage at 100%
  const cappedPercentage = Math.min(stakingPercentage, 100);

  return Math.round(cappedPercentage * 100) / 100;
}

export function LongerPaysBetter(hex: number, days: number): number {
  // Check if days is greater than or equal to 1
  if (days < 1) {
    return 0;
  }

  // Perform the calculation
  const result = (hex * (days - 1)) / 1820;

  return Number(result.toFixed(5));
}

export function BiggerPaysBetter(input: number): number {
  // Calculate the minimum value between input and 150 million
  const minValue: number = Math.min(input, 150e6);

  // Calculate the ratio between the minimum value and 1.5 billion
  const ratio: number = minValue / 1500e6;

  // Calculate the bonus by multiplying the input by the ratio
  const bonus: number = input * ratio * 10 ** 8;

  return Number(bonus.toFixed(5));
}

export function calculateShares(
  hexAmount: number,
  perSharePrice: number
): number {
  // Check if hexAmount is greater than or equal to 0
  if (hexAmount < 0) {
    return 0;
  }

  // Check if perSharePrice is greater than 0
  if (perSharePrice <= 0) {
    return 0;
  }

  // Calculate the number of shares
  const shares = hexAmount / perSharePrice;

  return Number(shares.toFixed(5));
}

export function calculateRewardPercentage(
  principal: number,
  reward: number,
  emergencyEndDay: number,
  stakeDays: number
): number {
  const hasServed50Percent = emergencyEndDay >= stakeDays / 2;
  const percentage = hasServed50Percent ? (reward / principal) * 100 : 0;
  return Math.min(percentage, 100);
}

export function calculateReward(
  startTime: number,
  endTime: number,
  rewardRate: number,
  amount: number,
  rewardTokenDecimals: number,
  stakingTokenDecimals: number
): number {
  const elapsedTime = Math.max(
    0,
    Math.min(Date.now() / 1000 - startTime, endTime)
  );
  const totalTime = endTime < elapsedTime ? endTime : elapsedTime;

  const reward =
    (amount * totalTime * rewardRate * Math.pow(10, rewardTokenDecimals)) /
    (365 * 24 * 60 * 60) /
    100 /
    Math.pow(10, stakingTokenDecimals);

  return reward;
}