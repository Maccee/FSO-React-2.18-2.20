import { useState, useEffect } from "react";

const RenderOne = ({ filteredCountries }) => {
  const [weatherData, setWeatherData] = useState(null);
  const country = filteredCountries[0];
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    if (country.capital) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => setWeatherData(data))
        .catch((error) => {
          if (error.message === "401") {
            alert(
              "Unauthorized access. Please ensure your API key is correctly set in the .env file."
            );
          } else {
            console.error("Fetch error:", error);
          }
        });
    }
  }, [country.capital]);

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
      <h3>Weather in {country.capital}</h3>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};
export default RenderOne;
