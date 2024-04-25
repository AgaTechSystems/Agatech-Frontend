// src/services/productService.js
import newRequest from '../utils/API';
import axios from 'axios';

const globalService = {
  getTsharedata: (id:number) => {
    return newRequest.get(`/global/tsharedata/${id}`);
  },
  getHexprice:(id:number)=>{
    return newRequest.get(`/global/HexpriceChartdata/${id}`);
  },
  getDaydata:(id:number)=>{
    return newRequest.get(`/global/payoutPerTShare/${id}`)
  },
  getTotalstekrs:(id:number)=>{
    return newRequest.get(`/global/stakersinfo/${id}`)
  },
  getFeeddata:(id:number)=>{
    return newRequest.get(`/global/feedhistory/${id}`)
  }
  
  

};





export default globalService;
