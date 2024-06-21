// Import required modules
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define your cache variable
let cacheData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 300000; // 5 minutes in milliseconds

// Define your API handler function
const getPriceHistory = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
    const url = `${COINGECKO_API_URL}/coins/agatech/market_chart`;
    const params = {
      vs_currency: "usd",
      days: "max",
    };

    const response = await axios.get(url, { params });
    const existingData = response.data.prices;

    const price = existingData.map((e: any) => ({
      timestamp: e[0] / 1000,
      price: e[1],
    }));

    // Cache the data
    cacheData = price;
    cacheTimestamp = Date.now();

    // Send response with fetched data
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully from API",
      data: price,
    });
  } catch (error) {
    // If an error occurs during API request, send error response
    res.status(500).json({ success: false, error: error });
  }
};

// Export the handler function
export default getPriceHistory;
