import { NextApiResponse } from "next";
import {
  SWAP_ENDPOINT,
  PRICE_ENDPOINT,
  NATIVE_PRICE_ADDRESS,
} from "@/config/swap";
import NodeCache from "node-cache";
import axios from "axios";

const cache = new NodeCache({ stdTTL: 120 });

let cacheData: any = null;

async function quote(req: any, res: NextApiResponse) {
  const { chainId, ...queryParams } = req.query;

  try {
    const response = await fetch(
      `${PRICE_ENDPOINT[Number(chainId)]}swap/v1/price?${new URLSearchParams(
        queryParams
      ).toString()}`,
      {
        headers: {
          "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY as string,
        },
      }
    );
    const data = await response.json();
    // Fetch native price
    const nativePrice = await getNativePrice(chainId);

    // Cache the data with the chain ID as the key, with a TTL of 2 minutes
    cache.set(chainId, data);

    // Make sure to use the `res` parameter passed to the function for sending the response
    return res.status(200).json({
      success: true,
      data: data,
      nativePrice: nativePrice,

    });
  } catch (error) {
    console.log(error);
    // If an error occurs, send an appropriate response
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

async function getNativePrice(chainId: string) {
  try {
    const cachedNativePrice = cache.get(`nativePrice_${chainId}`);
    if (cachedNativePrice) {
      // If native price exists in the cache, return it directly
      return cachedNativePrice;
    } else {
      // If native price is not in the cache, fetch it from the API
      const price = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${
          NATIVE_PRICE_ADDRESS[Number(chainId)]
        }`
      );
      const nativePrice = price.data.pairs[0].priceUsd;
      // Cache the native price with the chain ID as the key, with a TTL of 2 minutes
      cache.set(`nativePrice_${chainId}`, nativePrice);
      return nativePrice;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch native price");
  }
}

export default quote;
