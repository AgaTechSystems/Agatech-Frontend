
import newRequest from "../utils/API";
import axios from "axios";
import qs from "qs";
//     const response = await fetch(`/api/price/route?${qs.stringify(params)}`);
const globalService = {
  routeswap: (params: any) => {
    return newRequest.get(`/price/route?${qs.stringify(params)}`);
  },
  quoteswap:(params: any) => {
    return newRequest.get(`/quote/route?${qs.stringify(params)}`);
  }
};

export default globalService;
