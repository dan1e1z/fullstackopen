import axios from "axios";
// const API_KEY = 0;

const base_url = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${base_url}/all`);
  return request.then((response) => response.data);
};
const getCountry = (countryName) => {
  const request = axios.get(`${base_url}/name/${countryName}`);
  return request.then((response) => response.data);
};

export default { getAll, getCountry };
