import axios from "axios";
const url = 'https://countryapi.io/api/all?apikey=OtJmLuOO118IZ7BjC4nbXaRNTu3MqXo3ueB400B1';

export const fetchCountry = async () => {
    try {
       const requestCountry = axios.get(`${url}`);

       const [responseCountry] = await Promise.all([requestCountry])
       
       const responseCountryData = responseCountry.data

       return { responseCountryData }
    } catch (err) {
        throw new Error(err.message)
    }
}