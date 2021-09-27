import CountryDetail from "./CountryDetail";

const Country = ({ countries, onClick }) => {
  let n = countries.length;

  if (n > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (n > 1) {
    return (
      <>
        {countries.map((country) => {
          return (
            <div key={country.numericCode}>
              {country.name}{" "}
              <button onClick={onClick} value={country.name}>
                show
              </button>
            </div>
          );
        })}
      </>
    );
  } else if (n === 1) {
    return <CountryDetail country={countries[0]} />;
  } else {
    return <div>No countries found</div>;
  }
};

export default Country;
