import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (country) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
  );
  return request.then((response) => response.data);
};

export default { getWeather };
