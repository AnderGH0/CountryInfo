import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CountryButton from "./CountryButton"
import { dottedPopulation } from "../hero/CountryCard"
import BackButton from "./BackButton"

const CountryPage = () => {

  const {id} = useParams();
  const [country, setCountry] = useState({})
  const [border, setBorder] = useState([]);
  const [nativeNames, setNativeNames] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let res;
        if(id === "United States"){
          res = await fetch(`https://restcountries.com/v3.1/name/usa`);
        } else if (id==="China") {
          res = await fetch(`https://restcountries.com/v3.1/alpha/chn`);
        } else {
          res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
        }
        const data = await res.json();
        setCountry({
          countryName : data[0].name.common,
          flag : data[0].flags.png,
          population : data[0].population,
          region: data[0].region,
          subregion : data[0].subregion,
          capital: data[0].capital,
          tld: data[0].tld[0]
        })

        setBorder(data[0].borders? data[0].borders : [])

        const curr = [];
        for(const[key, value] of Object.entries(data[0].currencies)){
          curr.push(value.name)
        } setCurrencies(curr)

        const names = [];
        for(const[key, value] of Object.entries(data[0].name.nativeName)){
          names.push(value.common)
        } setNativeNames(names);

        const langs =[];
        for(const[key, value] of Object.entries(data[0].languages)){
          langs.push(value)
        } setLanguages(langs)

      } catch (error) {
        console.log(error)
      }
      
    }
    fetchCountry();
  },[country, id])


  return (
    <>
      <BackButton />
      <div className="container page-container">
        <img src={country.flag} alt={country.countryName}/>
        <div className="page-info">
          <div className="info-top">
          <h1 className="country-name-page">{country.countryName}</h1>
            <h2 className="country-info-field lh">Native Name: <span className="country-info-info">{nativeNames.length > 1? nativeNames.join(', ') : nativeNames}</span></h2>
            <h2 className="country-info-field lh">Population: <span className="country-info-info">{dottedPopulation(country.population)}</span></h2>
            <h2 className="country-info-field lh">Region: <span className="country-info-info">{country.region}</span></h2>
            <h2 className="country-info-field lh">Sub Region: <span className="country-info-info">{country.subregion}</span></h2>
            <h2 className="country-info-field lh">Capital: <span className="country-info-info">{country.capital}</span></h2>
          </div>
          <div className="info-mid">  
            <h2 className="country-info-field lh">Top Level Domain: <span className="country-info-info">{country.tld}</span></h2>
            <h2 className="country-info-field lh">Currencies: <span className="country-info-info">{currencies.join(", ")}</span></h2>
            <h2 className="country-info-field lh">Languages: <span className="country-info-info">{languages.join(", ")}</span></h2>
          </div>
          <div className="info-borders">
            <h2 className="country-borders">Border Countries: </h2>
              <div className="country-buttons">
              {border.length > 1 ? border.map(name =>(
                <CountryButton key={name} neightbour={name} />
              )) : <h4>{`${country.countryName} is an island and doesn't have bordering neighbours`}</h4>}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryPage
