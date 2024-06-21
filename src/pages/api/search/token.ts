import { NextApiResponse } from "next";
import axios from "axios";
import { TOKEN_SEARCH } from "@/service/Tokenservice";
import Moralis from "moralis";
import { isAddress } from "@/utils/contracthelper";

const apiOptions = [
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_1INCH_KEY_1}`,
      accept: "application/json",
    },
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_1INCH_KEY_2}`,
      accept: "application/json",
    },
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_1INCH_KEY_3}`,
      accept: "application/json",
    },
  },
];

function getRandomApi() {
  const randomIndex = Math.floor(Math.random() * apiOptions.length);
  return apiOptions[randomIndex];
}

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
  });
}

async function SearchERC20Token(req: any, res: NextApiResponse) {
  const { chainId, query } = req.query;

  // Validate chainId and query parameters
  if (!chainId || !query) {
    return res.status(400).json({
      success: false,
      error: "Missing required query parameters: chainId and query",
    });
  }

  const selectedApi = getRandomApi();
  const limit = 100;
  const params = {
    query,
    limit,
  };

  try {
    if (isAddress(query)) {
      const { headers } = selectedApi;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_1INCH_TOKEN}/${chainId}/custom/${query}` ||
          "",
        { params, headers }
      );

      return res.status(200).json({
        success: true,
        tokens: response.data,
        chainId,
      });
    } else {
      const { headers } = selectedApi;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_1INCH_TOKEN}/${chainId}/search` || "",
        { params, headers }
      );

      return res.status(200).json({
        success: true,
        tokens: response.data,
        chainId,
      });
    }
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
}

export default SearchERC20Token;
