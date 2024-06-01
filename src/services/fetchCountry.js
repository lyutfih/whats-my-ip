import axios from "axios";
const url = 'https://restcountries.com/v3.1/alpha/';

export const fetchCountry = async (country) => {
    try {
       const requestCountry = axios.get(`${url}/${country}`);

       const [responseCountry] = await Promise.all([requestCountry])
       
       const responseCountryData = responseCountry.data

       return { responseCountryData }
    } catch (err) {
        throw new Error(err.message)
    }
}