import CountryDetail from "./CountryDetail";

const Country = ({ countries }) => {
  let n = countries.length;

  if (n > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (n > 1) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.numericCode}>{country.name}</div>
        ))}
      </>
    );
  } else if (n === 1) {
    return <CountryDetail country={countries[0]} />;
  } else {
    return <div>No countries found</div>;
  }
};

export default Country;
