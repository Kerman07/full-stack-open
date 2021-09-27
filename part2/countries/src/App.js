import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter.js";
import Country from "./components/Country.js";

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => setNewFilter(event.target.value);

  return (
    <div>
      find countries: <Filter value={newFilter} onChange={handleFilter} />
      {countries.length ? (
        <Country
          countries={countries.filter((country) =>
            country.name.toLowerCase().includes(newFilter.toLowerCase())
          )}
        />
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
};

export default App;
