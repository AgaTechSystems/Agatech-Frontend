// Import required modules
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define your cache variable
let cacheData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1; // 5 minutes in milliseconds

const token = "0xb427e47e8fdd678278d2a91eeac014ffcddaf029"

// Define your API handler function
const getTokenHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if cached data exists and if it is not expired
  if (cacheData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully from cache",
      data: cacheData,
    });
  }

  // If cache is empty or expired, fetch data from API
  try {
    const response = await axios.get('https://api.dexscreener.com/latest/dex/tokens/0xb427e47e8fdd678278d2a91eeac014ffcddaf029');
    const data = response.data;

    // Loop through pairs to calculate total liquidity USD and total volume 24h
    let totalLiquidityUSD = 0;
    let totalVolume24h = 0;
    let price = 0;
    let totalBuy= 0;
    let totalSell  = 0;

    data.pairs.forEach((pair: any) => {
      totalLiquidityUSD += pair.liquidity.usd;
      totalVolume24h += pair.volume.h24;
      price = Number(pair.priceUsd);
      totalBuy += pair.txns.h24.buys;
      totalSell += pair.txns.h24.sells;
    });

    const info = {price,
        totalLiquidityUSD,
        totalVolume24h,
        totalBuy,
        totalSell

    }

    // Cache the data
    cacheData = info;
    cacheTimestamp = Date.now();

    // Send response with fetched data
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully from API",
      data: info,
    });
  } catch (error) {
    // If an error occurs during API request, send error response
    res.status(500).json({ success: false, error: error });
  }
};

// Export the handler function
export default getTokenHistory;
