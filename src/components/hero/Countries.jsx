import CountryCard from "./CountryCard"
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

const Countries = ({searchValue, filterByContinent}) => {
  const [countries, setCountries] = useState([]);
  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchValue)
  })

  useEffect(() =>{
    const fetchCountries = async () => {
      try {
        let searchBy = "all";
        if(filterByContinent !== "All" && filterByContinent !== null){
          searchBy = `region/${filterByContinent}`;
        }
        const response = await fetch(`https://restcountries.com/v3.1/${searchBy}`);
        const data = await response.json();
        setCountries(data.sort((a, b) => {
          if(a.name.common < b.name.common) return -1;
          if(a.name.common > b.name.common) return 1;
          return 0;
        }))
      } catch (error) {
        console.log("Error fetching countries", error)
      }
    }
    fetchCountries();
  } ,[countries, filterByContinent])

  return (
    <div className="container main-country-container">
      {filteredCountries.map((country)=>(
        <Link className="card-link" to={`/country/${country.name.common}`} key={country.name.common}>
          <CountryCard  
          countryName={country.name.common} 
          population={country.population}
          region={country.region}
          capital={country.capital}
          flag={country.flags.png}/>
        </Link>
        ))}
    </div>
  )
}

export default Countries


/* 

.filter((country) => { return searchValue === "" ? country : country.name.common.includes(searchValue)})
      
*/