import React, { useState, useEffect } from "react";
import CountryService from "./services/countrydb";
import "./styles.css";

const CountryInfo = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </div>
  );
};

const CountryList = ({ filterText, countryList, handleCountrySelect }) => {
  const filteredCountryList = countryList.filter((country) =>
    country.name.common.toLowerCase().includes(filterText.toLowerCase()),
  );

  if (filteredCountryList.length === 1) {
    return <CountryInfo country={filteredCountryList[0]} />;
  }

  return (
    <div>
      {filteredCountryList.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        filteredCountryList.map((country) => (
          <div className="countryInfoField" key={country.name.common}>
            <div>{country.name.common}</div>
            <button onClick={() => handleCountrySelect(country)}>Show</button>
          </div>
        ))
      )}
    </div>
  );
};

function App() {
  const [newFilter, setNewFilter] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    CountryService.getAll().then((countryData) => {
      setCountryList(countryData);
    });
  }, []);

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <form>
        Find countries:
        <input value={newFilter} onChange={handleNewFilter} />
      </form>
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : (
        <CountryList
          filterText={newFilter}
          countryList={countryList}
          handleCountrySelect={handleCountrySelect}
        />
      )}
    </div>
  );
}

export default App;
