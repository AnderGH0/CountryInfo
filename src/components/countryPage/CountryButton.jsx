import { useState } from 'react'
import { Link } from 'react-router-dom';

const CountryButton = ({neightbour}) => {
    const [neighbourName, setNeighbourName] = useState(); 
    const fetchCountry = async () => {
        const res  = await fetch(`https://restcountries.com/v3.1/alpha/${neightbour}`);
        const data = await res.json();
        setNeighbourName(data[0].name.common)
    }
    fetchCountry();
    return (
    <Link to={`/country/${neighbourName}`}><button className='button'>{neighbourName}</button></Link>
  )
}

export default CountryButton