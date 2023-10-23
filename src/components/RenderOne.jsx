const RenderOne = ({ filteredCountries }) => {
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
};
export default RenderOne;
