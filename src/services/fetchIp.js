import axios from "axios";
const url = 'https://geo.ipify.org/api/v2/country,city';

export const fetchIp = async () => {
    try {
       const requestIp = axios.get(url, {
        params: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });

       const [responseIp] = await Promise.all([requestIp])
       
       const responseIpData = responseIp.data

       return { responseIpData }
    } catch (err) {
        throw new Error(err.message)
    }
}