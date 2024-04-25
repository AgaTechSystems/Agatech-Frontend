// src/services/productService.js
import newRequest from "../utils/API";
import axios from "axios";

const userservice = {
  getUserstake: (id: number, userAddress: string) => {
    return newRequest.get(`/global/getstakedata/${id}/${userAddress}`);
  },
  getUserstakeinfo: (id: number, userAddress: string) => {
    return newRequest.get(`/global/getStakeinfo/${id}/${userAddress}`);
  },
};

export default userservice;
