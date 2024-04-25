import axios from "axios";
//http://31.220.53.102:5000/
//http://localhost:5000/api/

const apiUrl = process.env.NODE_ENV === 'production' ? "https://api.hexcrypto.com/api": 'https://api.hexcrypto.com/api';

//https://api.cipherem.xyz/api
const newRequest = axios.create({
  baseURL:apiUrl,
  withCredentials: true,
});

export default newRequest;

