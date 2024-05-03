// src/services/productService.js
import newRequest from "../utils/API";
import axios from "axios";

const globalService = {
  routeswap: (data: any, config: any) => {
    return newRequest.post(`global/getRouter`, data);
  },
};

export default globalService;
