import {
  Native,
  ChainId,
  CurrencyAmount,
  Token,
  TradeType,
} from "@pancakeswap/sdk";

export const parseToken = (rawToken: any, chainId: number): Token => {
  return new Token(
    chainId,
    rawToken.address,
    Number(rawToken.decimals),
    rawToken.symbol,
    rawToken.name
  );
};

interface LiquiditySource {
  name: string;
  proportion: number;
}

export function calculateProportions(liquiditySources: LiquiditySource[]) {
    if (!liquiditySources || liquiditySources.length <= 0) {
        return;
    }

    // Filter out sources with proportions <= 0
    const filteredSources = liquiditySources.filter(source => source.proportion > 0);

    // Step 1: Calculate total amount
    const totalAmount: number = filteredSources.reduce(
        (total, source) => total + Number(source.proportion),
        0
    );

    // Step 2 & 3: Calculate proportions and convert to percentage
    const proportions: { name: string; proportion: string }[] =
        filteredSources.map((source) => ({
            name: source.name,
            proportion: (Number (source.proportion) / totalAmount * 100).toFixed(0),
        }));

    return proportions;
}