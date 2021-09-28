import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt="no flag found"
        width="300"
        height="200"
      />
      {Object.keys(weather).length !== 0 && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature: {weather.current.temperature}&deg; C</div>
          <img
            src={weather.current.weather_icons[0]}
            alt="no img"
            width="50"
            height="50"
          />
          <div>
            wind: {weather.current.wind_speed}km/h {weather.current.wind_dir}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
