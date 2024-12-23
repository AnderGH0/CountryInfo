

const CountryCard = ({countryName, population, region, capital, flag}) => {
  

  return (
    <div className="country-card">
        <img className="card-image" src={flag} alt={countryName} />
        <div className="card-info">
            <h1 className={`country-name ${countryName.length >= 21 ? "longName" : ""} `}>{countryName}</h1>
            <h2 className="country-info-field">Population: <span className="country-info-info">{dottedPopulation(population)}</span></h2>
            <h2 className="country-info-field">Region: <span className="country-info-info">{region}</span></h2>
            <h2 className="country-info-field">Capital: <span className="country-info-info">{capital}</span></h2>
        </div>
    </div>
  )
}

function dottedPopulation(population){
  const numArr = population ? population.toString().split("").reverse() : "" ;
  const finalArray = [];
  let count = 0;
  for(let i =0; i < numArr.length; i++){
    finalArray.push(numArr[i]);
    count++;
    if(count === 3){
      count = 0;
      i=== numArr.length - 1 ? null :finalArray.push(",")
    } 
  }
  return finalArray.reverse();
}

export {CountryCard as default, dottedPopulation}