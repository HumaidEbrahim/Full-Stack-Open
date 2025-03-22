import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryLanguages = ({ country }) => 
{
  return (
    <ul>
      {Object.values(country.languages).map(language => <li> {language} </li>)}
    </ul>
  )
}

const CountryInfo = (props) => 
{
  const country = props.country[0]
  return (
    <div>
      <h1> {country.name.common} </h1>
      <p> Capital {country.capital} </p>
      <p> Area {country.area} </p>

      <h1> Languages </h1>
      <CountryLanguages country={country} />
      <img src={country.flags.png} />
      <h1> Weather in </h1>
    </div>
  )
}

const CountryList = ({ countries }) =>
{
  if (countries.length > 10)
  {
    return (<p> Too many matches, specify another filter</p>)
  }
  else if (countries.length > 1)
  {
    return (
      <div>
        {countries.map(country => <p key={country.cca2}> {country.name.common} <button onClick={() => <CountryInfo country={country} />}> Show </button> </p>)}
      </div>
    )
  }
  else if (countries.length === 1)
  {
    return (
      <CountryInfo country={countries} />
    )
  }
  else
  {
    return (
      <p> No data found </p>
    )
  }
}


const App = () =>
{
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() =>
  {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response =>
      {
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) =>
  {
    setSearchCountry(event.target.value)
  }


  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  console.log('Filtered Length', filteredCountries.length)

  return (
    <div>
      <form>
        find countries
        <input value={searchCountry} onChange={handleCountryChange} />
      </form>

      <CountryList countries={filteredCountries} />

    </div>

  )
}

export default App
