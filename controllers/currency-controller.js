import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

const api = axios.create({
    method: 'GET',
    baseURL: 'https://pro-api.coinmarketcap.com',
    headers: {
      'X-CMC_PRO_API_KEY': `${process.env.CRYPTO_API_KEY}`,
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
    },
  });
const getCurrencies = async (req, res) => {
    const response =await api('/v1/cryptocurrency/listings/latest?limit=40')
    res.status(200).json(response.data.data)
      
  }

export {
    getCurrencies
}