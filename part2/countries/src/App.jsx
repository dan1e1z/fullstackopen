import { useState, useEffect } from "react";
import CountryService from "./services/countrydb";

const CountryInfo = ({ country }) => {
  console.log(country);
  console.log(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
};

const CountryList = ({ filterText, countryList }) => {
  const filteredCountryList = countryList.filter((country) =>
    country.name.common.toLowerCase().includes(filterText.toLowerCase()),
  );
  return (
    <div>
      {filteredCountryList.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountryList.length === 1 ? (
        <div>
          <CountryInfo country={filteredCountryList[0]} />
        </div>
      ) : (
        filteredCountryList.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))
      )}
    </div>
  );
};

function App() {
  const [newFilter, setNewFilter] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    CountryService.getAll().then((countryData) => {
      setCountryList(countryData);
    });
  }, []);

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <form>
        find countries
        <input value={newFilter} onChange={handleNewFilter} />
        <CountryList filterText={newFilter} countryList={countryList} />
      </form>
    </div>
  );
}

export default App;
