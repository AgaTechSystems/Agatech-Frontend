import { NextApiResponse } from 'next';

 async function quote(req: any, res: NextApiResponse) {
  const searchParams = req.query; // Access query parameters directly


  try {
    const response = await fetch(
      `https://bsc.api.0x.org/swap/v1/quote?${new URLSearchParams(searchParams).toString()}`,
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