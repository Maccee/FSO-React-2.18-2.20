import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error.message);
      });
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = allCountries.filter((country) =>
        country.name.common.toLowerCase().startsWith(query.toLowerCase())
      );

      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
    console.log("filtered countries", ...filteredCountries);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const renderResults = () => {
    if (filteredCountries.length > 1 && filteredCountries.length < 11) {
      return (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <br />
          {filteredCountries.map((country) => (
            <li key={country.cca2}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else if (filteredCountries < 1 && query.length === 0) {
      return <p></p>;
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>
            Capital: {country.capital}
            <br />
            Area: {country.area}
          </p>
          <h3>Languages:</h3>
          <ul>
            {country.languages && Object.keys(country.languages).length > 0 ? (
              Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))
            ) : (
              <li>Unspecified</li>
            )}
          </ul>
          {country.flags.png && (
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width="200"
            />
          )}
        </div>
      );
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (filteredCountries.length < 1 && query.length > 0) {
      return <p>No countries found.</p>;
    }
  };

  return (
    <div>
      <p>Find countries...</p>
      <input
        value={query}
        onChange={handleInputChange}
        placeholder="start typing..."
      />
      {renderResults()}
    </div>
  );
};

export default App;
