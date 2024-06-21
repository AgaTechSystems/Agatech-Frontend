import {
    Native,
    ChainId,
    CurrencyAmount,
    Token,
    TradeType,
  } from '@pancakeswap/sdk'

export const parseToken = (rawToken: any, chainId: number): Token => {
    return new Token(chainId,
        rawToken.address,
        Number(rawToken.decimals),
        rawToken.symbol,
        rawToken.name
    );
}