import { NextApiResponse } from 'next';
import { SWAP_ENDPOINT ,PRICE_ENDPOINT} from '@/config/swap';
 async function quote(req: any, res: NextApiResponse) {
  const { chainId, ...queryParams } = req.query; 

  try {
    const response = await fetch(
      `${SWAP_ENDPOINT[Number(chainId)]}swap/v1/quote?${new URLSearchParams(queryParams).toString()}`,
      {
        headers: {
          "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY as string,
        },
      }
    );
    const data = await response.json();

    // Make sure to use the `res` parameter passed to the function for sending the response
    return res.status(200).json({
      success: true,
      data: data,
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
export default quote;